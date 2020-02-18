<template>
    <div class="highlights">
        <b-carousel img-height="100%">
            <b-carousel-slide>
                <template v-slot:img>
                    <img :src="highlights.nm_image_path.replace('public','storage')" 
                    alt="Aspolpb" width="600px" height="350px">
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
                return ''
            }
        }
 
    }
</script>

<style  scoped>

    .highlights {
        border: 1px solid #000;
        width: 600px;
        height: 350px;
    }

    .news-title {
        background-color: rgba(0, 0, 0, 0.596);
    }


</style>