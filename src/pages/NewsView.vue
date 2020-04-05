<template >
    <b-container fluid>

        <b-row>
            <b-col lg="12" class="title"  >
                
                <b-link :to="{name: 'noticias'}">
                    <h5 class="mt-2">NOTÍCIAS</h5>
                </b-link>
                
            </b-col>
        </b-row>
        
        <b-row class="mt-2 mb-2" >
           <b-card>
               <b-media>
                   <template v-slot:aside v-if="image" >
                       <b-img :src="image" class="news-image"></b-img>
                   </template>
                   <h3 class="mt-0">{{news.nm_title}}</h3>
                   <h6 >{{news.nm_subtitle}}</h6>

                   <div class="cel-image-container mt-3" v-if="image" fluid>
                       <b-img :src="image" class="cel-image"></b-img>
                   </div>
                   
                   <p v-html="news.nm_content" class="mt-4"></p>
               </b-media>
           </b-card>
        </b-row>

    </b-container>
</template>

<script>
    export default {

        components: {
        },

        mounted() { 
            this.getCurrentNews();
        },

        data() {
            return {
                error: [],
                news: []
            }
        },

        computed: {

            title: function() {
                return this.news.nm_title
            },

            image: function() {
                return this.news.nm_image_path;
            }
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

    .cel-image {
        display: none;
    }

    h5 {
        color: #fff;
        font-weight: bolder;
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