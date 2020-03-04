<template>
    <div >
        <b-row class="header" v-bind:style="{ backgroundImage: 'url('+ image +')'}">
            <b-col>
                <b-button variant="warning" @click="editItem" 
                    v-b-modal.warning-form class="btn-edit" size="sm" v-if="token"> 
                    <b-icon icon="pencil"></b-icon>
                </b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <Submenu />
            </b-col>
        </b-row>
        <b-row class="banner">
            <b-col>
                <h2>{{warning.nm_title}}</h2>
                <h5>{{warning.nm_subtitle}}</h5>
            </b-col>
        </b-row>
        <WarningForm :item="edit" />
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
            this.getWarning();
        },

        computed: {
            image: function() {
                return this.warning.nm_image_path;
            },
            token: function() {
                return this.$session.get('jwt')
            }
        },

        data() {
            return {
                warning: [],
                edit: []
            }
        },

        methods: {
            getWarning() {
                this.$http('warning')
                .then(res => {
                    this.warning = res.data.result.warning[0];
                })
                .catch(err => {
                    err
                })
            },

            editItem() {
                this.edit = this.warning;
            }
        }
        
    }
</script>

<style scoped>
    .header {
        height: 550px;
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

    
    .banner h2 {
        color: red;
        font-weight: bold;
        text-align: center;
        margin-top: 40px;
    }

    .banner h5 {
        color: whitesmoke;
        text-align: center;
    }

    .btn-edit {
        float: right;
        margin: 10px;
        color: #000;
    }

    @media screen and (max-width: 1199px) {
        .header {
            height: 545px;
            background-size: cover;
            background-repeat: no-repeat;
            background-size: 100% 450px;
        }
    }

    @media screen and (max-width: 948px),(min-width: 580px){
        .banner h2 {
            font-size: 24px;
        }
    }

  
    @media screen and (max-width: 579px ),(min-width: 500px) {
        .banner {
            height: 110px;
        }
        .banner h2 {
            font-size: 18px;
            margin-top: 30px;
        }

        .banner h5 {
            font-size: 16px;
        }

        .header {
            background-position: center;
            background-size: cover;
        }


    }

    @media screen and (max-width: 549px ) {

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