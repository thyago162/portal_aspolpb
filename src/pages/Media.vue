<template>
    <b-container fluid class="mb-4">
        <b-row class="ml-1 mr-1" >
            <b-col class="media-head ">
                <div class="media-title">
                    <h5>ASPOL NA MÍDIA</h5>
                </div>
            </b-col>
        </b-row>
        <b-row class="mt-3" >
            <b-col >
                <MediaSlide :medias="medias" />
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-link :to="{path: 'aspol-na-midia'}" class="personal-link mt-2">+ ASPOL NA MÍDIA</b-link>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import MediaSlide from '../components/media/MediaSlide';
    export default {

        components: {MediaSlide},

        mounted() {
            this.getMainMedia();
        },

        data() {
            return {
                medias: []
            }

        },

        methods: {
            getMainMedia() {
                this.$http('media/main-medias')
                .then(res => {
                    this.medias = res.data.result.medias;
                })
                .catch(err => {
                    err
                })
            }
        }
        
    }
</script>

<style scoped>
    .media {
        background-color: whitesmoke;
    }

    .media-row {
 
    }

    .media-head {
        border-bottom: 3px solid rgb(189,22,34);
        margin-top: 20px;
    }

    .media-title {
        background: rgb(189,22,34);
        width: 200px;
        height: 40px;
        color: white;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-left: -15px;
        margin-top: 10px;
    }

    h5 {
        margin-top: 10px;
    }

    a {
        float: right;
        color: #000000;
        font-weight: bolder;
        font-size: 18px;
    }

    @media screen and (max-width: 1400px) {
        .media-title {
            width: 150px;
            height: 35px;
        }

        h5 {
            font-size: 16px;
            font-weight: bold;
        }

         .personal-link {
            font-size: 18px;
        }
    }

    @media screen and (max-width: 999px) {
        .media-title {
            width: 120px;
            height: 25px;
        }

        h5 {
            font-size: 14px;
        }

         .personal-link {
            font-size: 16px;
        }
        
    }

    @media screen  and (max-width: 575px){
        .media-title {
            width: 100px;
            height: 20px;
        }

        h5 {
            font-size: 10px;
        }

        .personal-link {
            font-size: 14px;
        }
    }
</style>