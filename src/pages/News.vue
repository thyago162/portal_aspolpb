<template >
    <b-container fluid class="news">

        <b-row>
            <b-col lg="12" class="ml-5 news-head" >
                <div class="news-title">
                    <h5 class="mt-2">NOTÍCIAS</h5>
                </div>
            </b-col>
        </b-row>

        <b-row class="news-content">
            <b-col cols="4">
                <b-img :src="news.nm_image_path" class="news-image"></b-img>
                <h6 class="ml-4 mt-2">{{news.dt_date | date}}</h6> 
            </b-col>
            <b-col cols="8" >
                <h4 class="mt-4">{{news.nm_title}}</h4>
                <div v-html="news.nm_content" class="mt-4"></div>
            </b-col>
        </b-row>

        <b-row class="mt-2 ml-4">
            <b-col>
                <h4 class="mt-2">+ NOTICIAS</h4>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <carousel>
                    <slide v-for="(n, index) in allNews" :key="index" @click="seeNews">
                        <b-card class="card-more-news" >
                            <b-img src="/aspolicone.ico" width="20" height="20"></b-img>
                            <span style="float: right">{{n.dt_date | date}}</span>
                            <b-card-text class="mt-1">
                                {{n.nm_title}}
                            </b-card-text>
                        </b-card>

                    </slide>
                </carousel>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {

        components: {
        },
        
        mounted() {
           this.getCurrentNews()
        },

        data() {
            return {
                error: [],
                news: []
            }
        },

        computed: {
            allNews: function() {
                return this.$store.getters.getNews;
            }
        },


        methods: {
            getCurrentNews() {

                 this.$http('news/'+this.$route.params.id)
                .then(res => {
                    this.news = res.data.result.news;
                })
                .catch(err => {
                    this.error.push(err)
                })

            },

             seeNews() {
                this.$route.push({ name: 'noticias', params: {id: this.news.id_news}})
            }
       
        }
        
    }
</script>

<style scoped>
    .news {
        height: 750px;
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
        border-radius: 6px;
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


    .news-image {
        width: 450px;
        height: 300px;
        margin-left: 30px;
        margin-top: 30px;
    }

    .news-content {
        height: 430px;
        overflow: auto;
        border-bottom: 1px solid lightgray;
        box-shadow: 1px 2px 2px gray;
    }

    .card-more-news {
        border: none;
        border-left: 2px solid darkslategrey;
        height: 100px;
        width: 650px;
        margin-top: 10px;
    }

    .card-text {
        font-size: 18px;
        font-weight: bold;
        color: blue;
    }

    .more-news {
       display: flex;
       flex-direction: row;
       flex-wrap: wrap;
       justify-content: flex-start;
       align-items: center;
    }

</style>