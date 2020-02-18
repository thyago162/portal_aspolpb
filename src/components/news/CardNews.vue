<template>
    <div class="card-news">
        <b-card :img-src="cardnews.nm_image_path.replace('public','storage')" 
            img-left >
            <b-card-text>
                {{cardnews.nm_title}}
            </b-card-text>
        </b-card>
        
    </div>
</template>

<script>
    export default {
        props: ['cardnews'],

        computed: {
            image() {
                return ''
            }
        }
        
    }
</script>

<style scoped>
    .card-news {
        width: 600px;
    }

</style>