<template>
    <div>
        <b-modal size="xl" title="Notícias" id="cp-news" ref="cpnews" 
          no-close-on-backdrop header-bg-variant="primary" header-text-variant="light" hide-footer>
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
                        @click="resetModal" :style="{float: 'right'}" >
                         <b-icon icon="plus" ></b-icon>
                         novo item
                     </b-button>
                 </b-col>
             </b-row>

             <ErroMessage :errors="errors" :visibility="visibility"/>
             <Session :countdown="countdown" ref="cpNews"/>

             <b-row class="news-table">
                 <b-col>
                     <b-table :fields="fields" :items="news" striped hover 
                        :per-page="perPage" :current-page="currentPage" id="table-news">

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
    import ErroMessage from '../error/ErrorMessage';
    import Session from '../session/Session';
    export default {

        components: {
            FormNews,
            ErroMessage,
            Session
        },

        mounted() {
            this.$store.dispatch('news');
        },

        data() {
            return {
                fields: [
                    {key: 'nm_title', label: 'Título', sortable: true},
                    {key: 'dt_date', label: 'Data', sortable: true},
                    {key: 'delete', label: ''}
                ],
                bgColor: '#778899',
                position: 'top-right',
                perPage: 5,
                currentPage: 1,
                search: '',
                newsItem: [],
                visibility: false,
                errors: [],
                countdown: 0,
            }
        },

        computed: {
            news() {

                if(this.search.length > 0 ) {
                    var vm = this;

                    return this.$store.getters.getNews.filter(function (item) {
                        return item.nm_title.toLowerCase().indexOf(vm.search.toLowerCase()) !== -1
                        
                    })
                    
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

            deleteNews(id) {

                if (confirm("Deseja realmente exluir?")) {

                    this.$http.delete('news/'+id, {
                        headers: {
                            Authorization: 'Bearer '+this.token
                        }
                    })
                    .then(res => {
                        if (res.status === 200) {
                            if (res.data.token_failure) {
                                this.countdown = 3;
                            }

                            if (res.data.result.error) {
                                this.errors.push(res.data.result.error);
                                this.visibility = true;

                            } else {
                                this.$store.disptach('news');
                                alert("Notícia removida");
                            }

                        }
                    })
                    .catch(err => {
                        this.errors.push(err);
                        this.visibility = true;
                    })
                }
            },

            searchItems(arraySearch) {
                var vm = this;

                return arraySearch.filter(function (item) {
                    return item.nm_title.toLowerCase().indexOf(vm.search.indexOf()) !== -1
                })
            },

            resetModal() {
                this.newsItem.nm_title = '';
                this.newsItem.nm_subtitle = '';
                this.newsItem.dt_date = '';
                this.newsItem.nm_content = '';
                this.newsItem.st_highlights = '';
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