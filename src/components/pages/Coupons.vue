<template>
    <div>

        <div class="text-right mt-4">
            <button @click="openModal(true)" class="btn btn-primary">新增產品</button>
        </div>


        <table class="table table-striped mt-4">
            <thead>
            <tr class="d-flex">


                <td class="col-4">優惠</td>
                <td class="col-2">優惠碼</td>
                <td class="col-2">到期日</td>
                <td class="col-1">折扣</td>
                <td class="col-1">啟用</td>
                <td class="col-2">編輯</td>
            </tr>
            </thead>
            <tbody>
            <tr :key=coupon.id class="d-flex" v-for="coupon in coupons">

                <td class="col-4">{{coupon.title}}</td>
                <td class="col-2">{{coupon.code}}</td>
                <td class="col-2">{{coupon.due_date}}</td>
                <td class="col-1 text-right">{{coupon.percent}}</td>
                <td class="col-1">
                    <span class="text-success" v-if="coupon.is_enabled">Active</span>
                    <span v-else>Inactive</span>
                </td>
                <td class="col-2">
                    <button @click="openModal(false, coupon)" class="btn btn-outline-primary btn-sm">編輯</button>
                    <button @click="deleteCoupon(coupon)" class="btn btn-outline-danger btn-sm">刪除</button>
                </td>
            </tr>
            </tbody>
        </table>

        <Pagination :pagination="pagination" v-on:jumpPage="getCoupons"></Pagination>

        <div class="d-flex justify-content-center">
            <loading :active.sync="isLoading"></loading>
        </div>


        <div aria-hidden="true" aria-labelledby="couponModalLabel" class="modal fade" id="couponModal" role="dialog"
             tabindex="-1">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="couponModalLabel">{{modalTitle}}優惠</h5>
                        <button aria-label="Close" class="close" data-dismiss="modal" type="button">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">

                            <div class="col-sm-8">
                                <div class="form-group">
                                    <label for="title">優惠</label>
                                    <input class="form-control" id="title" placeholder="請輸入優惠"
                                           type="text"
                                           v-model="tempCoupon.title">
                                </div>


                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="code">優惠碼</label>
                                        <input class="form-control" id="code" placeholder="請輸入優惠碼"
                                               type="text"
                                               v-model="tempCoupon.code">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="percent">折扣</label>
                                        <input class="form-control" id="percent" placeholder="請輸入折扣"
                                               type="number"
                                               v-model="tempCoupon.percent">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="due_date">到期日</label>
                                        <input class="form-control" id="due_date" placeholder="請輸入到期日"
                                               type="date"
                                               v-model="tempCoupon.due_date">

                                    </div>
                                </div>
                                <hr>

                                <div class="form-group">
                                    <div class="form-check">
                                        <input :false-value="0" :true-value="1"
                                               class="form-check-input"
                                               id="is_enabled"
                                               type="checkbox"
                                               v-model="tempCoupon.is_enabled">
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
                        <button @click="updateCoupon" class="btn btn-primary" type="button">確認</button>
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
        name: 'Coupons',
        components: {Pagination},
        data() {
            return {
                coupons: [],
                pagination: {},
                tempCoupon: {},
                isNew: false,
                isLoading: false,
            }
        },
        computed: {

            modalTitle() {
                return this.isNew ? '新增' : '編緝';
            }

        },
        methods: {
            getCoupons(page = 1) {
                const vm = this;

                vm.isLoading = true
                const url = `${process.env.VUE_APP_SERVER_URL}/api/${process.env.VUE_APP_API_NAME}/admin/coupons?page=${page}`;
                this.$http.get(url)
                    .then((response) => {
                        console.log("coupons", response)
                        vm.isLoading = false;
                        vm.coupons = response.data.coupons;
                        vm.pagination = response.data.pagination;
                    })
            },
            openModal(isNew, item) {

                this.isNew = isNew;

                this.tempCoupon = isNew
                    ? {}
                    : Object.assign({}, item);

                $('#couponModal').modal('show');
            },
            updateCoupon() {

                console.log("tempCoupon", Date.parse(this.tempCoupon.due_date));


                const vm = this;

                let url = vm.isNew
                    ? `${process.env.VUE_APP_SERVER_URL}/api/${process.env.VUE_APP_API_NAME}/admin/coupon`
                    : `${process.env.VUE_APP_SERVER_URL}/api/${process.env.VUE_APP_API_NAME}/admin/coupon/${vm.tempCoupon.id}`
                let action = vm.isNew
                    ? 'post'
                    : 'put';


                this.$http[action](url, {data: vm.tempCoupon})
                    .then((response) => {
                        $('#couponModal').modal('hide');
                        vm.getCoupons();
                        if (!response.data.success) {
                            vm.$bus.$emit('message:push', "操作失敗", 'danger');
                        }
                    });
            },

            deleteCoupon(item) {
                // const vm = this;
                // const url = `${process.env.VUE_APP_SERVER_URL}/api/${process.env.VUE_APP_API_NAME}/admin/product/${item.id}`;
                // this.$http.delete(url)
                //     .then((response) => {
                //         $('#productModal').modal('hide');
                //         vm.getCoupons();
                //         if (!response.data.success) {
                //             vm.$bus.$emit('message:push', "操作失敗", 'danger');
                //         } else {
                //             vm.$bus.$emit('message:push', item.title + ' 已刪除');
                //         }
                //     });
                //

            },
        },
        created() {
            this.getCoupons();
        }
    }

</script>
