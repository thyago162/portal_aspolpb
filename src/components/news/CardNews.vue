<template>
    <div class="card-news ml-1" @click="seeNews" > 
        
        <b-card :img-src="image" 
            img-right class="ml-1" img-height="142px" img-width="150px" >
            <b-img src="/aspolicone.ico" width="20px" height="20px" />
            <span class="card-news-date">{{cardnews.dt_date | date}}</span>
        
            <b-card-text class="mt-2">
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
                this.$router.push({ name: 'noticias', params: { id: this.cardnews.id_news }})
            }
        }
        
    }
</script>

<style scoped>
    .card-news {
        width: 655px;
        border-left: 4px solid darkslategrey;
        margin: 10px;
        margin-top: 2px;
    }

    .card-news-date {
        float: right;
        color: red;
        font-weight: bold;
    }

</style>