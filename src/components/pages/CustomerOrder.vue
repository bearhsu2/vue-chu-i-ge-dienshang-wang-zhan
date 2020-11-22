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
                        <button @click="addtoCart(item.id)" class="btn btn-outline-danger btn-sm ml-auto" type="button">
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

        <div class="mx-auto mt-4" style="width: 50%">
            <div class="text-center">
                <h4>我的購物車</h4>

            </div>
            <table class="table">
                <thead>
                <th></th>
                <th>品名</th>
                <th>數量</th>
                <th>單價</th>
                </thead>
                <tbody>
                <tr :key="item.id" v-for="item in cart.carts">
                    <td class="align-middle">
                        <button class="btn btn-outline-danger btn-sm" type="button">
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </td>
                    <td class="align-middle">
                        {{ item.product.title }}
                        <!-- <div class="text-success" v-if="item.coupon">
                          已套用優惠券
                        </div> -->
                    </td>
                    <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                    <td class="align-middle text-right">{{ item.final_total }}</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td class="text-right" colspan="3">總計</td>
                    <td class="text-right">{{ cart.total }}</td>
                </tr>
                <tr>
                    <td class="text-right text-success" colspan="3">折扣價</td>
                    <td class="text-right text-success">{{ cart.final_total }}</td>
                </tr>
                </tfoot>
            </table>
            <div class="input-group mb-3 input-group-sm">
                <input class="form-control" placeholder="請輸入優惠碼" type="text">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button">
                        套用優惠碼
                    </button>
                </div>
            </div>
        </div>


        <div aria-hidden="true" aria-labelledby="productModalLabel" class="modal fade" id="productModal" role="dialog"
             tabindex="-1">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="productModalLabel">產品詳情</h5>
                    </div>

                    <div class="modal-body">

                        <div class="row">


                            <div class="col-4">
                                <img :src="product.imageUrl" alt="Responsive image" class="rounded float-left">
                            </div>

                            <div class="col-8">
                                <span class="badge badge-secondary float-right ml-2">{{product.category}}</span>
                                <h5 class="card-title">
                                    {{product.title}}
                                </h5>
                                <p class="card-text">{{product.description}}</p>
                                <blockquote class="blockquote">
                                    {{product.content}}
                                </blockquote>
                                <div class="d-flex justify-content-between align-items-baseline">
                                    <div class="h5" v-if="!product.origin_price">售價{{product.price | currency}}元</div>
                                    <del class="h6" v-if="product.origin_price">原價{{product.origin_price | currency}}元
                                    </del>
                                    <div class="h5" v-if="product.origin_price">現在只要{{product.price | currency}}元</div>
                                </div>

                                <select class="custom-select mt-2" v-model="product.num">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>

                        </div>


                    </div>

                    <div class="modal-footer">
                        <div class="text-muted text-nowrap mr-3">
                            小計 {{product.num * product.price | currency}} 元
                        </div>
                        <button class="btn btn-primary" type="button">
                            <i class="fa fa-spinner fa-spin" v-if="isLoadingItem(product.id)"></i>
                            加到購物車
                        </button>
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
                },
                cart: {
                    carts: []
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
                        // console.log(response);

                        vm.product = response.data.product;
                        this.status.loadingItem = '';
                        $('#productModal').modal('show');


                    })
            },
            isLoadingItem(id) {
                return this.status.loadingItem === id;
            },
            addtoCart(id, qty = 1) {
                this.status.loadingItem = id;
                const vm = this;
                const url = `${process.env.VUE_APP_SERVER_URL}/api/${process.env.VUE_APP_API_NAME}/cart`;
                const cart = {product_id: id, qty: qty};
                // console.log("cart: ", cart);
                this.$http.post(url, {data: cart})
                    .then((response) => {
                        // console.log(response);
                        vm.status.loadingItem = '';
                        vm.getCart();
                    })
            },
            getCart() {
                const vm = this;
                const url = `${process.env.VUE_APP_SERVER_URL}/api/${process.env.VUE_APP_API_NAME}/cart`;
                this.$http.get(url)
                    .then((response) => {
                        // console.log("cart!!!", response);
                        vm.cart = response.data.data;
                    })
            }
        },
        created() {
            $('#productModal').modal('hide');
            this.getProducts();
            this.getCart();
        }
    }

</script>
