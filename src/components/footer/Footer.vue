<template>
    <footer class="page-footer font-small footer">
        <b-container fluid>
            <b-container fluid>
                <b-row>
                    <b-col class="footer-head">
                        <span  >Siga a Aspol nas redes sociais</span>
                        <div class="block-icon ml-2 mr-2">
                            <a class="mt-1" href="https://www.instagram.com/aspolpb/?hl=pt-br" target="_blank">
                                <font-awesome-icon :icon="['fab', 'instagram']" 
                                    class="icon alt personal-icons"  />
                            </a>

                        </div>

                        <div class="block-icon">
                            <a class="mt-1" href="https://pt-br.facebook.com/aspolpb/" target="_blank">
                                <font-awesome-icon  :icon="['fab', 'facebook-f']" 
                                    class="icon alt personal-icons" />  
                            </a>
                        </div>
                        
                    </b-col>
                </b-row>
                <b-row>
                    <b-col >
                        <nav class="menu-footer">
                            <div >
                                <b-link class="personal-link " :style="{fontWeight: 'bold'}">INICIO</b-link>
                            </div>
                            <div class="menu-options">
                                <b-link class="personal-link" :style="{fontWeight: 'bold'}">INSTITUCIONAL</b-link>
                                <b-link class="personal-link-option" :to="{name: 'sobre'}">QUEM SOMOS</b-link>
                                <b-link class="personal-link-option" :to="{name: 'historia'}">NOSSA HISTÓRIA</b-link>
                                <b-link class="personal-link-option" :to="{name: 'campanhas'}">CAMPANHA</b-link>
                                <b-link class="personal-link-option" :to="{name: 'identidade-visual'}">IDENTIDADE VISUAL</b-link>
                            </div>
                            <div  class=" menu-options">
                                <b-link class="personal-link" :style="{fontWeight: 'bold'}">MÍDIA</b-link>
                                <b-link class="personal-link-option" :to="{name: 'noticias'}">NOTICIAS</b-link>
                                <b-link class="personal-link-option" :to="{name: 'midia-view'}">ASPOL NA MÍDIA</b-link>
                            </div>
                            <div class="menu-options">
                                <b-link class="personal-link" :style="{fontWeight: 'bold'}" :to="{name: 'contato'}">CONTATOS</b-link>
                            </div>
                            <div class="menu-options">
                                <b-link class="personal-link" :style="{fontWeight: 'bold'}" :to="{name: 'convênio'}">CONVÊNIOS</b-link>
                            </div>
                            
                            <div class="menu-options">
                                <b-link class="personal-link" :style="{fontWeight: 'bold'}">ÁREA RESTRITA</b-link>
                                <b-link class="personal-link-option" v-if="this.token == null" v-b-modal.auth >TRANSPARÊNCIA</b-link>
                                <b-link class="personal-link-option" v-else :to="{name: 'transparencia'}" >TRANSPARÊNCIA</b-link>
                                <b-link class="personal-link-option" v-if="this.token == null" v-b-modal.auth>SUGESTÕES</b-link>
                                <b-link class="personal-link-option" v-else :to="{name: 'sugestoes'}">SUGESTÕES</b-link>
                                <b-link class="personal-link-option" v-if="this.token == null" v-b-modal.auth>ASSESSORIA JURÍDICA</b-link>
                                <b-link class="personal-link-option" v-else :to="{name: 'assessoria-juridica'}">ASSESSORIA JURÍDICA</b-link>
                                <b-link class="personal-link-option" v-if="this.token == null" v-b-modal.auth>ARQUIVOS</b-link>
                                <b-link class="personal-link-option" v-else :to="{name: 'arquivos'}">ARQUIVOS</b-link>
                            </div>
                        </nav>
                        
                    </b-col>
                </b-row>
    
                <b-row>
                    <b-col class="address-footer">
                        <p>Rua Empresário João Rodrigues Alves, Nº 125, Empresarial Delta Center, Sala 1401 Torre A – </p>
                        <p :style="{marginTop: '-17px'}">Bancários, João Pessoa - PB, CEP.: 58053-110 </p>
                        <p>Contato: (83) 3506-3429</p>
                    </b-col>
                </b-row>
                <b-row class="mt-3">
                    <b-col>
                        <p :style="{float: 'left'}">© 2020 Associação dos policiais civis de carreira da Paraíba . Todos os direitos reservados.</p>
                    </b-col>
                </b-row>
            </b-container>

        </b-container>

    </footer>
</template>

<script>
    
    export default {
        computed: {
            token: function() {
                return this.$session.get('jwt');
            }
        }
        
    }
</script>

<style scoped>
    .footer {
        background-color: rgb(42, 44, 44);
        color: white;
        font-family: 'Roboto', sans-serif;
    }

    .footer-head {
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .personal-icons {
        color: #000;
        font-size: 23px;
    }


    .address-footer {
        margin-top: 60px;
        text-align: center;
    }
    
    .personal-link {
        color: #ffffff;
        font-size: 16px;
    }

    .menu-footer {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-top: 50px;
        text-align: center;
    }

    .menu-options {
        display: flex;
        flex-direction: column;
        margin-right: 10px;
        margin-left: 10px;
    }

    .personal-link-option {
        color: #ffffff;
        font-size: 14px;
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

    @media screen and (max-width: 767px) {
        .menu-footer {
            margin-left: 0px;
            justify-content: center;
            font-size: 12px;        
        }

        .personal-link {
            font-size: 14px;
        }

        .personal-link-option {
            font-size: 12px;
        }

        p {
            font-size: 12px;
        }

        span {
            font-size: 14px;
        }

        .footer-head {
            justify-content: left;
            align-items: center;
        }
        .icon {
            font-size: 28px;
        }
        
    }

     @media screen and (max-width: 500px) {
        .menu-footer {
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .personal-link {
            font-size: 12px;
        }

        .personal-link-option {
            font-size: 10px;
        }

        .menu-options {
            margin-top: 10px;
        }

        .menu-footer, p {
            font-size: 10px;
        }

        span {
            font-size: 12px;
        }
         
        .icon {
            font-size: 17px;
        }

        .block-icon {
            width: 25px;
            height: 25px;
        }
         
     }

</style>