<template>
    <b-container class="mb-4 mt-2" fluid>
       <b-row class="media-row">
            <b-col class="media-head ml-4">
                <div class="media-title">
                    <h5>ASPOL NA MÍDIA</h5>
                </div>
            </b-col>
        </b-row>
        <b-row class="background mt-4">
            <b-col>
                <h4 class="title mt-2 ml-2">Aspol no jornal</h4>
                <MediaSlide :medias="newspapers" :perPage="4"/>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <h4 class="title mt-2 ml-2">Aspol na rádio</h4>
                <MediaSlide :medias="audios"  :perPage="4"/>
            </b-col>

        </b-row>
        <b-row class="background mt-3">
            <b-col>
                <h4 class="title mt-2 ml-2">Aspol na TV</h4>
                <MediaSlide :medias="videos"  :perPage="4"/>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import MediaSlide from '../components/media/MediaSlide';
    export default {

        components: {
            MediaSlide
        },


        mounted() {
           this.$store.dispatch('media');
        },

        data() {
            return {
            }
        },

        computed: {
            media: function() {
                return this.$store.getters.getMedia;
            },

            newspapers: function() {
                let newspaper = this.media.filter((param) => {
                    return param.nu_type === 1
                })

                return newspaper
            },

            audios: function() {
                let audio = this.media.filter((param) => {
                    return param.nu_type === 3
                })

                return audio
            },

            videos: function() {
                let video = this.media.filter((param) => {
                    return param.nu_type === 2
                })

                return video;
            }
        },

        methods: {
           
        }

    }
</script>

<style scoped>

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
    
    .background {
       background-color: lightgray; 
    }

    .title {
        text-decoration: underline;
        font-weight: bolder;
    }
</style>