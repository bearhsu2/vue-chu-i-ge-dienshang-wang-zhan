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
                this.$http.get('https://vue-course-api.hexschool.io/api/bearhsu2/products')
                    .then((response) => {
                        console.log(response.data.products)
                    })
            }
        },
        created() {
            this.getProducts();
        }
    }

</script>
