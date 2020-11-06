<template>
    <div>
        <div class="text-right mt-4">
            <button class="btn btn-primary">新增產品</button>
        </div>


        <table class="table table-striped mt-4">
            <thead>
            <td>分類</td>
            <td>產品名稱</td>
            <td>原價</td>
            <td>售價</td>
            <td>啟用</td>
            <td>編輯</td>
            </thead>
            <tbody>
            <tr :key=item.id v-for="item in products">

                <td>{{item.category}}</td>
                <td>{{item.title}}</td>
                <td>{{item.origin_price}}</td>
                <td>{{item.price}}</td>
                <td>
                    <span class="text-success" v-if="item.is_enabled">Active</span>
                    <span v-else>Inactive</span>
                </td>
                <td>
                    <button class="btn btn-outline-primary btn-sm">編輯</button>
                </td>

            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>

    export default {
        name: 'Products',
        data() {
            return {

                products: []
            }
        },
        methods: {
            getProducts() {
                const vm = this;
                this.$http.get('http://vue-course-api.hexschool.io/api/bearhsu2/admin/products')
                    .then((response) => {
                        console.log(response);
                        vm.products = response.data.products;
                    })
            }
        },
        created() {
            this.getProducts();
        }
    }

</script>
