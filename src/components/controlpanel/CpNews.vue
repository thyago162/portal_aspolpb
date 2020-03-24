<template>
    <div>
        <b-modal size="xl" title="Notícias" id="cp-news" ref="cpnews" 
          no-close-on-backdrop header-bg-variant="primary" header-text-variant="light">
         <b-container fluid>

             <b-row >
                 <b-col >
                    <b-input-group>
                            <template v-slot:prepend>
                                <b-input-group-text>
                                    <b-icon icon="search"></b-icon>
                                </b-input-group-text>
                            </template>
                        <b-form-input v-model="search" />
                    </b-input-group>
                 </b-col>
                 <b-col >
                     <b-button v-b-modal.form-news variant="primary" 
                        @click="closeModal" :style="{float: 'right'}">
                         <b-icon icon="plus" ></b-icon>
                         novo item
                     </b-button>
                 </b-col>
             </b-row>

             <b-row class="news-table">
                 <b-col>
                     <b-table :fields="fields" :items="news" striped hover 
                        :per-page="perPage" :current-page="currentPage" id="table-news">

                         <template v-slot:cell(edit)="row" > 
                             <b-button size="sm"  @click="editNews(row.item)" 
                                variant="info" v-b-modal.form-news class="ml-1">
                                 <b-icon icon="pen"></b-icon>
                             </b-button>
                         </template>

                          <template v-slot:cell(delete)="row" >
                             <b-button size="sm"  @click="deleteNews(row.item.id_news)" variant="danger">
                                 <b-icon icon="trash"></b-icon>
                             </b-button>
                         </template>

                         <template v-slot:cell(dt_date)="row" >
                             {{row.item.dt_date | date }}
                         </template>
                     </b-table>
                     <div>
                        <b-pagination
                            align="center"
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
                    {key: 'nm_title', label: 'Título', sortable: true},
                    {key: 'dt_date', label: 'Data', sortable: true},
                    {key: 'edit', label: ''},
                    {key: 'delete', label: ''}
                ],
                bgColor: '#778899',
                position: 'top-right',
                perPage: 5,
                currentPage: 1,
                search: '',
                newsItem: [],
            }
        },

        computed: {
            news() {
               if(this.search.length > 0 ) {

                   return this.searchItems(this.$store.getters.getNews);
               }else {
                    return this.$store.getters.getNews;
               }
            },

            rows() {  
                return this.news.length;
            },

            itemsBkp() {
                return this.news;
            },

            token: function() {
                return this.$session.get('jwt');
            }

        },


        methods: {

            closeModal() {
                this.$refs['cpnews'].hide();
            },

            editNews(item) {
                this.newsItem = item;
            },

            deleteNews(id) {

                this.$http.delete('news/'+id, {
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                         if (res.data.token_failure) {
                            alert('Sessão expirada... Você será redirecionado!')
                            this.$session.destroy();
                            this.$store.disptach('logout');
                            this.$router.push('/');
                        }

                        alert('Notícia removida')
                    }
                })
            },

            searchItems(arraySearch) {
                let result = new Array();

                for(var i=0; i < arraySearch.length; i++) {
                    if(
                        !arraySearch[i].nm_title.search(this.search) 
                    ) {
                        result.push(arraySearch[i])
                    }
                }

                return result
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
        text-indent: 15px;
    }

    .search-icon {
        position: absolute;
        margin-top: -33px;
        margin-left: 2px;
    }
  
</style>