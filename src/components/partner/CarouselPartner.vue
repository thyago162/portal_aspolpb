<template>
   <div class="partners">
       <carousel :perPage="3">
           <slide v-for="(partner, index) in partners" :key="index">
               <b-img :src="partner.nm_image_path.replace('public','storage')" 
                class="ml-5 image-partner"></b-img>
           </slide>
       </carousel>
   </div>
</template>

<script>

    export default {

        props: ['partners'],

        components: {
        },

        data() {
            return {
             
            }
        },


        computed: {
            
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
        width: 180px;
        height: 130px;
    }

    @media screen and (max-width: 1200px){
        .image-partner {
            width: 150px;
            height: 100px;
        }
        
    }

    @media screen and (max-width: 1000px){
        .image-partner {
            width: 120px;
            height: 80px;
        }
        
    }

    @media screen and (max-width: 724px){
        .image-partner {
            width: 100px;
            height: 50px;
        }

    }

    

</style>
