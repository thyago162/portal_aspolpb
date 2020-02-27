<template>
    <div class="highlights" >
        <b-carousel img-height="100%" >
            <b-carousel-slide >
                <template v-slot:img>
                    <img :src="image" 
                    alt="Aspolpb" width="700px" height="450px" />
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
                return this.highlights.nm_image_path;
            }
        },

        methods: {
            
        }
 
    }
</script>

<style  scoped>

    .highlights {
        width: 700px;
        height: 450px;
        box-shadow: 2px 2px 2px black;
    }

    .news-title {
        background-color: rgba(0, 0, 0, 0.596);
    }


</style>