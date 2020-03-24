<template>
    <div>
        <Header />
        <MainNews />
        <Partner :style="{display: 'none'}"/>
        <SocialNetwork :style="{display: 'none'}"/>
        <Media  :style="{display: 'none'}"/>   
    </div>
</template>

<script>
    import Header from '../components/header/Header';
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
            Media,
            Header
            
        },

        computed: {

            news() {
                return this.$store.getters.getNews;
            }
        }
        
    }
</script>

<style scoped>

   


</style>