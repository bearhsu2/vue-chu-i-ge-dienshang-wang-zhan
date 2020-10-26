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
        <img alt="Vue logo" src="./assets/logo.png">

        <router-view></router-view>

    </div>
</template>

<script>

    export default {
        name: 'App',
        components: {},
        created() {
            this.$http.get('https://randomuser.me/api/')
                .then((response) => {
                    console.log(response.data)
                })
        }
    }
</script>

<style lang="scss">
    /*#app {*/
    /*    font-family: Avenir, Helvetica, Arial, sans-serif;*/
    /*    -webkit-font-smoothing: antialiased;*/
    /*    -moz-osx-font-smoothing: grayscale;*/
    /*    text-align: center;*/
    /*    color: #2c3e50;*/
    /*    margin-top: 60px;*/
    /*}*/


</style>
