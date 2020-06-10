<template>
    <b-container fluid>

        <b-row class="search ml-2">
            <b-col lg="12" class="search-head" >
                <div class="search-title">
                    <div :to="{name: 'noticias'}">
                        <h5 class="mt-2">RESULTADO DA BUSCA</h5>
                    </div>
                </div>
            </b-col>
        </b-row>

        <div v-show="loading" class="mt-5">
            <span>Carregando...</span>
            <b-spinner label="Spinning" ></b-spinner>
        </div>
        <p v-if="size  == 0 && loading == false" class="mt-3">Não foi encontrado nenhum resultado.</p>    
        <b-row class="mt-2">
            <b-col>
               <div v-for="(result, index) in results" :key="index" class="mt-3 mb-4" >
                   <b-card v-for="(value, index) in result" :key="index" :id="'search'+index">
                       <b-card-header>
                           <b-card-title>
                               {{value.nm_title}}
                           </b-card-title>
                           <b-card-text v-if="value.nm_subtitle">
                               {{value.nm_subtitle}}
                           </b-card-text>
                       </b-card-header>
                       <b-card-body >
                           <b-media v-if="value.nm_content" class="content">
                               <p v-html="value.nm_content"></p>
                           </b-media>
                       </b-card-body>
                       
                   </b-card>
               </div>
            </b-col>
   
        </b-row>
        
    </b-container>
</template>

<script>
    export default {

        created() {
            this.search();
        },

        computed: {
            text: function() {
                return this.$route.params.search
            },
            
            size: function() {
                return this.results.length;
            }
        },

        data() {
            return {
                results: [],
                details: false,
                loading: false

            }
        },

        methods: {
            search() {
                this.loading = true;
                let form = new FormData();
                form.append('search', this.text);

                this.$http.post('search', form)
                .then(res => {
                    this.loading = false;
                    if (res.status === 200) {
                        this.results = res.data.result
                    }
                })
            },

        }
        
    }
</script>

<style scoped>
    .content >>> p {
        text-align: justify;
    }

    .content >>> img {
        width: 100%;
        max-height: 500px;
        object-fit: contain;
    }
    .search {
        width: 99%;
    }

    .search-head {
        margin-top: 20px;
        border-bottom: 3px solid red;
    }

    .search-title {
        background: rgba(138,21,0,1);
        background: -moz-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -webkit-gradient(left top, right top, color-stop(0%, rgba(138,21,0,1)), color-stop(25%, rgba(186,35,15,1)), color-stop(71%, rgba(201,27,8,1)), color-stop(100%, rgba(240,31,12,1)));
        background: -webkit-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -o-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -ms-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: linear-gradient(to right, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8a1500', endColorstr='#f01f0c', GradientType=1 );
        width: 280px;
        height: 40px;
        color: white;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-left: -15px;
        margin-top: 10px;
    }

    @media screen and (max-width: 1200px){
        .search-title {
            width: 250px;
        }

        h5 {
            font-size: 16px;
        }
        
    }

    @media screen and (max-width: 900px){
        .search-title {
            width: 200px;
            height: 35px;
        }

        h5 {
            font-size: 15px;
        }
        
    }

    @media screen and (max-width: 700px){
        .search-title {
            width: 175px;
            height: 30px;
        }

        h5 {
            font-size: 14px;
        }
        
    }

    @media screen and (max-width: 600px){
        .search-title {
            width: 150px;
            height: 27px;
        }

        h5 {
            font-size: 12px;
        }
        
    }

    @media screen and (max-width: 500px){
        .search-title {
            width: 130px;
            height: 25px;
        }

        h5 {
            font-size: 10px;
        }
        
    }
</style>