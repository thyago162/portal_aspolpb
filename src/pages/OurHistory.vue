<template>
    <b-container fluid class="our-history">

        <b-row>
            <b-col class="our-history-head">
                <div class="our-history-title">
                    <h5>NOSSA HISTORIA</h5>
                </div>
            </b-col>
        </b-row>
        <b-row class="mb-4">
            <b-col>
                <b-button variant="warning" class="mt-2" :style="{float: 'right'}" v-if="administrator == 1">
                    <b-icon icon="pencil" v-b-modal.form-history></b-icon>
                </b-button>
                <div v-html="ourHistory.nm_content" class="mt-3"></div>
            </b-col>
        </b-row>
        <FormHistory :item="ourHistory" />
    </b-container>
</template>

<script>
    import FormHistory from '../components/institucional/history/FormHistory';
    export default {

        components: {
            FormHistory
        },

        mounted() {
            this.$store.dispatch('ourHistory');
        },

        computed: {
            ourHistory: function() {
                return this.$store.getters.getOurHistory
            },

            administrator: function() {
                let user = this.$session.get('user');
                return user ? user.administrator : 0
            }
        },
      
    }
</script>

<style scoped>
    h5 {
        margin-top: 10px;
    }
    .our-history {
        width: 95%;
    }

    .our-history-head {
        border-bottom: 3px solid red;
        margin-top: 20px;
    }

    .our-history-title {
        background: rgba(138,21,0,1);
        background: -moz-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -webkit-gradient(left top, right top, color-stop(0%, rgba(138,21,0,1)), color-stop(25%, rgba(186,35,15,1)), color-stop(71%, rgba(201,27,8,1)), color-stop(100%, rgba(240,31,12,1)));
        background: -webkit-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -o-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -ms-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: linear-gradient(to right, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8a1500', endColorstr='#f01f0c', GradientType=1 );
        width: 200px;
        height: 40px;
        color: white;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-left: -15px;
        margin-top: 10px;
    }
</style>