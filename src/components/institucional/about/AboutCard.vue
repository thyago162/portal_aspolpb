<template>    
    <b-card class="mt-4" img-left :style="{width: '500px'}">
        <template v-slot:header v-if="image.length > 0">
            <img :src="image" class="card-image" >
        </template>
        <b-card-title class="card-title" v-if="name.length > 0">
            {{name}}
        </b-card-title>
        <b-card-text class="card-text" v-if="office.length > 0">
            <span :style="{fontWeight: 'bolder'}">Cargo: </span>{{office}}
        </b-card-text>
        <b-card-text v-if="ddd.length > 0">
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
                return this.board ?
                    this.board.nm_image_path : 
                    ''
            },

            name: function() {
                return this.board ?
                    this.board.nm_name :
                    ''
            },

            office: function() {
                return this.board ?
                    this.board.nm_office :
                    ''
            },

            ddd: function() {
                return this.board ?
                    this.board.nm_ddd :
                    ''
            },

            phone: function() {
                return this.board ?
                    this.board.nm_phone :
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