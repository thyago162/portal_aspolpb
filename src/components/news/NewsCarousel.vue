<template>
    <b-carousel
        id="carousel-fade"
        style="text-shadow: 0px 0px 2px #000"
        fade
        indicators
        controls
        img-height="200"
    >
        <b-carousel-slide 
            v-for="(item, index) in news" 
            :key="index"
            :caption="item.nm_title"
            :img-src="item.nm_image_path.replace('public/','storage/')"
            ></b-carousel-slide>
    </b-carousel>
   
    
</template>

<script>
    export default {
        props: ['news']
        
    }
</script>

<style  scoped>

</style>