<template>
    <b-col class="mt-4 ml-1 mr-1 image-highlights" 
        v-bind:style="{ backgroundImage: 'url('+ image +')'}" >
        
        <div class="highlights-title">
            <h5>{{highlights.nm_title}}</h5>
            <h6>{{highlights.nm_subtitle}}</h6>
        </div>
        
    </b-col>
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
        background-color: rgba(24, 23, 23, 0.719);
        position: absolute;
        width: 100%;
        bottom: 0%;
    }

    .highlights-title h5{
        color: #ffffff;
        text-align: center;
        margin-top: 10px;
    }

    .image-highlights {
        height: 450px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50% 50%;
        background-position: center;
        display: flex;
        flex-direction: row;
        justify-content:center;
        align-items: baseline;
    }

    @media screen and (max-width: 1400px) and (min-width: 1242px){

        .image-highlights {
            height: 325px;
        }

        h5 {
            font-size: 15px;
        }
    }


    @media screen and (max-width: 1199px) and (min-width: 1000px){
        .image-highlights {
            height: 460px;
        }

        h5 {
            font-size: 12px;
        }
   
    }

    @media screen and (max-width: 999px) {
        .highlights {
            width: 95%;
        }

        .image-highlights {
            height: 320px;
        }

         h5 {
            font-size: 12px;
        }
    }

</style>