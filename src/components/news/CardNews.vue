<template>
    <div class="card-news" > 
        <b-card :img-src="image" 
            img-left class="ml-1" img-height="120px" img-width="150px" >
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
                return this.cardnews.nm_image_path.replace('public','storage');
            }
        }
        
    }
</script>

<style scoped>
    .card-news {
        width: 600px;
        border-left: 4px solid darkslategrey;
        margin: 10px;
        margin-top: 2px;
    }

</style>