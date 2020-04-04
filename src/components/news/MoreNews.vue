<template>
      <div class="more-news ml-4 mb-4">
        <b-card class="card-more-news" v-for="(n, index) in news" 
            :key="index" @click="seeNews(n.nm_title)">
            <b-card-text>
                <b-img src="/aspolicone.ico" width="20px" height="20px" />
                <span style="float: right; color: red;">{{n.dt_date | date}}</span>
                <b-card-text class="mt-1" :style="{color: 'red'}">{{n.nm_title}} </b-card-text>
                <b-card-text class="mt-1">{{n.nm_subtitle}} </b-card-text>
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

            seeNews(title) {
                this.$router.push({ name: 'visualizar-noticias', params: {title}})
            }
        }
       
        
    }
</script>

<style scoped>
    .card-more-news {
        border: none;
        border-left: 2px solid darkslategrey;
        background-color: lightgray;
        margin: 30px;
        width: 45%;
        height: 150px;
        
    }

    .card-text {
        font-size: 18px;
        font-weight: bold;
    }

    .more-news {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;

    }

  

    @media screen and (max-width: 1253px) {
        .card-text {
          font-size: 16px;
        }

        .card-more-news {
            width: 40%;
        }
    }

    @media screen  and (max-width: 1075px){
        .card-text {
            font-size: 14px;
        }
    }

    @media screen  and (max-width: 955px){
      .card-text {
          font-size: 12px;
      }
    }

    @media screen and (max-width: 839px) {
        .card-text {
            font-size: 10px;
        }
    }

    @media screen and (max-width: 653px) {
        .more-news {
            display: none;
        }

        .card-more-news {
            display: none;
        }
    }

</style>