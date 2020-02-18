<template>
    <div class="menu">
        <b-navbar toggleable="xl" type="dark" variant="light">
            <b-navbar-brand style="margin-left:45px;">
                <img src="../../assets/images/logo_aspol_02.png" alt="Aspolpb" 
                    class="d-inline-block align-top logo" >
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse">
                <b-icon icon="list" variant="dark" class="h1 mb-2"></b-icon>
            </b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav style="margin-left:60px;">
                <b-navbar-nav  >
                    <b-nav-item>
                        <b-link :to="{name: 'home'}" class="personal-link">
                            INÍCIO
                        </b-link>
                    </b-nav-item>

                    <b-nav-item-dropdown>
                        <template v-slot:button-content>
                            <span class="personal-link" >INSTITUCIONAL</span>
                        </template>
                        <b-dropdown-item>
                            <b-link class="personal-link">
                                QUEM SOMOS
                            </b-link> 
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <b-link class="personal-link">
                                NOSSA HISTÓRIA
                            </b-link>
                        </b-dropdown-item>
                        <b-dropdown-item>
                           <b-link class="personal-link">
                               CAMPANHAS
                            </b-link> 
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <b-link class="personal-link">
                                IDENTIDADE VISUAL
                            </b-link>
                        </b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item>
                        <b-link :to="{name: 'home'}" class="personal-link">
                            NOTÍCIAS
                        </b-link>
                    </b-nav-item>
                    <b-nav-item>
                        <b-link :to="{name: 'home'}" class="personal-link">
                            CONTATOS
                        </b-link>
                    </b-nav-item>
                    <b-nav-item>
                        <b-link :to="{name: 'home'}" class="personal-link">
                            CONVÊNIOS
                        </b-link>

                    </b-nav-item>
                    <b-nav-item>
                        <b-button size="sm" class="personal-btn">
                            <span>ASSOCIE-SE</span>
                        </b-button>
                    </b-nav-item>

                    <b-nav-item v-show="!token" >
                        <b-button size="sm" class="personal-btn" v-b-modal.auth>
                            <span>
                                AREA RESTRITA
                                <b-icon icon="lock-fill" />
                            </span>
                        </b-button>
                    </b-nav-item>

                     <b-nav-item-dropdown v-show="token">
                        <template v-slot:button-content>
                            <b-button size="sm" class="personal-btn" >
                                <span>
                                    AREA RESTRITA
                                    <b-icon icon="unlock-fill"></b-icon>
                                </span>
                            </b-button>
                        </template>
                        <b-dropdown-item >
                            <b-link class="personal-link"> 
                                <b-icon icon="book-half-fill"></b-icon>
                                TRANSPARÊNCIA </b-link>
                        </b-dropdown-item>
                        <b-dropdown-item >
                            <b-link class="personal-link">
                                <b-icon icon="chat-fill"></b-icon>
                                SUGESTÕES
                            </b-link>
                        </b-dropdown-item>
                        <b-dropdown-item >
                            <b-link class="personal-link">
                                <b-icon icon="tag-fill"></b-icon>
                                ACESSORIA JURÍDICA
                            </b-link>
                        </b-dropdown-item>
                        <b-dropdown-item >
                            <b-link class="personal-link">
                                <b-icon icon="folder-fill"></b-icon>
                                 ARQUIVOS
                            </b-link>
                        </b-dropdown-item>
                         <b-dropdown-item c>
                            <b-link class="personal-link" v-b-modal.control-panel> 
                                <b-icon icon="gear-fill"></b-icon>
                                ADMINISTRAÇÃO
                            </b-link>
                        </b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-nav-item>
                        <b-link class="personal-link" @click="logout" v-show="token"> 
                            SAIR <b-icon icon="power"></b-icon>
                        </b-link>
                    </b-nav-item>

                </b-navbar-nav>

            </b-collapse>
        </b-navbar>
        <Auth />
        <control-pane />
        
    </div>  
</template>

<script>
    import Auth from '../auth/Auth';
    import ControlPane from '../controlpanel/ControlPanel';
    export default {
        components: {
            Auth,
            ControlPane
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
        margin-top: 20px;
    }

    .logo {
        width: 200px;
        height: 70px;
        margin-top: -10px;
    }

    .personal-link {
        color: #333;
        text-decoration: none;
    }

    .personal-link:hover {
        color: #000;
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

    @media screen and (max-width: 1199px) {
        .personal-link {
            font-size: 14px;
        }

    }


    @media screen and (max-width: 375px) and (min-width: 320px) {

        .logo {
            width: 150px;
            height: 50px;
        }
        .personal-link {
            font-size: 10px;
        }
    }
</style>

