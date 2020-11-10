<template>
    <div>

        <div class="text-right mt-4">
            <button @click="openModal(true)" class="btn btn-primary">新增產品</button>
        </div>


        <table class="table table-striped mt-4">
            <thead>
            <tr class="d-flex">

                <td class="col-1">分類</td>
                <td class="col-6">產品名稱</td>
                <td class="col-1">原價</td>
                <td class="col-1">售價</td>
                <td class="col-1">啟用</td>
                <td class="col-2">編輯</td>
            </tr>
            </thead>
            <tbody>
            <tr :key=item.id class="d-flex" v-for="item in products">

                <td class="col-1">{{item.category}}</td>
                <td class="col-6">{{item.title}}</td>
                <td class="col-1 text-right">{{item.origin_price}}</td>
                <td class="col-1 text-right">{{item.price}}</td>
                <td class="col-1">
                    <span class="text-success" v-if="item.is_enabled">Active</span>
                    <span v-else>Inactive</span>
                </td>
                <td class="col-2">
                    <button @click="openModal(false, item)" class="btn btn-outline-primary btn-sm">編輯</button>
                    <button @click="deleteProduct" class="btn btn-outline-danger btn-sm">刪除</button>
                </td>

            </tr>
            </tbody>
        </table>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li :class="{'disabled':!pagination.has_pre}" class="page-item">
                    <a @click.prevent="getProducts(pagination.current_page - 1)" aria-label="Previous" class="page-link"
                       href="#">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li :class="{'active': pagination.current_page === page}" :key="page" class="page-item"
                    v-for="page in pagination.total_pages">
                    <a @click.prevent="getProducts(page)" class="page-link" href="#">{{ page }}</a>
                </li>
                <li :class="{'disabled':!pagination.has_next}" class="page-item">
                    <a @click.prevent="getProducts(pagination.current_page + 1)" aria-label="Next" class="page-link"
                       href="#">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>

        <div class="d-flex justify-content-center">
            <loading :active.sync="isLoading"></loading>
        </div>


        <div aria-hidden="true" aria-labelledby="productModalLabel" class="modal fade" id="productModal" role="dialog"
             tabindex="-1">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="productModalLabel">新增產品</h5>
                        <button aria-label="Close" class="close" data-dismiss="modal" type="button">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label for="image">輸入圖片網址</label>
                                    <input class="form-control" id="image" placeholder="請輸入圖片連結"
                                           type="text"
                                           v-model="tempProduct.imageUrl">
                                </div>
                                <div class="form-group">
                                    <label for="customFile">或 上傳圖片
                                        <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                                    </label>
                                    <input @change="uploadFile" class="form-control" id="customFile"
                                           ref="files" type="file">
                                </div>
                                <img :src="tempProduct.imageUrl"
                                     alt="" class="img-fluid"
                                >
                            </div>
                            <div class="col-sm-8">
                                <div class="form-group">
                                    <label for="title">標題</label>
                                    <input class="form-control" id="title" placeholder="請輸入標題"
                                           type="text"
                                           v-model="tempProduct.title">
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="category">分類</label>
                                        <input class="form-control" id="category" placeholder="請輸入分類"
                                               type="text"
                                               v-model="tempProduct.category">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="price">單位</label>
                                        <input class="form-control" id="unit" placeholder="請輸入單位"
                                               type="unit"
                                               v-model="tempProduct.unit">
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="origin_price">原價</label>
                                        <input class="form-control" id="origin_price" placeholder="請輸入原價"
                                               type="number"
                                               v-model="tempProduct.origin_price">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="price">售價</label>
                                        <input class="form-control" id="price" placeholder="請輸入售價"
                                               type="number"
                                               v-model="tempProduct.price">
                                    </div>
                                </div>
                                <hr>

                                <div class="form-group">
                                    <label for="description">產品描述</label>
                                    <textarea class="form-control" id="description" placeholder="請輸入產品描述"
                                              type="text"
                                              v-model="tempProduct.description"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="content">說明內容</label>
                                    <textarea class="form-control" id="content" placeholder="請輸入產品說明內容"
                                              type="text"
                                              v-model="tempProduct.content"></textarea>
                                </div>
                                <div class="form-group">
                                    <div class="form-check">
                                        <input :false-value="0" :true-value="1"
                                               class="form-check-input"
                                               id="is_enabled"
                                               type="checkbox"
                                               v-model="tempProduct.is_enabled">
                                        <label class="form-check-label" for="is_enabled">
                                            是否啟用
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-outline-secondary" data-dismiss="modal" type="button">取消</button>
                        <button @click="updateProduct" class="btn btn-primary" type="button">確認</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    import $ from 'jquery';


    export default {
        name: 'Products',
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
        methods: {
            getProducts(page = 1) {
                const vm = this;

                vm.isLoading = true;
                this.$http.get(`http://vue-course-api.hexschool.io/api/bearhsu2/admin/products?page=${page}`)
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
                    ? 'http://vue-course-api.hexschool.io/api/bearhsu2/admin/product'
                    : `http://vue-course-api.hexschool.io/api/bearhsu2/admin/product/${vm.tempProduct.id}`;

                let action = vm.isNew ? 'post' : 'put';


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
                this.$http.post('https://vue-course-api.hexschool.io/api/bearhsu2/admin/upload', formData, {
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
            deleteProduct() {
            }
        },
        created() {
            this.getProducts();
        }
    }

</script>
