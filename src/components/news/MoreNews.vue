<template>

    <carousel :perPage="1">
        <slide v-for="(more, index) in morenews" :key="index">
            <b-card class="card-more-news">
                <b-card-text class="card-text">
                    {{more.nm_title}} , {{more.dt_date}}
                </b-card-text>
            </b-card>
        </slide>
    </carousel>
       
</template>

<script>
    export default {
        props: ['morenews']
        
    }
</script>

<style scoped>
    .card-more-news {
        margin-top: 10px;
        border: none;
        border-left: 2px solid darkslategrey;
        background-color: lightgray;
    }

    .card-text {
        font-size: 20px;
        font-weight: bold;
        color: blue;
    }
</style>