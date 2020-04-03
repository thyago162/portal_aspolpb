<template>
    <div class="mt-3">
        <b-alert
            :show="dismissCountDown"
            dismissible
            variant="warning"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
        >
            Sessão expirada. você será redirecionaado
    </b-alert>

    </div>
</template>

<script>
    export default {
        props: ['countdown'],

        computed: {
            dismissCountDown: function() {
                return this.countdown;
            }
        },

        methods: {
            countDownChanged(dismiss) {
                this.dismissCountDown = dismiss;

                if (dismiss === 2) {
                    this.$session.destroy();
                }

                if (dismiss === 1) {
                    this.$store.dispatch('token', null);
                }

                if (dismiss === 0) {
                    location.replace('/')
                }
            },
        }

        
    }
</script>

<style scoped>

</style>