<template>
    <div>
        <b-modal size="xl" title="Notícias" id="cp-news" ref="cpnews" 
         hide-footer no-close-on-backdrop header-bg-variant="primary" header-text-variant="light">
         <b-container fluid>
             <b-row >
                 <b-col lg="3">
                    <font-awesome-icon icon="print" size="2x" class="icon alt mr-3"/>
                    <font-awesome-icon icon="file-csv" size="2x" class="icon alt"/>
                 </b-col>
                 <b-col lg="7">
                    <b-form-input type="search" class="news-search" 
                        placeholder="Buscar notícia" />
                    <b-icon icon="search" class="search-icon" font-scale="1.5"></b-icon>
                 </b-col>
                 <b-col lg="2">
                     <b-button variant="success" @click="reload"  class="mr-3">
                         <b-icon icon="arrow-clockwise"></b-icon>
                     </b-button>

                     <b-button v-b-modal.form-news variant="primary" @click="closeModal">
                         <b-icon icon="plus" ></b-icon>
                     </b-button>
                 </b-col>
             </b-row>
             <b-row class="news-table">
                 <b-col>
                     <b-table :fields="fields" :items="news" striped hover 
                        :per-page="perPage" :current-page="currentPage" id="table-news">

                         <template v-slot:cell(edit)="row">
                             <b-button size="sm" class="mr-2" @click="editNews(row.item)" 
                                variant="info" v-b-modal.form-news>
                                 <b-icon icon="pen"></b-icon>
                             </b-button>
                         </template>

                          <template v-slot:cell(delete)="row">
                             <b-button size="sm" class="mr-2" @click="deleteNews(row.item)" variant="danger">
                                 <b-icon icon="trash"></b-icon>
                             </b-button>
                         </template>
                     </b-table>
                     <div class="overflow-auto">
                        <b-pagination
                            v-model="currentPage"
                            :total-rows="rows"
                            :per-page="perPage"
                            aria-controls="table-news"
                        ></b-pagination>
                     </div>
                 </b-col>
             </b-row>
         </b-container>
        </b-modal>
        
        <form-news :item="newsItem" />
   </div>
</template>

<script>
    import FormNews from '../news/FormNews';
    export default {

        components: {
            FormNews
        },

        mounted() {
            this.$store.dispatch('news');
        },

        data() {
            return {
                fields: [
                    {key: 'nm_title', label: 'Título'},
                    {key: 'dt_date', label: 'Data'},
                    {key: 'edit', label: ''},
                    {key: 'delete', label: ''}
                ],
                bgColor: '#778899',
                position: 'top-right',
                perPage: 5,
                currentPage: 1,
                newsItem: []
            }
        },

        computed: {
            news() {
                return this.$store.getters.getNews;
            },
            rows() {  
                return this.news.length
            }
        },

        methods: {
            closeModal() {
                this.$refs['cpnews'].hide();
            },

            editNews(item) {
                this.newsItem = item;
            },

            deleteNews() {},
            reload() {
                this.$store.dispatch('news');
                
            }
        }

    }
</script>

<style scoped>

    .news-table {
        margin-top: 20px;
    }

    .news-search {
        width: 80%;
        text-indent: 12px;
    }

    .search-icon {
        position: absolute;
        margin-top: -33px;
        margin-left: 2px;
    }
  
</style>