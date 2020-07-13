<template>
    <b-container fluid class="mb-3">

        <b-row class="header-title ml-1 mr-1">
            <b-col class="title" >
                <h5>NOSSA HISTORIA</h5>
            </b-col>
        </b-row>
        <b-row class="mb-4 mt-3 align-body ml-1 mr-1">
          
            <b-col >
                <b-button variant="warning" class="mt-2" :style="{float: 'right'}" v-if="administrator == 1">
                    <b-icon icon="pencil" v-b-modal.form-history></b-icon>
                </b-button>
                <b-media class="mt-5">
                    <div  class="mt-3" v-html="ourHistory.nm_content">
                        
                    </div>
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
        color: #000;
    }
    .content >>> img {
        width: 100%;
        height: 700px;
        object-fit: contain;
        object-position: center; 
    }

</style>