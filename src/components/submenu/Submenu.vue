<template>
    <div>
        <fab :actions="fabActions"
            @news="news"
        ></fab>
        <add-news  />
    </div>
</template>

<script>
    import fab from 'vue-fab';
    import AddNews from '../news/AddNews';
    export default {
        components: {
            fab,
            AddNews
        },

        data() {
            return {
                fabActions: [
                    {
                        name: 'news',
                        icon: 'assignment',
                        tooltip: 'Notícias'
                    }
                ]
            }
        },

        methods: {
            news() {
                this.$bvModal.show('news')
            }
        }
        
    }
</script>

<style scoped>

    
</style>