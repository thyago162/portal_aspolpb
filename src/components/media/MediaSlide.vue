<template>
    <div>
        <carousel :perPage="perPage" class="ml-2 mt-4">
            <slide v-for="(media, index) in medias" :key="index" class="mr-2" >

                <div v-if="media.nu_type === 1">
                    <b-img class="image" fluid :src="media.nm_image_path.replace('public','storage')" ></b-img>
                    <h5>
                        {{media.nm_title}}
                    </h5>
                    <span>
                        <font-awesome-icon :icon="['fa', 'globe']" class="audio-play"  />
                        Clique no ícone para visualizar...
                    </span>
                </div>

                <div v-if="media.nu_type === 2">
                    <b-embed type="iframe" aspect="16by9" :src="media.nm_link"></b-embed>
                    <h5 class="mt-2">
                        {{media.nm_subtitle}}
                    </h5>
                </div>
            
                <div v-if="media.nu_type === 3" >
                    <b-img class="image" fluid :src="media.nm_image_path.replace('public','storage')" ></b-img>
                    <h5 class="mt-2">
                        {{media.nm_subtitle}}
                    </h5>
                    <span>
                        <font-awesome-icon :icon="['fa', 'headphones']" class="audio-play" 
                        v-b-modal.play-sound @click="playSound(media.nm_audio_path)"  />
                        Clique no ícone para começar a escutar...
                    </span>
                </div>
            </slide>
            
        </carousel>
        <AudioPlay :item="item"  />
    </div>
</template>

<script>
    import AudioPlay from './AudioPlay';
    export default {

        props: ['medias','perPage'],

        components: {
            AudioPlay
        },

        data() {
            return {
                item: '',
            
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