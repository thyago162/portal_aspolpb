<template>
    <b-container fluid >
        <b-row class="header">
            <b-col >
                <Menu />
            </b-col>
        </b-row>
        <b-row>
            <b-col class="banner-message" >
                <h3>Convocatória assembléia geral extraordinária</h3>
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
        height: 550px;
        background-image: url('../../assets/images/image_background.png');
        background-repeat: no-repeat;
        border-bottom: 1px solid black;
        background-size: cover;
        background-position: 50% 50%;
        background-position: center;
    }

    .banner-message {
        background-color: black;
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    h3 {
        text-align: center;
        color: red;
        
    }
    @media screen and (max-width: 1199px) {
        .header {
            height: 350px;
            background-size: cover;
            background-repeat: no-repeat;
            background-size: 100% 450px;
        }

        .banner-message {
            height: 50px;
        }

        h3 {
            font-size: 18px;
        }
    }
    @media screen and (max-width: 550px ),(min-width: 500px) {
        h3 {
            font-size: 15px;
            margin-top: 10px;
        }

        .banner-message {
            height: 35px;
        }

        .header {
            background-position: center;
            background-size: cover;
        }


    }

    @media screen and (max-width: 500px ) {

        .header {
            background-position: center;
            background-size: cover;
        }

        .banner-message {
            height: 30px;
        }

        h3 {
            font-size: 12px;
        }

    }

    @media screen and (max-width: 440px) {

        h3 {
            font-size: 10px;
            margin-top: 15px;
        }

        .banner-message {
            height: 30px;
        }

        .header {
            background-position: center;
            background-size: cover;
        }

    }
</style>