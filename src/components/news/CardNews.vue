<template>
    <div class="card-news ml-1" >
        <b-card no-body img-right v-for="(news,index) in cardnews " :key="index" :style="{borderLeft: '4px solid darkslategrey'}">
            <b-card-header :style="{width: '25%'}">
                <b-img-lazy v-bind="mainProps" :src="news.nm_image_path" height: auto ></b-img-lazy>
            </b-card-header>

            <b-card-body :style="{width: '75%'}">
                <b-row>
                    <b-col>
                        <span class="card-news-date">{{news.dt_date | date}}</span>
                    </b-col>
                </b-row>
               
                <b-link class="card-news-title" :to="{name: 'visualizar-noticias', params: {title: news.nm_title}}">
                    <h6 class="mt-1 " >
                        {{news.nm_title}}
                    </h6>
                </b-link>
                
                <b-card-text class="mt-2 card-news-subtitle" v-if="news.nm_subtitle != 'null'">
                    {{news.nm_subtitle}}
                </b-card-text>
                    
            </b-card-body>
        </b-card>
    </div>
</template>

<script>
    export default {
        props: ['cardnews'],

        data() {
            return {
                mainProps: {
                    center: true,
                    fluidGrow: true,
                    blank: true,
                    blankColor: '#bbb',
                    class: 'card-news-image'
                }
            }
        },

        computed: {
            image() {
                return this.cardnews.nm_image_path;
            }
        },

        methods: {
            seeNews() {
                this.$router.push({ name: 'visualizar-noticias', params: { title: this.news.nm_title }})
            }
        }
        
    }
</script>

<style scoped>
    .card-news {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 412px;
    }

    .card-news-date {
        float: right;
        color: red;
        font-weight: bold;
    }

    .card-news-image {
       object-fit: cover;
       object-position: center;
       max-height: 100px;
    }

    .card-news-icon {
        width: 20px;
        height: 20px;
    }

    .card-news-title {
        font-weight: bolder;
        font-size: 16px;
        color: black;
        text-decoration: none;
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
            font-size: 14px;
        }

        .card-news-subtitle {
            font-size: 12px;
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
        
        .card-news {
            height: 290px;
        }
    }

    @media screen  and (max-width: 375px){
        .card-news-title {
            font-size: 10px;
        }
        
    }


</style>