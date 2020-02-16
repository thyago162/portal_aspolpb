<template>
   <b-container fluid>
       <b-row>
           <b-col>
               <highlights-news />
           </b-col>
       </b-row>
       <b-row></b-row>
   </b-container>
    
</template>

<script>
    import HighlightsNews from '../components/news/HighlightsNews'
    export default {

        components: {
            HighlightsNews
        }
        
    }
</script>

<style scoped>

</style>