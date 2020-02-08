<template>
    <b-container>
        <h4>{{this.$store.state.loading}}</h4>
    </b-container>    
</template>

<script>
    export default {
        computed: {
            token() {
                return this.$store.state.loading
            }
        }
        
    }
</script>