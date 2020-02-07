<template>
    <b-container>
        <h4 v-if="token">{{token}}</h4>
        <h4 v-else>Não possui token</h4>
    </b-container>    
</template>

<script>
    export default {
        computed: {
            token() {
                return this.$store.getters.getToken
            }
        }
        
    }
</script>