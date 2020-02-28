<template>
      <div class="more-news ml-4">
        <b-card class="card-more-news" v-for="(n, index) in news" 
            :key="index" @click="seeNews(n.id_news)">
            <b-card-text>
                <b-img src="/aspolicone.ico" width="20px" height="20px" />
                <span style="float: right; color: red;">{{n.dt_date | date}}</span>
                <b-card-text class="mt-1">{{n.nm_title}} </b-card-text>
                
            </b-card-text>
        </b-card>
    </div>

       
</template>

<script>
    export default {

        mounted() {
            this.getMoreNews();
        },

        computed: {
            rows() {
                return this.news.length;
            }
        },

        data() {
            return {
                news: [],
            }

        },

        methods: {
            getMoreNews() {
                this.$http('news/morenews')
                .then(res => {
                    this.news = res.data.result.morenews;
                })
            },

            seeNews(id) {
                this.$router.push({ name: 'noticias', params: {id}})
            }
        }
       
        
    }
</script>

<style scoped>
    .card-more-news {
        border: none;
        border-left: 2px solid darkslategrey;
        background-color: lightgray;
        height: 100px;
        width: 700px;
        margin-top: 10px;
    }

    .card-text {
        font-size: 18px;
        font-weight: bold;
    }

    .more-news {
       display: flex;
       flex-direction: row;
       flex-wrap: wrap;
       justify-content: flex-start;
       align-items: center;
       height: 115px;
    }
</style>