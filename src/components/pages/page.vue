<template>

    <div class="hello">
        <router-link to='/page'>Card 1</router-link>
        <router-link to='/page/child2'>Card 2</router-link>
        <router-link to='/page/child3'>Card 3</router-link>
        <div class="card" style="width: 18rem;">
            <router-view></router-view>
<!--            <div class="card-body">-->
<!--                <h5 class="card-title">Card title</h5>-->
<!--                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the-->
<!--                    card's content.</p>-->
<!--                <a class="btn btn-primary" href="#">Go somewhere</a>-->
<!--            </div>-->
        </div>
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

