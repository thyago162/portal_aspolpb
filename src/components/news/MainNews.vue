<template>
   <b-container fluid class="news mb-3">
        <b-row class="news-row">
            <b-col class="news-head " lg="12">
                <div class="news-title">
                    <h5>NOTÍCIAS</h5>
                </div>
            </b-col>
            </b-row>
            <b-row  class="highlights">
                <b-col xl="6" > 
                    <highlights-news :highlights="highlights"/>
                </b-col>
                <b-col xl="6"  class="highlights">
                    <card-news :cardnews="card"
                        v-for="(card, index) in cardNews" :key="index"/>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="more-news">
                    <MoreNews/>
                </b-col>
            </b-row>

            <b-row>
                <b-col class="more-news-title ml-5">
                    <b-link :to="{name: 'noticias'}" :style="{color: '#000', float: 'right'}">
                        <h5>+ NOTÍCIAS</h5>
                    </b-link>
                </b-col>
            </b-row>
       
   </b-container>
    
</template>

<script>
    import HighlightsNews from './HighlightsNews';
    import CardNews from './CardNews';
    import MoreNews from './MoreNews';
    export default {

        mounted() {
            this.getHighlight();
            this.getCardNews();
        },

        components: {
            HighlightsNews,
            CardNews,
            MoreNews
        },

        data() {
            return {
                highlights: [],
                cardNews: [],
                moreNews: []
            }
        },

        methods: {
            getHighlight() {
                this.$http.get('news/highlights')
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.result.error) {
                            alert(res.data.result.error)
                        }
                        this.highlights = res.data.result.highlights;
                    }
                    
                })
                
            },

            getCardNews() {
                this.$http.get('news/cardnews')
                .then(res => {
                    if (res.status === 200) {
                        this.cardNews = res.data.result.card;    
                    }
                    
                })   
            },

           
        }
    }
</script>

<style scoped>
    .news {
        background-color: lightgray;
    }

    .news-row {
        margin-right: 5px;
        margin-left: 5px;
    }

    .news-head {
        margin-top: 20px;
        border-bottom: 3px solid rgb(189,22,34);
    }

    .news-title {
        background: rgb(189,22,34);
       
        width: 180px;
        height: 40px;
        color: white;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-left: -15px;
        margin-top: 10px;
    }

    .news-title h5 {
        margin-top: 10px;
        font-weight: bold;
    }

    .highlights {
        margin-top: 10px;
    }

    .more-news-title {
        margin-top: 20px;
        margin-bottom: 10px;
        font-weight: bolder;
        text-decoration: underline;
    }

    .more-news {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: flex-start;
        overflow: auto;
        border-color: red 1xp solid;
    }

    @media screen and (max-width: 1400px) {
        .news-title {
            width: 150px;
            height: 35px;
        }

        h5 {
            font-size: 16px;
            font-weight: bold;
        }
    }

    @media screen and (max-width: 1000px) {
        .news-title {
            width: 120px;
            height: 25px;
        }

        h5 {
            font-size: 14px;
        }
        
    }

    @media screen  and (max-width: 575px){
        .news-title {
            width: 80px;
            height: 20px;
        }

        h5 {
            font-size: 12px;
        }
    }

</style>