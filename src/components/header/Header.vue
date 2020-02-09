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
        background-image: url('../../assets/images/image_background.png');
        background-repeat: no-repeat;
        background-size: 100% 300px;
        height: 400px;
        background-size: cover;
        border-bottom: 1px solid black;
    }
    @media screen and (max-width: 1234px) {
        .header {
            height: 200px;
        }
    }
</style>