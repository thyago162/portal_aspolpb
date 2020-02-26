<template>
    <div>
        <MainNews />
        <Partner />
        <SocialNetwork />
        <Media />   
    </div>
</template>

<script>
    import MainNews from '../components/news/MainNews';
    import Partner from './Partner';
    import SocialNetwork from './SocialNetwork';
    import Media from './Media';

    export default {

        created() {
            this.$store.dispatch('news');
        },

        components: {
            MainNews,
            Partner,
            SocialNetwork,
            Media
            
        },

        computed: {
            /*token() {
                return this.$store.getters.getToken;
            },*/

            news() {
                return this.$store.getters.getNews;
            }
        }
        
    }
</script>

<style scoped>

   


</style>