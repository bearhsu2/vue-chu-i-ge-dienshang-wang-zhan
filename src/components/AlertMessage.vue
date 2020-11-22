<template>
    <div class="message-alert">
        <div :class="'alert-' + item.status"
             :key="i"
             class="alert alert-dismissible" v-for="(item, i) in messages">
            {{ item.message }}
            <button @click="removeMessage(i)" aria-label="Close" class="close" type="button">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AlertMessage',
        data() {
            return {
                messages: [],
            };
        },
        methods: {
            updateMessage(message, status) {
                const timestamp = Math.floor(new Date() / 1000);
                this.messages.push({
                    message,
                    status,
                    timestamp,
                });
                this.removeMessageWithTiming(timestamp);
            },
            removeMessage(num) {
                this.messages.splice(num, 1);
            },
            removeMessageWithTiming(timestamp) {
                const vm = this;
                setTimeout(() => {
                    vm.messages.forEach((item, i) => {
                        if (item.timestamp === timestamp) {
                            vm.messages.splice(i, 1);
                        }
                    });
                }, 5000);
            },
        },
        created() {
            const vm = this;

            // 自定義名稱 'messsage:push'
            // message: 傳入參數
            // status: 樣式，預設值為 warning
            vm.$bus.$on('message:push', (message, status = 'warning') => {
                vm.updateMessage(message, status);
            });
            // vm.$bus.$emit('message:push');
        },
    };
</script>

<style scope>
    .message-alert {
        position: fixed;
        max-width: 50%;
        top: 56px;
        right: 20px;
        z-index: 1100;
    }
</style>
