<template >
    <b-container fluid  class="mb-3">

        <b-row class="header-title mt-3" >
            <b-col lg="11" class="title" >
                <h5 class="mt-2">NOTÍCIAS</h5>
            </b-col>
        </b-row>
        
        <b-row  class="align-body">
            <b-col lg="11"  >
                <b-table :fields="fields" :items="allNews" :per-page="perPage" :current-page="currentPage" id="news-table">
                    <template v-slot:cell(card)="row">
                        <b-card>
                            <b-card-text class="card-text">
                                Noticias da aspolpb
                            </b-card-text>
                            <b-link :to="{name: 'visualizar-noticias', params: {title: row.item.nm_title}}">
                                <b-card-title class="card-title">
                                    {{row.item.nm_title}}
                                </b-card-title>
                            </b-link>
                            
                            <b-card-text :style="{fontWeight: 'bolder'}">
                                {{row.item.dt_date | date}}
                            </b-card-text>
                        </b-card>
                    </template>
                </b-table>
                <b-pagination
                    align="center"
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="news-table"
                ></b-pagination>

            </b-col>
        </b-row>

    </b-container>
</template>

<script>
    export default {

        components: {
        },

        mounted() { 
            this.$store.dispatch('news');
        },

        data() {
            return {
                currentPage: 1,
                perPage: 5,
                error: [],
                fields: [
                    {key: 'card', label: ''}
                ]
            }
        },

        computed: {
            allNews: function() {
                return this.$store.getters.getNews;
            },
            title: function() {
                return this.news.nm_title;
            },
            rows: function() {
                return this.allNews.length;
            }
        }      
    }
</script>

<style scoped>

    a {
        text-decoration: none;
    }
    .card-text {
        font-size: 16px;
        font-weight: bolder;
    }

    .card-title {
        color: red;
        font-weight: bolder;
        font-size: 18px;
    }

    a:hover {
        color: darkred;
    }

    @media screen  and (max-width: 414px){
        .news-title {
            width: 80px;
            height: 20px;
        }

        h5 {
            font-size: 12px;
        }

        .card-title {
            font-size: 12px;
        }

        .card-text {
            font-size: 12px;
        }
    }


</style>