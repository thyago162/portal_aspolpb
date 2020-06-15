<template>
    <b-modal id="session-off" ref="session" hide-header hide-footer @show="setCountdown">
        <b-alert
            :show="dismissCountDown"
            dismissible
            variant="warning"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
        >
            Sessão expirada. você será redirecionado...
        </b-alert>

    </b-modal>
</template>

<script>
    export default {

        data() {
            return {
                countdown: 0
            }
        },
        

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
                    this.$router.push({name: 'home'})
                }
            },

            setCountdown() {
                this.countdown = 3;
            }
        }

        
    }
</script>

<style scoped>

</style>