<template>
   
    <b-nav class="submenu">
        <b-row style="width:100%;">
            <b-col lg="4" >
                <nav class="icons">
                    <a >
                        <font-awesome-icon :icon="['fab', 'twitter-square']" 
                            size="2x" class="icon alt personal-icons" />
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

             <b-col  lg="4">
                <b-input-group :style="{marginTop: '4px'}" >
                    <b-form-input trim placeholder="Buscar no site" 
                        type="text" />
                    <b-input-group-append>
                        <b-button variant="default">
                            <b-icon icon="search" ></b-icon>
                        </b-button>
                    </b-input-group-append>
                </b-input-group>

            </b-col>
            
        </b-row>
        
            
        
    </b-nav>
        
        
</template>

<script>   
    export default {

    }
</script>

<style scoped>
    .submenu {
        background-color: red;
        height: 60px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .icons {
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

    .icon-search {
        position: absolute;
        color: #000;
    }

    .input-search {
        text-indent: 12px;
        width: 100px;
    }
    

    @media screen and (max-width: 690px) {

        .submenu {
            height: 70px;
        }

        .icons {
            display: flex;
            flex-direction: row;
            justify-content: center;
            font-size: 12px;
        }

        .search {
            display: flex;
            flex-direction: row;
            justify-content: left;
        }

        .icon-search {
            margin-top: -15px;
        }


    }

    @media screen and (max-width: 539px), (min-width: 325px){
        .input-search {
            width: 180px;
        }     
    }

  
    
</style>