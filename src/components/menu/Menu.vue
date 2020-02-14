<template>
    <div class="menu">
        <b-navbar toggleable="xl" type="dark" variant="light">
            <b-navbar-brand href="#">
                <img src="../../assets/images/logo_aspolpb.png" alt="Aspolpb" 
                    class="d-inline-block align-top logo" >
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse">
                <b-icon icon="list" variant="dark" class="h1 mb-2"></b-icon>
            </b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav >
                <b-navbar-nav center class="ml-auto">
                    <nav class="personal-menu">
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
                    </nav>
                    <b-nav-item-dropdown class="personal-drop">
                        <template v-slot:button-content>
                            <span class="personal-link">MENU</span>
                        </template>

                        <nav class="personal-drop-item">

                            <b-dropdown-item>
                                <b-link :to="{name: 'home'}" class="personal-link">
                                    INICIO
                                </b-link>
                            </b-dropdown-item>

                            <b-dropdown-item>
                                <b-link :to="{name: 'institucional'}" class="personal-link">
                                    INSTITUCIONAL
                                </b-link>
                            </b-dropdown-item>
                            <b-dropdown-item>
                            <b-link class="personal-link">
                                    NOTÍCIAS
                                </b-link>
                            </b-dropdown-item>
                            <b-dropdown-item>
                                <b-link class="personal-link">
                                    CONVÊNIOS
                                </b-link>
                            </b-dropdown-item>
                            <b-dropdown-item>
                                <b-link class="personal-link">
                                    CONTATOS
                                </b-link>
                            </b-dropdown-item>
                        </nav>

                    </b-nav-item-dropdown>
                    <b-nav-item>
                        <b-button size="sm" class="personal-btn">
                            <span>ASSOCIE-SE</span>
                        </b-button>
                    </b-nav-item>
                    <b-nav-item v-show="!this.token">
                        <b-button  v-b-modal.auth size="sm" 
                            class="personal-btn">
                            <span>
                            ACESSO RESTRITO 
                            </span>
                            <b-icon icon="lock-fill"></b-icon>
                        </b-button>
                    </b-nav-item>
                    <b-nav-item-dropdown v-show="this.token">
                        <template v-slot:button-content>
                            <b-button size="sm" class="personal-btn">
                               <span>
                                   ACESSO RESTRITO
                                </span>
                                <b-icon icon="unlock-fill" />
                            </b-button>
                        </template>
                        <nav class="restricted-access">
                            <b-dropdown-item href="#" class="personal-link">PARCEIROS</b-dropdown-item>
                            <b-dropdown-item href="#" class="personal-link">ACESSORIA JURÍDICA</b-dropdown-item>
                            <b-dropdown-item href="#" class="personal-link">ANIVERSARIANTES</b-dropdown-item>
                            <b-dropdown-item href="#" class="personal-link">SUGESTÕES E OUVIDORIA</b-dropdown-item>
                            <b-dropdown-item href="#" class="personal-link">TRANSPARÊNCIA</b-dropdown-item>
                            <b-dropdown-item href="#" class="personal-link">BANCOS E PERMITAS</b-dropdown-item>
                            <b-dropdown-item href="#" class="personal-link">ASSEMBLEIA</b-dropdown-item>
                            <b-dropdown-item href="#" class="personal-link">DOCUMENTOS ARQUIVADOS</b-dropdown-item>
                            <b-dropdown-item href="#" class="personal-link">ATUALIZAÇÃO CADASTRAL</b-dropdown-item>
                            <b-dropdown-item href="#" class="personal-link" @click="logout">SAIR</b-dropdown-item>

                        </nav>
                        
                    </b-nav-item-dropdown>
                </b-navbar-nav>

                <b-navbar-nav >
                     <b-nav-form class="personal-search">
                         <b-button size="sm" class="btn-search" disabled>
                             <b-icon icon="search" ></b-icon>
                         </b-button>
                        <b-form-input size="sm" class="mr-sm-4 search" placeholder="Search" ></b-form-input>
                        
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
                return this.$session.has('jwt');
            }
        },
        data() {
            return {
                
            }
        },

        methods: {
            logout() {
                this.$session.destroy();
                location.reload()
            }
        }
        
    }
</script>

<style scoped>
    .menu {
        margin-top: 30px;
        font-family: 'Raleway', sans-serif;
    }

    .personal-menu {
        display: flex;
        flex-direction: row;
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
        margin-top: -4px;
    }

    .logo {
        width :150px;
        height: 45px;
        margin-top: -5px;
    }

    .personal-link {
        color:#333333;
        text-decoration: none;
        font-size: 14px;
        margin-top: 15px;
    }

    .personal-link:hover {
        color: black;
    }

    .personal-btn span {
        font-size: 14px;
    }

    .search {
        text-indent: 30px;
    }

    .btn-search {
        background-color: gray;
        border: lightgray 1px solid;
        position: absolute;
    }

     .personal-drop {
        display: none;
    }

    @media screen and (max-width: 1199px) {

        .personal-drop {
            display: none;
        }

        .personal-link {
            font-size: 12px;
            margin-top: 0px;
        }

        .personal-btn span {
            font-size: 10px;
        }

        .logo {
            width: 100px;
            height: 35px;
        }

        .restricted-access {
            height: 55px;
            overflow: auto;
        }

        .personal-drop {
            display: block;
        }

        .personal-drop-item {
            height: 55px;
            overflow: auto;
        }

        .personal-menu {
            display: none;
        }

        .personal-search {
            margin-top: 2px;
        }
    }

    @media screen and (max-width: 600px) {
        
        .personal-search {
            width: 150px;
        }

        .personal-link {
            font-size: 12px;
            margin-top: 0px;
        }

        .dropdown-menu {
            overflow: auto;
        }
    }

    @media screen and (max-width: 500px) {
        .personal-link {
            font-size: 10px;
            margin-top: 0px;
        }

        .restricted-access {
            height: 40px;
            overflow: auto;
        }
        
        .personal-btn span {
            font-size: 8px;
        }

        .personal-drop-item {
            height: 70px;
            overflow: auto;
        }
    }
</style>

