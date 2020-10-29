<template>
    <div class="hello">
        <form @submit.prevent="signIn" class="form-signin">
            <!--            <img alt="" class="mb-4" height="72" src="/docs/4.5/assets/brand/bootstrap-solid.svg" width="72">-->
            <h1 class="h3 mb-3 font-weight-normal">登入頁面</h1>
            <label class="sr-only" for="inputEmail">Email address</label>
            <input autofocus class="form-control" id="inputEmail" placeholder="Email address" required
                   type="email" v-model="user.username">
            <label class="sr-only" for="inputPassword">Password</label>
            <input class="form-control" id="inputPassword" placeholder="Password" required type="password"
                   v-model="user.password">
            <div class="checkbox mb-3">
                <label>
                    <input type="checkbox" value="remember-me"> Remember me
                </label>
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            <p class="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
        </form>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                user: {
                    username: 'bearhsu2@gmail.com',
                    password: 'aaa123'
                }
            }
        },
        methods: {
            signIn() {
                const vm = this;
                this.$http.post('https://vue-course-api.hexschool.io/admin/signin', vm.user)
                    .then((response) => {
                        console.log("response: ", response.data)
                        if (response.data.success) {
                            this.$router.push('/');
                        }
                    })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    html,
    body {
        height: 100%;
    }

    body {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #f5f5f5;
    }

    .form-signin {
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: auto;
    }

    .form-signin .checkbox {
        font-weight: 400;
    }

    .form-signin .form-control {
        position: relative;
        box-sizing: border-box;
        height: auto;
        padding: 10px;
        font-size: 16px;
    }

    .form-signin .form-control:focus {
        z-index: 2;
    }

    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
</style>
