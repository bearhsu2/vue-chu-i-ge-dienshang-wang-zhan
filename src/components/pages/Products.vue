<template>
    <div>
        products information here...
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
                this.$http.get('https://vue-course-api.hexschool.io/api/bearhsu2/products')
                    .then((response) => {
                        vm.products = response.data.products;
                    })
            }
        },
        created() {
            this.getProducts();
        }
    }

</script>
