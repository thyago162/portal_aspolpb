<template>

    <b-card class="card-more-news">
        <b-card-text>
            {{more.nm_title}}
        </b-card-text>
    </b-card>
       
</template>

<script>
    export default {
        props: ['more']
        
    }
</script>

<style scoped>
    .card-more-news {
        border: none;
        border-left: 2px solid darkslategrey;
        background-color: lightgray;
    }
</style>