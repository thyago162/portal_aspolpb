<template>    
    <b-card class="mt-4" img-left :style="{width: '500px'}">
        <template v-slot:header v-if="board.nm_image_path">
            <img :src="image" width="150px" height="150px" >
        </template>
        <b-card-title>
            {{board.nm_name}}
        </b-card-title>
        <b-card-text>
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
</style>