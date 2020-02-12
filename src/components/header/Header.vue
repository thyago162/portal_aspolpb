<template>
    <b-container fluid >
        <b-row class="header">
            <b-col>
                <Menu />
            </b-col>
        </b-row>
        <b-row>
            <b-col class="banner-message">
                <h2>CONVOCATÓRIA DE ASSEMBLÉIA GERAL EXTRAORDINÁRIA</h2>
                <h6></h6>
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

    .banner-message {
        background-color: black;
        height: 130px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    h2 {
        text-align: center;
        color: red;
        
    }
    @media screen and (max-width: 1234px) {
        .header {
            height: 200px;
        }
    }
</style>