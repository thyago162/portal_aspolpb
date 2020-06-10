<template>
    <b-container fluid class="mb-3">

        <b-row class="header-title">
            <b-col class="title" lg="11">
                <h5>NOSSA HISTORIA</h5>
            </b-col>
        </b-row>
        <b-row class="mb-4 mt-3 align-body">
            <b-col lg="11">
                <b-button variant="warning" class="mt-2" :style="{float: 'right'}" v-if="administrator == 1">
                    <b-icon icon="pencil" v-b-modal.form-history></b-icon>
                </b-button>
                <b-media class="mt-5 content">
                    <div v-html="ourHistory.nm_content" class="mt-3"></div>
                </b-media>
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

    .content >>> p {
        text-align: justify;
    }
    .content >>> img {
        width: 100%;
        height: 700px;
        object-fit: contain;
        object-position: center;
        
    }

</style>