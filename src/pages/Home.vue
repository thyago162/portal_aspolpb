<template>
    <div>
        <News />
        <Partner />
        
    </div>
</template>

<script>
    import News from './News';
    import Partner from './Partner';

    export default {

        created() {
            this.$store.dispatch('news');
        },

        components: {
            News,
            Partner
            
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