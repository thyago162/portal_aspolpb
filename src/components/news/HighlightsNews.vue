<template>
    <div class="mt-4 ml-3 highlights" >
        <b-img fluid-grow :src="image"  alt="Aspolpb" class="image-highlights" />
        <div class="highlights-title">
            <h5>{{highlights.nm_title}}</h5>
        </div>
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

    .highlights-title {
        height: 90px;
        background-color: rgba(24, 23, 23, 0.719);
        position: absolute;
        margin-top: -90px;
        width: 94%;
        
    }

    .highlights-title h5{
        color: #ffffff;
        text-align: center;
        margin-top: 10px;
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