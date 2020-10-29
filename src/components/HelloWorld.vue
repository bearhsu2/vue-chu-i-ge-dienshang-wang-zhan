<template>
    <div class="hello">
        <a @click.prevent="logOut" href="#">登出</a>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        methods: {
            logOut() {

                this.$http.post('https://vue-course-api.hexschool.io/logout')
                    .then((response) => {
                            console.log(response.data)
                            if (response.data.success) {
                                this.$router.push('/login');
                            }
                        }
                    )
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
