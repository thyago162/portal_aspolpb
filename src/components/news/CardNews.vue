<template>
    <div class="card-news ml-1" @click="seeNews" >    
        <b-card 
            img-right>
            <template v-slot:header>
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
        color: red;
    }

    .card-news-subtitle {
        font-weight: bolder;

    }

    @media screen and (max-width: 1400px) and (min-width: 1242px) {
        
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

    @media screen and (max-width: 1199px) and (min-width: 1000px){
        .card-news {
            width: 99%;
        }
    }

    @media screen and (max-width: 999px){

        .card-news {
            width: 95%;
        }
        
    }

    @media screen and (max-width: 575px) {
        .card-news {
            width: 100%;
        }
        .card-news-title {
            font-size: 10px;
        }

        .card-news-subtitle {
            display: none;
        }

        .card-news-date {
            font-size: 10px;
        }

        .card-news-image {
            width: 100px;
            height: 75px;
        }

        .card-news-icon {
            width: 15px;
            height: 15px;
        }

        .card-news-image {
            width: 80px;
            height: 50px;
        }
    }


</style>