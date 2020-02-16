<template>
    <div>
        <News />
    </div>
</template>

<script>
    import News from './News';

    export default {

        created() {
            this.$store.dispatch('news');
        },

        components: {
            News
            
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