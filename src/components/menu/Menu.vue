<template>
    <div class="menu">
        <b-navbar toggleable="lg" type="dark" variant="light">
            <b-navbar-brand href="#">
                <img src="../../assets/images/logo_aspolpb.png" alt="Aspolpb" 
                    class="d-inline-block align-top" width="150px" height="45">
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav >
                <b-navbar-nav center class="ml-auto">
                    <b-nav-item  >
                        <b-link :to="{name: 'home'}" class="personal-link">
                            INICIO
                        </b-link>
                    </b-nav-item>
                    <b-nav-item href="#" >
                        <b-link :to="{name: 'institucional'}" class="personal-link">
                            INSTITUCIONAL
                        </b-link>
                    </b-nav-item>
                    <b-nav-item href="#" >
                        <b-link class="personal-link">
                            NOTÍCIAS
                        </b-link>
                    </b-nav-item>
                    <b-nav-item href="#" >
                        <b-link class="personal-link">
                            CONVÊNIOS
                        </b-link>
                    </b-nav-item>
                    <b-nav-item href="#" >
                        <b-link class="personal-link">
                            CONTATOS
                        </b-link>
                    </b-nav-item>
                    <b-nav-item>
                        <b-button size="sm" class="personal-btn">ASSOCIE-SE</b-button>
                    </b-nav-item>
                    <b-nav-item v-if="!this.token">
                        <b-button  v-b-modal.auth size="sm" 
                            class="personal-btn">
                            ACESSO RESTRITO <b-icon icon="lock-fill"></b-icon>
                        </b-button>
                    </b-nav-item>
                    <b-nav-item-dropdown v-if="this.token">
                        <template v-slot:button-content>
                            <b-button size="sm" class="personal-btn">
                                ACESSO RESTRITO <b-icon icon="unlock-fill"></b-icon>
                            </b-button>
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">
                     <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                    </b-nav-form>
                </b-navbar-nav>

            </b-collapse>
        </b-navbar>
        <Auth />
    </div>  
</template>

<script>
    import Auth from '../auth/Auth';
    export default {
        components: {
            Auth
        },
        computed: {
            token() {
                return this.$store.getters.getToken;
            }
        },
        data() {
            return {
                
            }
        }
        
    }
</script>

<style scoped>
    .menu {
        margin-top: 30px;
        font-family: 'Raleway', sans-serif;
    }

    .personal-btn {
        background: rgba(138,21,0,1);
        background: -moz-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -webkit-gradient(left top, right top, color-stop(0%, rgba(138,21,0,1)), color-stop(25%, rgba(186,35,15,1)), color-stop(71%, rgba(201,27,8,1)), color-stop(100%, rgba(240,31,12,1)));
        background: -webkit-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -o-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -ms-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: linear-gradient(to right, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8a1500', endColorstr='#f01f0c', GradientType=1 );
        border-radius: 5px;
    }

    .personal-link {
        color: black;
        font-size: 18px;
    }
</style>

