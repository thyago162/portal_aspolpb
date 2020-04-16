<template >
    <b-container fluid class="mb-3">

        <b-row class="header-title">
            <b-col lg="11" class="title"  >
                
                <b-link :to="{name: 'noticias'}">
                    <h5 class="mt-2">NOTÍCIAS</h5>
                </b-link>
                
            </b-col>
        </b-row>
        
        <b-row class="mt-3 mb-2 align-body" >
            <b-col lg="11">
                <b-card :style="{border: 'none'}">
                    <b-media >
                        <h3 class="mt-0" :style="{textAlign: 'center'}">{{news.nm_title}}</h3>
                        <h6 :style="{fontWeight: 'bold', textAlign: 'center'}">{{news.nm_subtitle}}</h6>

                        <p class="date" :style="{textAlign: 'center'}">{{news.dt_date | namedDate}}</p>

                        <div class="cel-image-container mt-3 cell-image" >
                            <b-img :src="image" class="cel-image"  fluid></b-img>
                        </div>
                    
                        <div class="content">
                            <p v-html="news.nm_content" class="mt-3"></p>
                        </div>
                        
                    </b-media>
                </b-card>
           </b-col>
           <b-col v-if="token && administrator === 1">
               <b-button size="sm" v-b-modal.form-news variant="info">
                   <b-icon icon="pencil"></b-icon>
               </b-button>
           </b-col>
        </b-row>

        <b-row class="mb-4 mt-3">
            <b-col >
                <Sharing :url="news.nm_title" />
            </b-col>
        </b-row>

        <FormNews :item="news" />

    </b-container>
</template>

<script>
    import Sharing from '../components/sharing/Sharing';
    import FormNews from '../components/news/FormNews';
    export default {

        components: {
            Sharing,
            FormNews
        },

        mounted() { 
            this.getCurrentNews();
        },

        data() {
            return {
                error: [],
                news: [],
               
            }
        },

        computed: {

            title: function() {
                return this.news.nm_title
            },

            image: function() {
                return this.news.nm_image_path;
            },

            token: function() {
                return this.$store.getters.getToken;
            },

            administrator: function() {
                let user = this.$session.get('user');
                return user ? user.administrator : 0
            },
        },

        methods: {
            getCurrentNews() {

                 this.$http.post('news/get-news', {
                     'nm_title': this.$route.params.title
                 })
                .then(res => {
                    if (res.status === 200) {
                        this.news = res.data.result.news[0];
                    }
                    
                })
                .catch(err => {
                    this.error.push(err)
                })

            },
        }
        
    }
</script>

<style scoped>

    .news-image {
        width: 400px;
    }

    .align-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    h5 {
        color: #fff;
        font-weight: bolder;
    }

    .date {
        font-weight: bolder;
        color: darkred;
        margin-top: 15px;
    }

    .cel-image-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    
    @media screen and (max-width: 1200px){
        .news-image {
            width: 350px;
        }

        h3 {
            font-size: 18px;
            font-weight: bolder;
        }

        h6 {
            font-size: 14px;
            font-weight: bolder;
        }
        p {
            font-size: 14px;
        }

        .news-title {
            width: 170px;
            height: 38px;
        }

        h5 {
            font-size: 18px;
        }
        
    }

    @media screen and (max-width: 1000px) {
        .news-image {
            width: 300px;
        }
         h3 {
            font-size: 16px;
            font-weight: bolder;
        }

        h6 {
            font-size: 13px;
            font-weight: bolder;
        }
        p {
            font-size: 12px;
        }

         .news-title {
            width: 150px;
            height: 34px;
        }

        h5 {
            font-size: 16px;
        }
        
    }
    @media screen and (max-width: 800px){
        .news-image {
            width: 250px;
        }
         h3 {
            font-size: 14px;
            font-weight: bolder;
        }

        h6 {
            font-size: 12px;
            font-weight: bolder;
        }
        p {
            font-size: 10px;
        }

        .news-title {
            width: 130px;
            height: 30px;
        }

        h5 {
            font-size: 15px;
        }
        
    }
    @media screen and (max-width: 700px){
        .news-image {
            width: 200px;
        }

         h3 {
            font-size: 12px;
            font-weight: bolder;
        }

        h6 {
            font-size: 11px;
            font-weight: bolder;
        }
        p {
            font-size: 9px;
        }

         .news-title {
            width: 120px;
            height: 28px;
        }

        h5 {
            font-size: 14px;
        }
        
    }

     @media screen and (max-width: 550px){
        .news-image {
            display: none;
        }

         h3 {
            font-size: 12px;
            font-weight: bolder;
        }

        h6 {
            font-size: 11px;
            font-weight: bolder;
        }
        p {
            font-size: 9px;
        }
        .news-title {
            width: 100px;
            height: 25px;
        }

        h5 {
            font-size: 12px;
        }

        .cel-image-container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }

        .cel-image {
            display: inline-block;
            max-width: 250px;
        }
        
    }

</style>