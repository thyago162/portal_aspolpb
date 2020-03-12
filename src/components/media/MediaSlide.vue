<template>
    <carousel :perPage="3" class="ml-3">
        <slide v-for="(media, index) in medias" :key="index" class="mr-2" >

            <div  class="embed-responsive embed-responsive-16by9">
                <iframe :src="media.nm_link" frameborder="0" 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    class="embed-responsive-item"   ></iframe>
            </div>

        </slide>
    </carousel>
</template>

<script>
    export default {

        props: ['medias'],

        methods: {
            redirectTo(link) {
                link.search('http') > 0 ?
                window.open(link) :
                window.open('http://'+link)
            }
        }
        
    }
</script>

<style scoped>
    .media-image {
        height: 200px;
    }
</style>