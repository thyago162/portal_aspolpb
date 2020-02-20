<template>
   <div class="partners">
       <carousel :perPage="3">
           <slide v-for="(partner, index) in partners" :key="index">
               <b-img :src="partner.nm_image_path.replace('public','storage')" 
                width="180px" height="130px" class="ml-5"></b-img>
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

</style>
