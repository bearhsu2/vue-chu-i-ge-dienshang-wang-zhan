<template>
    <div>


        <div class="row mt-4">

            <div :key="item.id" class="col-md-4 mb-4" v-for="item in products">
                <div class="card border-0 shadow-sm">
                    <div :style="{backgroundImage: `url(${item.imageUrl})`}"
                         style="height: 150px; background-size: cover; background-position: center">
                    </div>
                    <div class="card-body">
                        <span class="badge badge-secondary float-right ml-2">分類</span>
                        <h5 class="card-title">
                            <a class="text-dark" href="#">標題</a>
                        </h5>
                        <p class="card-text">內容</p>
                        <div class="d-flex justify-content-between align-items-baseline">
                            <!-- <div class="h5">2,800 元</div> -->
                            <del class="h6">原價 2,800 元</del>
                            <div class="h5">現在只要 1,400 元</div>
                        </div>
                    </div>
                    <div class="card-footer d-flex">
                        <button class="btn btn-outline-secondary btn-sm" type="button">
                            <i class="fas fa-spinner fa-spin"></i>
                            查看更多
                        </button>
                        <button class="btn btn-outline-danger btn-sm ml-auto" type="button">
                            <i class="fas fa-spinner fa-spin"></i>
                            加到購物車
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <Pagination :pagination="pagination" v-on:jumpPage="getProducts"></Pagination>

        <div class="d-flex justify-content-center">
            <loading :active.sync="isLoading"></loading>
        </div>

    </div>
</template>
<script>

    import $ from 'jquery';
    import Pagination from '../Pagination';


    export default {
        name: 'Products',
        components: {Pagination},
        data() {
            return {
                products: [],
                pagination: {},
                tempProduct: {},
                isNew: false,
                isLoading: false,
                status: {
                    fileUploading: false
                }
            }
        },
        computed: {

            modalTitle() {
                return this.isNew ? '新增' : '編緝';
            }

        },
        methods: {
            getProducts(page = 1) {
                const vm = this;

                vm.isLoading = true
                const url = `${process.env.VUE_APP_SERVER_URL}/api/${process.env.VUE_APP_API_NAME}/admin/products?page=${page}`;
                this.$http.get(url)
                    .then((response) => {
                        vm.isLoading = false;
                        vm.products = response.data.products;
                        vm.pagination = response.data.pagination;
                    })
            },
            openModal(isNew, item) {

                this.isNew = isNew;

                this.tempProduct = isNew
                    ? {}
                    : Object.assign({}, item);

                $('#productModal').modal('show');
            },
            updateProduct() {

                const vm = this;

                let url = vm.isNew
                    ? `${process.env.VUE_APP_SERVER_URL}/api/${process.env.VUE_APP_API_NAME}/admin/product`
                    : `${process.env.VUE_APP_SERVER_URL}/api/${process.env.VUE_APP_API_NAME}/admin/product/${vm.tempProduct.id}`
                let action = vm.isNew
                    ? 'post'
                    : 'put';


                this.$http[action](url, {data: vm.tempProduct})
                    .then((response) => {
                        $('#productModal').modal('hide');
                        vm.getProducts();
                        if (!response.data.success) {
                            vm.$bus.$emit('message:push', "操作失敗", 'danger');
                        }
                    });
            },
            uploadFile() {
                const uploadedFile = this.$refs.files.files[0];
                const vm = this;
                const formData = new FormData();
                vm.status.fileUploading = true;
                formData.append('file-to-upload', uploadedFile);

                const url = `${process.env.VUE_APP_SERVER_URL}/api/${process.env.VUE_APP_API_NAME}/admin/upload`;

                this.$http.post(url, formData, {
                    headers: {'Content-Type': 'multipart-form-data'}
                }).then((response) => {
                    vm.status.fileUploading = false;
                    if (response.data.success) {
                        vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
                    } else {
                        vm.$bus.$emit('message:push', response.data.message, 'danger');
                    }
                })
            },
            deleteProduct(item) {
                const vm = this;
                const url = `${process.env.VUE_APP_SERVER_URL}/api/${process.env.VUE_APP_API_NAME}/admin/product/${item.id}`;
                this.$http.delete(url)
                    .then((response) => {
                        $('#productModal').modal('hide');
                        vm.getProducts();
                        if (!response.data.success) {
                            vm.$bus.$emit('message:push', "操作失敗", 'danger');
                        } else {
                            vm.$bus.$emit('message:push', item.title + ' 已刪除');
                        }
                    });


            },
        },
        created() {
            this.getProducts();
        }
    }

</script>
