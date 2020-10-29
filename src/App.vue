<template>
    <div id="app">

        <div class="container">
            <router-view></router-view>
        </div>

    </div>
</template>

<script>

    export default {
        name: 'App',
        components: {},
        created() {
            const api = 'https://vue-course-api.hexschool.io/api/bearhsu2/products';
            this.$http.get(api)
                .then((response) => {
                    console.log(response.data.products)
                })
        }
    }
</script>

<style lang="scss">
    @import "./assets/all.scss";



</style>
