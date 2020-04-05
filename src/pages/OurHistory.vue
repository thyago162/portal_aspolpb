<template>
    <b-container fluid >

        <b-row>
            <b-col class="title">
                <h5>NOSSA HISTORIA</h5>
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

</style>