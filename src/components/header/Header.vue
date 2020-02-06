<template>
    <b-container fluid class="header">
        <b-row>
            <b-col>
                <Menu />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import Menu from '../menu/Menu';
    export default {
        components: {
            Menu,
        }
        
    }
</script>

<style scoped>
    .header {
        background-image: url('../../assets/images/image_background.jpg');
        height: 300px;
    }
</style>