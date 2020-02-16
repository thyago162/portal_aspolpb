<template>
    <div>
        <b-modal size="xl" title="Notícias" id="cp-news" ref="cpnews" 
         hide-footer no-close-on-backdrop>
         <template v-slot:modal-header>
             <h3>Minhas notícias</h3>
             <b-button variant="success" v-b-modal.addnews >
                <b-icon icon="plus" />
                  Notícia
            </b-button>
         </template>
         <b-table :fields="fields"></b-table>
        </b-modal>
        <add-news />
   </div>
</template>

<script>
    import AddNews from '../news/AddNews';
    export default {

        components: {
            AddNews
        },

        mounted() {
            this.$store.dispatch('news');
        },

        data() {
            return {
                fields: [
                    {key: 'nm_title', label: 'Título'},
                    {key: 'dt_date', label: 'Data'}
                ],
                bgColor: '#778899',
                position: 'top-right',
            }
        },

        computed: {
            news() {
                return this.$store.getters.getNews;
            }
        },

        methods: {
            closeModal() {
                this.$refs['cpnews'].hide();
            }
        }

    
        
    }
</script>

<style scoped>
  
</style>