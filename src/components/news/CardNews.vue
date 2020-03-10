<template>
    <div class="card-news " @click="seeNews" >    
        <b-card 
            img-right>
            <b-img src="/aspolicone.ico" width="20px" height="20px" />
            <template v-slot:header>
                <b-img :src="image" class="card-news-image"></b-img>
            </template>
            <span class="card-news-date">{{cardnews.dt_date | date}}</span>
        
            <b-card-text class="mt-2 card-news-title">
                {{cardnews.nm_title}}
            </b-card-text>
        </b-card>
        
    </div>
</template>

<script>
    export default {
        props: ['cardnews'],

        computed: {
            image() {
                return this.cardnews.nm_image_path;
            }
        },

        methods: {
            seeNews() {
                this.$router.push({ name: 'noticias', params: { id: this.cardnews.id_news }})
            }
        }
        
    }
</script>

<style scoped>
    .card-news {
        width: 655px;
        border-left: 4px solid darkslategrey;
        margin: 10px;
        margin-top: 2px;
    }

    .card-news-date {
        float: right;
        color: red;
        font-weight: bold;
    }

    .card-news-image {
        width: 143px;
        height: 116px;
    }

    @media screen and (max-width: 1400px) and (min-width: 1020px) {
        .card-news {
            width: 600px;
        }

        .card-news-image {
            width: 70px;
            height: 70px;
        }

        .card-news-title {
            font-size: 12px;
        }

        .card-news-date {
            font-size: 14px;
        }
    }

</style>