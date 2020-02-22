<template>
    <div class="highlights">
        <b-carousel img-height="100%">
            <b-carousel-slide >
                <template v-slot:img>
                    <img :src="image" 
                    alt="Aspolpb" width="640px" height="390px" />
                </template>
                <div class="news-title">
                    <h5>{{highlights.nm_title}}</h5>
                </div>
            </b-carousel-slide>
        </b-carousel>
    </div>
</template>

<script>
    export default {
        props: ['highlights'],

        computed: {
            image() {
                let img = this.highlights.nm_image_path;
                return img.replace('public','storage');
            }
        }
 
    }
</script>

<style  scoped>

    .highlights {
        border: 1px solid #000;
        width: 640px;
        height: 392px;
    }

    .news-title {
        background-color: rgba(0, 0, 0, 0.596);
    }


</style>