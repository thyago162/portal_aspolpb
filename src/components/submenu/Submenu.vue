<template>
   
    <b-nav class="submenu">
        <b-row style="width:100%;">
            <b-col  >
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
            <b-col  >
                <b-nav-item class="search">
                    <b-nav-form>
                        <b-icon icon="search" class="icon-search" rotate="90"></b-icon>
                        <b-form-input size="sm" class="mr-sm-2 input-search" 
                            placeholder="Search"></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0 btn-search" type="submit" 
                            variant="default" >BUSCAR</b-button>
                    </b-nav-form>
                </b-nav-item>

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
        height: 50px;
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