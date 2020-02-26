<template>
    <div class="card-news" @click="seeNews" > 
        
        <b-card :img-src="image" 
            img-right class="ml-1" img-height="120px" img-width="150px" >
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
                return this.cardnews.nm_image_path;
            }
        },

        methods: {
            seeNews() {
                this.$router.push({name: 'noticias', params: {data: this.cardnews}})
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