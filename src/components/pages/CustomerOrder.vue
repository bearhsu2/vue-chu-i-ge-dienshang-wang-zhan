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

        <div class="mx-auto mt-4" style="width: 50%" v-if="cart.carts.length > 0">
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
                        <button @click="removeCartItem(item.id)" class="btn btn-outline-danger btn-sm" type="button">
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
                    <td class="align-middle text-right">{{ item.final_total | currency}}</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td class="text-right" colspan="3">總計</td>
                    <td class="text-right">{{ cart.total | currency}}</td>
                </tr>
                <tr v-if="cart.total != cart.final_total">
                    <td class="text-right text-success" colspan="3">折扣價</td>
                    <td class="text-right text-success">{{ cart.final_total | currency}}</td>
                </tr>
                </tfoot>
            </table>
            <div class="input-group mb-3 input-group-sm">
                <input class="form-control" placeholder="請輸入優惠碼" type="text" v-model="coupon_code">
                <div class="input-group-append">
                    <button @click="addCouponCode" class="btn btn-outline-secondary" type="button">
                        套用優惠碼
                    </button>
                </div>
            </div>
        </div>

        <div>

            <validation-observer class="my-5 row justify-content-center" v-slot="{ invalid, handleSubmit }">
                <form @submit.prevent="handleSubmit(submitForm)" class="col-md-6">


                    <validation-provider rules="required|email" v-slot="{ errors, classes }">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <!-- 輸入框 -->
                            <input :class="classes" class="form-control" id="email" name="email" placeholder="E-mail"
                                   type="email" v-model="form.user.email">
                            <!-- 錯誤訊息 -->
                            <span class="invalid-feedback">{{ errors[0] }}</span>
                        </div>
                    </validation-provider>

                    <validation-provider rules="required" v-slot="{ errors, classes }">
                        <div class="form-group">
                            <label for="username">收件人姓名</label>
                            <input :class="classes" class="form-control" id="username" name="name" placeholder="收件人姓名"
                                   type="text" v-model="form.user.name">
                            <span class="invalid-feedback">{{ errors[0] }}</span>
                        </div>
                    </validation-provider>

                    <validation-provider rules="required|digits:10" v-slot="{ errors, classes }">
                        <div class="form-group">
                            <label for="usertel">收件人電話</label>
                            <input :class="classes" class="form-control" id="usertel" placeholder="請輸入電話" type="tel"
                                   v-model="form.user.tel">
                            <span class="invalid-feedback">{{ errors[0] }}</span>
                        </div>
                    </validation-provider>

                    <validation-provider rules="required" v-slot="{ errors, classes }">
                        <div class="form-group">
                            <label for="useraddress">收件人地址</label>
                            <input :class="classes" class="form-control" id="useraddress" name="address"
                                   placeholder="請輸入地址"
                                   type="text"
                                   v-model="form.user.address">
                            <span class="invalid-feedback">{{ errors[0] }}</span>
                        </div>
                    </validation-provider>


                    <div class="text-right">
                        <button :disabled="invalid" class="btn btn-danger" type="submit">送出訂單</button>
                    </div>
                </form>
            </validation-observer>

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
                                    <option :value="num" v-for="num in 10">
                                        選購 {{num}} {{product.unit}}
                                    </option>
                                </select>
                            </div>

                        </div>
                    </div>

                    <div class="modal-footer">
                        <div class="text-muted text-nowrap mr-3">
                            小計 {{product.num * product.price | currency}} 元
                        </div>
                        <button @click="addtoCart(product.id, product.num)" class="btn btn-primary" type="button">
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
        name: 'CustomerOrder',
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
                },
                coupon_code: '',
                form: {
                    user: {
                        name: '',
                        email: '',
                        tel: '',
                        address: ''
                    }, message: ''
                }
            }
        },
        computed: {},
        methods: {
            submitForm() {
                console.log("HHHHH Submitted");
            },
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
                        $('#productModal').modal('hide');
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
            },
            removeCartItem(id) {
                this.isLoading = true;
                const vm = this;
                const url = `${process.env.VUE_APP_SERVER_URL}/api/${process.env.VUE_APP_API_NAME}/cart/${id}`;
                this.$http.delete(url)
                    .then((response) => {
                        console.log("removeCartItem!!!", response);
                        vm.getCart();
                        this.isLoading = false;
                    })
            },
            addCouponCode() {
                const vm = this;
                const url = `${process.env.VUE_APP_SERVER_URL}/api/${process.env.VUE_APP_API_NAME}/coupon`;
                const coupon = {
                    code: vm.coupon_code
                }

                vm.isLoading = true;
                this.$http.post(url, {data: coupon})
                    .then((response) => {

                        vm.isLoading = false;
                        if (response.data.success) {
                            vm.getCart();
                        } else {
                            vm.$bus.$emit('message:push', response.data.message, 'danger');
                        }
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
