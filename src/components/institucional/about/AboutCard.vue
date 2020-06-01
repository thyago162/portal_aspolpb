<template>    
    <b-card class="mt-4" img-left :style="{width: '500px'}">
        <template v-slot:header v-if="image != ''">
            <b-img-lazy :src="image" class="card-image" fluid />
        </template>
        <b-card-title class="card-title" v-if="name">
            {{name}}
        </b-card-title>
        <b-card-text class="card-text" v-if="office">
            <span :style="{fontWeight: 'bolder'}">Cargo: </span>{{office}}
        </b-card-text>
        <b-card-text v-if="ddd">
            <span :style="{fontWeight: 'bolder'}">Telefone: </span>
            ({{ddd}}) {{phone}}

        </b-card-text>
    </b-card>
</template>

<script>
    export default {
        props: ['board'],

        computed: {
            image: function() {
                return this.board.nm_image_path != 'undefined' ?
                    this.board.nm_image_path : 
                    ''
            },

            name: function() {
                return this.board ?
                    this.board.nm_name :
                    ' '
            },

            office: function() {
                return this.board ?
                    this.board.nm_office :
                    ' '
            },

            ddd: function() {
                return this.board ?
                    this.board.nm_ddd :
                    ' '
            },

            phone: function() {
                return this.board ?
                    this.board.nm_phone :
                    ' '

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
        object-fit: cover;
        object-position: center;
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