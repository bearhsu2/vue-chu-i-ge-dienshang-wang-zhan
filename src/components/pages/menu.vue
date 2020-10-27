<template>

    <div class="hello my-3">
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
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {}
        },
    }
</script>

