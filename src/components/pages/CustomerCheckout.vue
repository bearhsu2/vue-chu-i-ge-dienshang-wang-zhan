<template>
    <div>Checkout</div>
</template>


<script>


    export default {
        name: 'CustomerCheckout',
        methods: {

        },
        data() {
            return {
                orderId: ''
            }
        },
        created() {
            this.orderId = this.$route.params.orderId;
            console.log("orderId = " + this.orderId);
        }

    }
</script>
