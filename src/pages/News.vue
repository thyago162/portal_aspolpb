<template >
    <b-container fluid class="news">

        <b-row>
            <b-col lg="12" class="news-head" >
                <div class="news-title">
                    <h5 class="mt-2">NOTÍCIAS</h5>
                </div>
            </b-col>
        </b-row>
        
        <b-row >
            <b-col>
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
    .news {
        width: 95%;
    }

    .news-head {
        margin-top: 20px;
        border-bottom: 3px solid red;
    }

    .news-title {
        background: rgba(138,21,0,1);
        background: -moz-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -webkit-gradient(left top, right top, color-stop(0%, rgba(138,21,0,1)), color-stop(25%, rgba(186,35,15,1)), color-stop(71%, rgba(201,27,8,1)), color-stop(100%, rgba(240,31,12,1)));
        background: -webkit-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -o-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -ms-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: linear-gradient(to right, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8a1500', endColorstr='#f01f0c', GradientType=1 );
        width: 180px;
        height: 40px;
        color: white;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-left: -15px;
        margin-top: 10px;
    }

    a {
        text-decoration: none;
    }
    .card-text {
        font-size: 16px;
    }

    .card-title {
        color: red;
        font-weight: bolder;
    }

    a:hover {
        color: darkred;
    }

     @media screen and (max-width: 1400px) {
        .news-title {
            width: 150px;
            height: 35px;
        }

        h5 {
            font-size: 16px;
            font-weight: bold;
        }
    }

    @media screen and (max-width: 1000px) {
        .news-title {
            width: 120px;
            height: 25px;
        }

        h5 {
            font-size: 14px;
        }
        
    }

    @media screen  and (max-width: 575px){
        .news-title {
            width: 80px;
            height: 20px;
        }

        h5 {
            font-size: 12px;
        }
    }

    @media screen  and (max-width: 375px){
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