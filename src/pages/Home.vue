<template>
    <b-container class="news-container" fluid>
            <b-row >
                    <b-col>
                        <b-container class="news" fluid>
                            <b-row >
                                <b-col class="news-title" >
                                    <b-button class="personal-btn">
                                        NOTÍCIAS
                                    </b-button>
                                </b-col>
                            </b-row>

                            '<b-row >
                                <b-col lg="7" class="news-carousel">
                                    <h5>Destaque</h5>
                                    <div class="teste">
                                        <news-carousel :news="news"  />
                                    </div>
                                    
                                </b-col>

                                <b-col lg="5" class="another-news">
                                    <h5>Outras notícias</h5>
                                    <other-news />
                                </b-col>
                            </b-row>
'
                        </b-container>

                    </b-col>
            </b-row>
        <b-row class="media">
            
        </b-row>
    </b-container>    
</template>

<script>
    import NewsCarousel from '../components/news/NewsCarousel';
    import OtherNews from '../components/news/OtherNews';
    export default {

        created() {
            this.$store.dispatch('news');
        },

        components: {
            NewsCarousel,
            OtherNews
        },

        computed: {
            token() {
                return this.$store.state.loading;
            },

            news() {
                return this.$store.getters.getNews;
            }
        }
        
    }
</script>

<style scoped>

    .news {
        width: 100%;
        height: 550px;
    }
    .news-container {
        background-color: lightgray;
    }

    .news-title {
        border-bottom: 2px solid red;
    }

    .news-carousel {
        margin-top: 20px;
        padding: 0;
    }

    .another-news {
        margin-top: 20px;
    }

    h5 {
        text-align: center;
        font-weight: bold;
        color: darkred;
    }

    .personal-btn {
        background: rgba(138,21,0,1);
        background: -moz-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -webkit-gradient(left top, right top, color-stop(0%, rgba(138,21,0,1)), color-stop(25%, rgba(186,35,15,1)), color-stop(71%, rgba(201,27,8,1)), color-stop(100%, rgba(240,31,12,1)));
        background: -webkit-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -o-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -ms-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: linear-gradient(to right, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8a1500', endColorstr='#f01f0c', GradientType=1 );
        border-radius: 7px;
        width: 150px;
        margin-top: 30px;
        margin-left: -15px;
    }

    .plus-news {
        font-weight: bold;
        float: right;
    }

    .teste {
        border: 2px solid #333;
        box-shadow: 2px 2px 2px 1px;
    }

    .pagination {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }


</style>