<template>
    <div id="app">

        <div>
            <router-view></router-view>
        </div>

    </div>
</template>

<script>

    export default {
        name: 'App',
        components: {},
        created() {
            this.$http.get('https://vue-course-api.hexschool.io/api/bearhsu2/products')
                .then((response) => {
                    // console.log(response.data.products)
                })
        }
    }
</script>

<style lang="scss">
    @import "./assets/all.scss";


</style>
