<template>
      <div class="more-news mb-4">
        <b-card class="card-more-news" v-for="(n, index) in news" 
            :key="index" @click="seeNews(n.nm_title)">
            <b-card-text>
                <b-img src="/aspolicone.ico" width="20px" height="20px" />
                <span style="float: right; color: red;">{{n.dt_date | date}}</span>
                <b-link :style="{color: 'black', textDecoration: 'none'}">
                    <b-card-text class="mt-1 card-title">{{n.nm_title}} </b-card-text>
                </b-link>
                <b-card-text class="mt-1 card-subtitle">{{n.nm_subtitle}} </b-card-text>
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
        margin: 20px 10px 5px 5px;
        width: 48%;
        height: 150px;
    }

    .card-title {
        color: #000;
        font-weight: bolder;
        font-size: 18px;
    }

    .card-subtitle {
        color: red;
        font-size: 15px;
        font-weight: bolder;
    }

    .more-news {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    @media screen  and (max-width: 1024px){
        .card-subtitle {
            font-size: 14px;
            font-weight: bolder;
        }

        .card-more-news {
            width: 48.4%;
        }
        
    }

    @media screen and (max-width: 768px) {
        .card-more-news {
            width: 47%;
            height: 100px;
        }

        .card-subtitle {
            display: none;
        }
        
    }

    @media screen  and (max-width: 416px){
        .card-more-news {
            display: none;
        }
        
    }

  



</style>