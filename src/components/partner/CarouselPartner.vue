<template>
   <div class="partners mb-3">
       <carousel :perPageCustom="customSlide" :autoplay="true" :autoplayTimeout="4000" 
        paginationColor="#cccccc" :autoplayHoverPause="true"> 
           <slide v-for="(agreement, index) in agreements" :key="index">
               <b-img fluid :src="agreement.nm_image_path" 
                class="ml-5 image-partner" @click="openLink(agreement.nm_link)"></b-img>
           </slide>
       </carousel>
   </div>
</template>

<script>

    export default {

        props: ['agreements'],

        data() {
            return {
                customSlide: [[1400,4], [1000,3], [800,3], [400,2], [300,2]]
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

    .partners-carousel {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .image-partner {
        max-width: 150px;
        max-height: 150px;
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
            width: 80px;
            max-height: 80px;
        }
        
    }

</style>
