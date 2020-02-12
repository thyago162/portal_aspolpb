<template>
    <b-container>
        <b-row class="news">
            <b-col>
                <CardNews :news="news" />
            </b-col>
        </b-row>
        <b-row class="media"></b-row>
    </b-container>    
</template>

<script>
    import CardNews from '../components/news/CardNews';
    export default {

        components: {
            CardNews
        },

        computed: {
            token() {
                return this.$store.state.loading;
            },

            news() {
                return this.$store.getters.getNews;
            }
        }
        
    }
</script>