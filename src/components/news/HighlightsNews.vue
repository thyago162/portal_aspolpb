<template>
    <div class="mt-2 ml-3 highlights" >
        <b-img fluid-grow :src="image"  alt="Aspolpb" class="image-highlights" />
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

    .news-title {
        background-color: rgba(0, 0, 0, 0.596);
    }

    .image-highlights {
        height: 450px;
    }

    @media screen and (max-width: 1400px) and (min-width: 1242px){

        .image-highlights {
            height: 322px;
        }
    }


    @media screen and (max-width: 1199px) and (min-width: 1000px){
        .highlights {
            width: 99%;
        }
   
    }

    @media screen and (max-width: 999px) {
        .highlights {
            width: 95%;
        }

        .image-highlights {
            height: auto;
        }
    }

</style>