<template>
    <div>
        <div class="text-right mt-4">
            <button @click="openModal" class="btn btn-primary">新增產品</button>
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

        <div aria-hidden="true" aria-labelledby="exampleModalLabel" class="modal fade" id="productModal" role="dialog"
             tabindex="-1">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button aria-label="Close" class="close" data-dismiss="modal" type="button">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" data-dismiss="modal" type="button">Close</button>
                        <button class="btn btn-primary" type="button">Save changes</button>
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
            },
            openModal() {
                $('#productModal').modal('show');
            }
        },
        created() {
            this.getProducts();
        }
    }

</script>
