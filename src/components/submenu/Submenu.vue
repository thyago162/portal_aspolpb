<template>
   
    <b-nav class="submenu">
        <b-row style="width:100%;">
            <b-col lg="6" sm="6">
                <nav class="icons mr-4">

                    <div class="block-icon ml-2">
                        <a >
                            <font-awesome-icon :icon="['fab', 'instagram']" 
                             class="icon alt personal-icons" />
                        </a>
                    </div>

                    <div class="block-icon ml-2">>
                         <a >
                            <font-awesome-icon :icon="['fab', 'facebook-f']" 
                            class="icon alt personal-icons facebook-icon" />
                        </a>

                    </div>

                    <div class="block-icon ml-2">
                        <a >
                            <font-awesome-icon :icon="['fab', 'whatsapp']" 
                            class="icont alt personal-icons" />
                        </a>
                    </div>
                </nav>

            </b-col>

             <b-col  lg="6" sm="6">
                <b-form inline class="search">
                    <b-input-group :style="{marginTop: '4px'}" class="mb-1">
                        <b-form-input trim placeholder="Buscar no site" 
                            type="text" v-model="search" size="sm" class="mt-1" />
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
        background-color: rgb(189, 22, 34);
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .icons {
        color: white;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-end;
        margin-top: 6px;
    }

    .personal-icons {
        color: red;
        font-size: 23px;
        margin-top: 4px;
    }

    .btn-search {
        color: #fff;
        font-weight: bold;
    }

    .block-icon {
        background-color: #fff;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .facebook-icon {
        margin-right: 10px;
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

        .personal-icons {
            font-size: 20px;
            margin-left: 1px;
            margin-top: 2px;
        }

        .block-icon {
            width: 30px;
            height: 28px;
        }
    }

    
</style>