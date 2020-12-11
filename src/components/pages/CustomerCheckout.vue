<template>
    <div class="my-5 row justify-content-center">
        <form class="col-md-6">
            <table class="table">
                <thead>
                <th>品名</th>
                <th>數量</th>
                <th>單價</th>
                </thead>
                <tbody>
                <tr :key="item.id" v-for="item in order.products">
                    <td class="align-middle">{{ item.product.title }}</td>
                    <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                    <td class="align-middle text-right">{{ item.final_total }}</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td class="text-right" colspan="2">總計</td>
                    <td class="text-right">{{ order.total }}</td>
                </tr>
                </tfoot>
            </table>

            <table class="table">
                <tbody>
                <tr>
                    <th width="100">Email</th>
                    <td>{{ order.user.email }}</td>
                </tr>
                <tr>
                    <th>姓名</th>
                    <td>{{ order.user.name }}</td>
                </tr>
                <tr>
                    <th>收件人電話</th>
                    <td>{{ order.user.tel }}</td>
                </tr>
                <tr>
                    <th>收件人地址</th>
                    <td>{{ order.user.address }}</td>
                </tr>
                <tr>
                    <th>付款狀態</th>
                    <td>
                        <span v-if="!order.is_paid">尚未付款</span>
                        <span class="text-success" v-else>付款完成</span>
                    </td>
                </tr>
                </tbody>
            </table>
            <div class="text-right" v-if="order.is_paid === false">
                <button class="btn btn-danger">確認付款去</button>
            </div>
        </form>
    </div>
</template>


<script>


    export default {
        name: 'CustomerCheckout',
        methods: {
            getOrder() {
                const vm = this;

                vm.isLoading = true
                const url = `${process.env.VUE_APP_SERVER_URL}/api/${process.env.VUE_APP_API_NAME}/order/${vm.orderId}`;
                this.$http.get(url)
                    .then((response) => {
                        vm.isLoading = false;

                        console.log(response);

                        if (response.data.success) {
                            vm.order = response.data.order;
                        }


                    })
            },
        },
        data() {
            return {
                orderId: '',
                order: {
                    user: ''
                }
            }
        },
        created() {
            this.orderId = this.$route.params.orderId;
            console.log("orderId = " + this.orderId);

            this.getOrder();
        }

    }
</script>
