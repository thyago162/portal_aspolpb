<template>
    <div >
        <b-row class="header" v-bind:style="{ backgroundImage: 'url('+ image +')'}">
            <b-col>
                <b-button variant="warning" @click="editItem" 
                    v-b-modal.warning-form class="btn-edit" size="sm" v-if="administrator === 1"> 
                    <b-icon icon="pencil"></b-icon>
                </b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <Submenu />
            </b-col>
        </b-row>
       <!-- <b-row class="banner">
            <b-col>
                <h2>{{warning.nm_title}}</h2>
                <h5>{{warning.nm_subtitle}}</h5>
            </b-col>
        </b-row> -->
        <WarningForm :item="item" />
    </div>
    
</template>

<script>
    import Submenu from '../submenu/Submenu';
    import WarningForm from '../warning/WarningForm';

    export default {

        components: {
            Submenu,
            WarningForm
        },

        mounted() {
            this.$store.dispatch('warning');
        },

        computed: {
            image: function() {
                return this.warning ? 
                this.warning.nm_image_path :
                ''  
            },

            token: function() {
                return this.$session.get('jwt')
            },

            warning: function() {
                return this.$store.getters.getWarning;
            },
            
            administrator: function() {
                let user = this.$session.get('user');
                return user ? user.administrator : 0
            }

        },

        data() {
            return {
                item: []
            }
        },

        methods: {
            editItem() {
                this.item = this.warning;
            }
        }
        
    }
</script>

<style scoped>
    .header {
        height: 400px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50% 50%;
        background-position: center;
    }

    .banner {
        background-color: #111010;
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .btn-edit {
        float: right;
        margin: 10px;
        color: #000;
    }

    @media screen  and (max-width: 768px){
        .header {
            height: 280px;
        }
    }

    @media screen and (max-width: 416px) {

        .header {
            height: 220px;
        }

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

    @media screen and (max-width: 375px) {
        .header {
            height: 170px;
        }
        
    }

    
</style>