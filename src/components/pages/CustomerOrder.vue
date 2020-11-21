<template>
    <div>


        <div class="row mt-4">

            <div :key="item.id" class="col-md-4 mb-4" v-for="item in products">
                <div class="card border-0 shadow-sm">
                    <div :style="{backgroundImage: `url(${item.imageUrl})`}"
                         style="height: 150px; background-size: cover; background-position: center">
                    </div>
                    <div class="card-body">
                        <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
                        <h5 class="card-title">
                            <a class="text-dark" href="#">{{item.title}}</a>
                        </h5>
                        <p class="card-text">{{item.description}}</p>
                        <div class="d-flex justify-content-between align-items-baseline">
                            <!-- <div class="h5">2,800 元</div> -->
                            <div class="h5" v-if="!item.origin_price">售價{{item.price | currency}}元</div>
                            <del class="h6" v-if="item.origin_price">原價{{item.origin_price | currency}}元</del>
                            <div class="h5" v-if="item.origin_price">現在只要{{item.price | currency}}元</div>
                        </div>
                    </div>
                    <div class="card-footer d-flex">
                        <button @click="getProduct(item.id)" class="btn btn-outline-secondary btn-sm" type="button">
                            <i class="fas fa-spinner fa-spin" v-if="isLoadingItem(item.id)"></i>
                            查看更多
                        </button>
                        <button class="btn btn-outline-danger btn-sm ml-auto" type="button">
                            <i class="fas fa-spinner fa-spin" v-if="isLoadingItem(item.id)"></i>
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

        <div aria-hidden="true" aria-labelledby="productModalLabel" class="modal fade" id="productModal" role="dialog"
             tabindex="-1">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="productModalLabel">產品詳情</h5>
                    </div>


                    <div class="container">

                        <div :style="{backgroundImage: `url(${product.imageUrl})`}"
                             style="height: 150px; background-size: cover; background-position: center">
                        </div>
                        <div class="mt-4">
                            <span class="badge badge-secondary float-right ml-2">{{product.category}}</span>
                            <h5 class="card-title">
                                {{product.title}}
                            </h5>
                            <p class="card-text">{{product.description}}</p>
                            <p class="card-text">{{product.content}}</p>
                            <div class="d-flex justify-content-between align-items-baseline">
                                <!-- <div class="h5">2,800 元</div> -->
                                <div class="h5" v-if="!product.origin_price">售價{{product.price | currency}}元</div>
                                <del class="h6" v-if="product.origin_price">原價{{product.origin_price | currency}}元</del>
                                <div class="h5" v-if="product.origin_price">現在只要{{product.price | currency}}元</div>
                            </div>
                        </div>


                    </div>


                </div>
            </div>
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
                product: {},
                pagination: {},
                isLoading: false,
                status: {
                    loadingItem: ''
                }
            }
        },
        computed: {},
        methods: {
            getProducts(page = 1) {
                const vm = this;

                vm.isLoading = true
                const url = `${process.env.VUE_APP_SERVER_URL}/api/${process.env.VUE_APP_API_NAME}/products?page=${page}`;
                this.$http.get(url)
                    .then((response) => {
                        vm.isLoading = false;
                        vm.products = response.data.products;
                        vm.pagination = response.data.pagination;
                    })
            },
            getProduct(id) {
                this.status.loadingItem = id;
                const vm = this;

                const url = `${process.env.VUE_APP_SERVER_URL}/api/${process.env.VUE_APP_API_NAME}/product/${id}`;
                this.$http.get(url)
                    .then((response) => {
                        console.log(response);

                        vm.product = response.data.product;
                        this.status.loadingItem = '';
                        $('#productModal').modal('show');


                    })
            },
            isLoadingItem(id) {
                return this.status.loadingItem === id;
            }
        },
        created() {
            $('#productModal').modal('hide');
            this.getProducts();
        }
    }

</script>
