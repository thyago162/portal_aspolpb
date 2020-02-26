<template>
    <b-container fluid class="news">
        <b-row>
            <b-col lg="12" class="ml-5 news-head" >
                <div class="news-title">
                    <h5>NOTÍCIAS</h5>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col lg="5" class="panel-news ml-3">
                <b-table :fields="fields" :items="news" borderless
                    :per-page="perPage" :current-page="currentPage" id="news"
                >
                    <template v-slot:cell(nm_title)="row">
                        <b-list-group>
                            <b-list-group-item button class="teste">
                                {{row.item.nm_title}},
                                 {{row.item.dt_date}}
                            </b-list-group-item>
                        </b-list-group>
                    </template>
                </b-table>
                <div >
                    <b-pagination
                        align="center"
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        aria-controls="news"
                    ></b-pagination>
                     </div>
            </b-col>
            <b-col>
                <b-card></b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {

        mounted() {
            this.$store.dispatch('news');
        },

        data() {
            return {
                error: [],
                fields: [
                    {key: 'nm_title', label: ''}
                ],
                currentPage: 1,
                perPage: 5,

            }
        },

        computed: {
            news: function() {
                return this.$store.getters.getNews;
            },

            rows: function() {
                return this.news.lenght;
            }
        },

        methods: {
       
        }
        
    }
</script>

<style scoped>
    .news {
        height: 700px;
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
        border-radius: 6px;
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

    .panel-news {
    }

    .teste {
        background-color: red;
        color: white;
        font-weight: bolder;
    }

    h5 {
        margin-top: 10px;
    }
</style>