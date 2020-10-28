<template>
    <div id="app">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Navbar</a>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">

                    <li class="nav-item active">
                        <router-link class="nav-link" to='/'>Home</router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link class="nav-link" to='/page'>Page</router-link>
                    </li>
                </ul>
            </div>
        </nav>

        <router-view name="menu"></router-view>
        <div class="container">
            <router-view></router-view>
            <button type="button" class="btn btn-primary">Primary</button>
            <button type="button" class="btn btn-secondary">Secondary</button>
            <button type="button" class="btn btn-success">Success</button>
            <button type="button" class="btn btn-danger">Danger</button>
            <button type="button" class="btn btn-warning">Warning</button>
            <button type="button" class="btn btn-info">Info</button>
            <button type="button" class="btn btn-light">Light</button>
            <button type="button" class="btn btn-dark">Dark</button>

            <button type="button" class="btn btn-link">Link</button>
        </div>

    </div>
</template>

<script>

    export default {
        name: 'App',
        components: {},
        created() {
            const api = 'https://vue-course-api.hexschool.io/api/simbodev/products';
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
