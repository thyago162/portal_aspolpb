<template>
   <b-container fluid class="news mb-3">
        <b-row class="news-row">
            <b-col class="news-head ml-4" lg="12">
                <div class="news-title">
                    <h5>NOTÍCIAS</h5>
                </div>
            </b-col>
            </b-row>
            <b-row  class="highlights">
                <b-col xl="6" > 
                    <b-link :to="{ name: 'noticias', params: { id: highlights.id_news, title: highlights.nm_title}}"> 
                        <highlights-news :highlights="highlights"/>
                    </b-link>
                </b-col>
                <b-col xl="6"  class="highlights">
                    <card-news :cardnews="card" 
                        v-for="(card, index) in cardNews" :key="index"/>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="more-news-title ml-4">
                    <b-link :to="{path: 'noticias/1'}" :style="{color: '#000'}">
                        <h5> <b-icon icon="plus"></b-icon>NOTÍCIAS</h5>
                    </b-link>
                </b-col>
            </b-row>

            <b-row>
                <b-col  class="more-news">
                    <MoreNews/>
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
                    this.highlights = res.data.result.highlights;
                })
                
            },

            getCardNews() {
                this.$http.get('news/cardnews')
                .then(res => {
                    this.cardNews = res.data.result.card;
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
        width: 99%;
    }

    .news-head {
        margin-top: 20px;
        border-bottom: 3px solid red;
    }

    .news-title {
        background: rgba(138,21,0,1);
        background: -moz-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -webkit-gradient(left top, right top, color-stop(0%, rgba(138,21,0,1)), color-stop(25%, rgba(186,35,15,1)), color-stop(71%, rgba(201,27,8,1)), color-stop(100%, rgba(240,31,12,1)));
        background: -webkit-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -o-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -ms-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: linear-gradient(to right, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8a1500', endColorstr='#f01f0c', GradientType=1 );
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
        margin-top: 20px;
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