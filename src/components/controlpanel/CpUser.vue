<template>
    <b-container fluid >
        <b-row>
            <h3>Usuários</h3>
        </b-row>

        <b-row>
            <b-col>
                <b-table :items="users"></b-table>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {

        created() {
            this.$store.dispatch('users',)
        },

        computed: {
            token: function() {
                return this.$store.getters.getToken;
            },

            users: function() {
                return this.$store.getters.users;
            }
        }

        
    }
</script>

<style scoped>

</style>