<template>
    <div>
        <fab :actions="fabActions"
            @news="news"
            @users="users"
        ></fab>
        <add-news  />
    </div>
</template>

<script>
    import fab from 'vue-fab';
    import AddNews from '../news/AddNews';
    import router from 'vue-router'
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
                    },
                    {
                        name: 'users',
                        icon: 'perm_identity',
                        tooltip: 'Usuários'
                    }
                ]
            }
        },

        methods: {
            news() {
                this.$bvModal.show('news')
            },
            users() {
                router.push({name: 'user'})
            }
        }
        
    }
</script>

<style scoped>

    
</style>