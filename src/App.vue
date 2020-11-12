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
            const url = `${process.env.VUE_APP_SERVER_URL}/api/${process.env.VUE_APP_API_NAME}/products`;
            this.$http.get(url)
                .then((response) => {
                    console.log(response.data.products)
                })
        }
    }
</script>

<style lang="scss">
    @import "./assets/all.scss";


</style>
