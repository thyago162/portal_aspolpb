<template>
   
    <b-nav class="submenu">
        <b-row style="width:100%;">
            <b-col lg="4" sm="6">
                <nav class="icons">
                    <a >
                        <div class="teste">
                            <font-awesome-icon :icon="['fab', 'twitter-square']" 
                            size="2x" class="icon alt personal-icons" />
                        </div>
                    </a>
                    <a >
                        <font-awesome-icon :icon="['fab', 'instagram-square']" 
                        size="2x" class="icon alt personal-icons" />
                    </a>
                    <a >
                        <font-awesome-icon size="2x" :icon="['fab', 'facebook-square']" 
                        class="icon alt personal-icons" />
                    </a>
                    <a >
                        <font-awesome-icon size="2x" :icon="['fab', 'whatsapp-square']" 
                        class="icont alt personal-icons" />
                    </a>
                </nav>

            </b-col>

             <b-col  lg="4" sm="6">
                <b-form inline class="search">
                    <b-input-group :style="{marginTop: '4px'}" >
                        <b-form-input trim placeholder="Buscar no site" 
                            type="text" v-model="search" />
                        <b-input-group-append>
                            <b-button variant="default" @click="searchAll">
                                <b-icon icon="search" ></b-icon>
                            </b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form>

            </b-col>
            
        </b-row>
    </b-nav>
        
        
</template>

<script>   
    export default {

        data() {
            return {
                search: ''
            }
        },

        methods: {
            searchAll() {
                this.$router.push({name: 'buscar', params: {search: this.search}})
            }
        }

    }
</script>

<style scoped>

    .submenu {
        background-color: red;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .icons {
        margin-top: 5px;
        color: white;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-end;
    }

    .personal-icons {
        margin: 5px;
    }

    .btn-search {
        color: #fff;
        font-weight: bold;
    }


    @media screen and (max-width: 690px) {

        .icons {
            display: flex;
            flex-direction: row;
            justify-content: center;
            font-size: 12px;
        }

    }  

     @media screen and (max-width: 575px) {
         .search {
             margin-bottom: 10px;
         }
    }

    
</style>