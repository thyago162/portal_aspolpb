<template >
    <b-container fluid  class="mb-3">

        <b-row class="header-title mt-3" >
            <b-col lg="11" class="title" >
                <h5 class="mt-2">NOTÍCIAS</h5>
            </b-col>
        </b-row>
        
        <b-row  class="align-body">
            <b-col lg="11"  >
                <b-table :fields="fields" :items="news.data" :per-page="news.per_page" 
                    :current-page="currentPage" id="news-table">

                    <template v-slot:cell(card)="row">

                        <b-card v-if="row.item.st_active === 1" img-left no-body >
                            <b-card-header v-if="row.item.nm_image_path" class="card-header" >
                                <b-img :src="row.item.nm_image_path" fluid class="image-header"/>
                            </b-card-header>
                           <b-card-body :style="{width: '85%'}">
             
                                <b-link :to="{name: 'visualizar-noticias', params: {title: row.item.nm_title}}">
                                    <b-card-title class="card-title">
                                        {{row.item.nm_title}}
                                    </b-card-title>
                                </b-link>

                                <b-card-text :style="{color: 'gray'}">
                                    {{row.item.nm_content | newsContent}}
                                </b-card-text>
                                
                            </b-card-body>
                        </b-card>

                    </template>

                </b-table>
               <b-pagination
                    align="center"
                    v-model="news.current_page"
                    :total-rows="news.total"
                    :per-page="news.per_page"
                    aria-controls="news-table"
                    @input="getNews"
                ></b-pagination>

            </b-col>
        </b-row>

    </b-container>
</template>

<script>
    export default {

        components: {
        },

        created() { 
            this.$store.dispatch('news', 1);
        },

        data() {
            return {
                error: [],
                modifiedText: '',
                perPage: 5,
                currentPage: 1,
                fields: [
                    {key: 'card', label: ''}
                ]
            }
        },

        computed: {
            news: function() {
                return this.$store.getters.getNews;
            },
        },
 
        methods: {

            getNews() {
                this.$store.dispatch('news', this.news.current_page);
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

    .card-header {
        width: 15%;
    }

    .image-header {
        width: 120px;
        max-height: 112px;
        object-fit: cover;
        object-position: center;
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

        .card-header {
            display: none;
        }
    }


</style>