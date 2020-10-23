<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>

        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Card Title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, aliquid, aperiam asperiores delectus
                    deserunt dicta, ducimus fuga ipsam laboriosam molestiae molestias nisi nulla numquam praesentium
                    ratione reprehenderit sunt totam velit.
                    card's content.</p>
                <a class="btn btn-primary" href="#">Go somewhere</a>
            </div>
        </div>
    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue'

    export default {
        name: 'App',
        components: {
            HelloWorld
        },
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
    /*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
    /*  -webkit-font-smoothing: antialiased;*/
    /*  -moz-osx-font-smoothing: grayscale;*/
    /*  text-align: center;*/
    /*  color: #2c3e50;*/
    /*  margin-top: 60px;*/
    /*}*/

    @import "~bootstrap/scss/bootstrap";

</style>
