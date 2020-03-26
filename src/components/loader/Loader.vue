<template>
    <div>
        <b-spinner variant="primary" label="Spinning" class="spiner" v-show="show"></b-spinner>    
    </div>
</template>

<script>
    export default {
        props: ['show']
    }
</script>
<style scoped>


</style>