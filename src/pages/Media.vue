<template>
    <b-container fluid class="mb-4">
        <b-row class="media-row">
            <b-col class="media-head ml-4">
                <div class="media-title">
                    <h5>ASPOL NA MÍDIA</h5>
                </div>
            </b-col>
        </b-row>
        <b-row class="mt-3" >
            <b-col cols="12">
                <MediaSlide :medias="medias" />
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
        width: 99%;
    }

    .media-head {
        border-bottom: 3px solid red;
        margin-top: 20px;
    }

    .media-title {
        background: rgba(138,21,0,1);
        background: -moz-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -webkit-gradient(left top, right top, color-stop(0%, rgba(138,21,0,1)), color-stop(25%, rgba(186,35,15,1)), color-stop(71%, rgba(201,27,8,1)), color-stop(100%, rgba(240,31,12,1)));
        background: -webkit-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -o-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -ms-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: linear-gradient(to right, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8a1500', endColorstr='#f01f0c', GradientType=1 );
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

    @media screen and (max-width: 1400px) {
        .media-title {
            width: 150px;
            height: 35px;
        }

        h5 {
            font-size: 16px;
            font-weight: bold;
        }
    }

    @media screen and (max-width: 1000px) {
        .media-title {
            width: 120px;
            height: 25px;
        }

        h5 {
            font-size: 14px;
        }
        
    }

    @media screen  and (max-width: 575px){
        .media-title {
            width: 80px;
            height: 20px;
        }

        h5 {
            font-size: 12px;
        }
    }
</style>