<template>
    <div class="card-news ml-1" @click="seeNews" >    
        <b-card 
            img-right>
            <template v-slot:header class="card-header">
                <b-img :src="image" class="card-news-image" fluid></b-img>
            </template>
            
            <b-img src="/aspolicone.ico"  class="card-news-icon" />
            <span class="card-news-date">{{cardnews.dt_date | date}}</span>
            
            <h6 class="mt-1 card-news-title" >
                {{cardnews.nm_title}}
            </h6>
            <b-card-text class="mt-2 card-news-subtitle">
                {{cardnews.nm_subtitle}}
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
                this.$router.push({ name: 'visualizar-noticias', params: { title: this.cardnews.nm_title }})
            }
        }
        
    }
</script>

<style scoped>
    .card-news {
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

    .card-news-icon {
        width: 20px;
        height: 20px;
    }

    .card-news-title {
        font-weight: bolder;
        font-size: 16px;
    }

    .card-news-subtitle {
        font-weight: bolder;
        color: red;

    }

    @media screen  and (max-width: 1024){
        .card-news-title {
            font-size: 18px;
        }

        .card-news-subtitle {
            font-size: 16px;
        }
        
    }

    @media screen and (max-width: 768px) {
        .card-news-title {
            font-size: 16px;
        }

        .card-news-subtitle {
            font-size: 14px;
        }
        
        .card-news-image {
            max-width: 100px;
            max-height: 80px;
        }
    }

    @media screen and (max-width: 416px) {
        .card-header {
            display: none;
        }

        .card-news-title {
            font-size: 12px;
        }

        .card-news-date {
            font-size: 12px;
        }

        .card-news-subtitle {
            font-size: 10px;
        }
        
    }

    @media screen  and (max-width: 375px){
        .card-news-title {
            font-size: 10px;
        }
        
    }


</style>