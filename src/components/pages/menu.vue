<template>

    <div class="hello">
        <ul class="nav">
            <li class="nav-item">
                <router-link class="nav-link" to='/page'>Card 1</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to='/page/child2'>Card 2</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to='/page/child3'>Card 3</router-link>
            </li>

            <li class="nav-item">
                <a @click.prevent="updatePath" href="#">跳到指定頁面</a>
            </li>

            <li class="nav-item">
                <a @click.prevent="prevPath" href="#">上一頁</a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {}
        },
        methods: {
            updatePath() {
                this.$router.push('/page/child2');
            },
            prevPath() {
                this.$router.back();
            }
        }
    }
</script>

