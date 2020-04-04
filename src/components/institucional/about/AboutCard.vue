<template>    
    <b-card class="mt-4" img-left :style="{width: '500px'}">
        <template v-slot:header v-if="board.nm_image_path">
            <img :src="image" class="card-image" >
        </template>
        <b-card-title class="card-title">
            {{board.nm_name}}
        </b-card-title>
        <b-card-text class="card-text">
            <span :style="{fontWeight: 'bolder'}">Cargo: </span>{{board.nm_office}}
        </b-card-text>
        <b-card-text>
            <span :style="{fontWeight: 'bolder'}">Telefone: </span>
            ({{board.nm_ddd}}) {{board.nm_phone}}

        </b-card-text>
    </b-card>
</template>

<script>
    export default {
        props: ['board'],

        computed: {
            image: function() {
                return this.board.nm_image_path ?
                    this.board.nm_image_path : 
                    ''
            }
        }
        
    }
</script>

<style scoped>

    .about {
        width: 500px;
    }

    .card-title {
        font-weight: bolder;
    }

    .card-image {
        width: 150px;
        height: 150px;
    }

    @media screen and (max-width: 1100px) {
        .card-title {
            font-size: 18px;
        }

        .card-text {
            font-size: 14px;
        }

        .card-image {
            width: 120px;
            height: 120px;
        }
    }

    @media screen and (max-width: 500px) {
        .card-title {
            font-size: 14px;
        }

        .card-text {
            font-size: 12px;
        }

        .card-image {
            width: 100px;
            height: 100px;
        }
    }

</style>