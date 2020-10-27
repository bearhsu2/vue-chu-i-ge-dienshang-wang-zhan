<template>

    <div>

        <div class="card-body">
            <h5 class="card-title">Card 3</h5>
            <p class="card-text">{{ name }} says: "Some quick example text to build on the card title and make up the bulk of the
                card's content."</p>
            <a class="btn btn-primary" href="#">Go somewhere</a>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'Card1',
        data() {
            return {
                name: ''
            }
        },
        created() {
            console.log(this.$route.params.id);

            const id = this.$route.params.id;
            this.$http.get(`https://randomuser.me/api/?seed=${id}`).then((response) => {
                console.log(response);
                this.name = response.data.results[0].name.first;
            });
        }
    }
</script>

