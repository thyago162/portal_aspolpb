<template>
   <div class="partners mb-3">
       <carousel :perPageCustom="customSlide" :autoplay="true" :autoplayTimeout="4000" 
        paginationColor="#cccccc" :autoplayHoverPause="true"> 
           <slide v-for="(partner, index) in partners" :key="index">
               <b-img fluid :src="partner.nm_image_path" 
                class="ml-5 image-partner" @click="openLink(partner.nm_link)"></b-img>
           </slide>
       </carousel>
   </div>
</template>

<script>

    export default {

        props: ['partners'],

        data() {
            return {
                customSlide: [[1400,4], [1000,3], [800,3], [400,2]]
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
        width: 200px;
        max-height: 190px;
    }

    @media screen and (max-width: 1200px){
        .image-partner {
            width: 150px;
            height: 150px;
        }
        
    }

    @media screen and (max-width: 1000px){
        .image-partner {
            width: 120px;
            height: 120px;
        }
        
    }

</style>
