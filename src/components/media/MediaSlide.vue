<template>
    <div>
        <carousel :perPageCustom="customSlide" class="ml-2 mt-4">
            <slide v-for="(media, index) in medias" :key="index" class="mr-2" >

                <div v-if="media.nu_type === 1">
                    <b-link @click="redirectTo(media.nm_link)">
                        <b-img class="image" fluid :src="media.nm_image_path" ></b-img>
                    </b-link>
                    <h6 class="mt-1">
                        {{media.nm_title}}
                    </h6>
                    <h6>{{media.dt_date | date}}</h6>
                </div>

                <div v-if="media.nu_type === 2"  >
                    <b-embed type="iframe"  :src="media.nm_link"></b-embed>
                    <h6 class="mt-2">
                        {{media.nm_subtitle}}
                    </h6>
                    <h6>{{media.dt_date | date}}</h6>
                </div>
            
                <div v-if="media.nu_type === 3" >
                    <b-link v-b-modal.play-sound @click="playSound(media.nm_audio_path)"> 
                        <b-img class="image" fluid :src="media.nm_image_path" ></b-img>
                    </b-link>
                    <h6 class="mt-2">
                        {{media.nm_subtitle}}
                    </h6>
                    <h6>{{media.dt_date | date}}</h6>
                </div>
            </slide>
            
        </carousel>
        <AudioPlay :item="item"  />
    </div>
</template>

<script>
    import AudioPlay from './AudioPlay';
    export default {

        props: ['medias'],

        components: {
            AudioPlay
        },

        data() {
            return {
                item: '',
                customSlide: [[1360,4], [1000, 3], [800,2], [500,1], [300,1]]
            
            }
        },

        methods: {
            redirectTo(link) {
                link.search('http') > 0 ?
                window.open(link) :
                window.open('http://'+link)
            },

            playSound (media) {
                this.item = media.replace('public','storage');
            }
        }
        
    }
</script>

<style scoped>
    .image {
        width: 100%;
        height: 200px;
        object-fit: cover;
        object-position: center;
    }

    span {
        font-size: 16px;
        font-weight: bolder;
    }
    h5 {
        font-weight: bolder;
        font-size: 17px;
    }

    .audio-play:hover {
        color: green;
    }
    
</style>