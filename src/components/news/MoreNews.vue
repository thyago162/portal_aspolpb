<template>
      <div class="more-news">
        <b-card class="card-more-news" v-for="(n, index) in news" :key="index">
            <b-card-text>
                <span>{{n.nm_title}} </span>
                <span>- {{n.dt_date}} </span>
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