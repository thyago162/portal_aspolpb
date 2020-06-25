<template>
   <div class="partners mb-3">
       <carousel :perPageCustom="customSlide" :autoplay="true" :autoplayTimeout="4000" 
        paginationColor="#cccccc" :autoplayHoverPause="true"> 
           <slide v-for="(agreement, index) in agreements" :key="index">
               <b-img-lazy fluid :src="agreement.nm_image_path" 
                class="image-partner" @click="openLink(agreement.nm_link)"></b-img-lazy>
           </slide>
       </carousel>
   </div>
</template>

<script>

    export default {

        props: ['agreements'],

        data() {
            return {
                customSlide: [[1400,5], [1000,3], [800,3], [400,2]]
            }
        },

        methods: {
            openLink(link) {
                window.open(link)
            }
        }
        
    }
</script>

<style scoped>

    .partners {
        margin-top: 20px;
    }

    .image-partner {
        width: 100%;
        max-height: 180px;
        object-fit:contain;
        object-position: center;
    }

    @media screen and (max-width: 1200px){
        .image-partner {
            width: 150px;
            max-height: 150px;
        }
        
    }

    @media screen and (max-width: 1000px){
        .image-partner {
            width: 120px;
            max-height: 120px;
        }
        
    }

    @media screen and (max-width: 500px){

        .image-partner {
            width: 100%;
            max-height: 120px;
        }
        
    }

</style>
