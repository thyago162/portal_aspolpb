<template>
    <footer class="page-footer font-small footer">
        <b-container fluid>
            <b-container>
                <b-row>
                    <b-col class="footer-head">
                        <span class="ml-5">Siga a Aspol tambêm nas redes sociais</span>
                        <a >
                            <font-awesome-icon :icon="['fab', 'instagram-square']" 
                                size="2x" class="icon alt personal-icons m-2" />
                        </a>
                        <a >
                            <font-awesome-icon size="2x" :icon="['fab', 'facebook-square']" 
                                class="icon alt personal-icons m-1" />
                        </a>
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
                                <b-link class="personal-link-option">QUEM SOMOS</b-link>
                                <b-link class="personal-link-option">NOSSA HISTÓRIA</b-link>
                                <b-link class="personal-link-option">CAMPANHA</b-link>
                            </div>
                            <div  class=" menu-options">
                                <b-link class="personal-link" :style="{fontWeight: 'bold'}">MÍDIA</b-link>
                                <b-link class="personal-link-option">NOTICIAS</b-link>
                                <b-link class="personal-link-option">ASPOL NA MÍDIA</b-link>
                            </div>
                            <div class="menu-options">
                                <b-link class="personal-link" :style="{fontWeight: 'bold'}">CONTATOS</b-link>
                            </div>
                            <div class="menu-options">
                                <b-link class="personal-link" :style="{fontWeight: 'bold'}">CONVÊNIOS</b-link>
                            </div>
                            <div class="menu-options">
                                <b-link class="personal-link" :style="{fontWeight: 'bold'}">ÁREA RESTRITA</b-link>
                                <b-link class="personal-link-option">TRANSPARÊNCIA</b-link>
                                <b-link class="personal-link-option">SUGESTÕES</b-link>
                                <b-link class="personal-link-option">ASSESSORIA JURÍDICA</b-link>
                                <b-link class="personal-link-option">ARQUIVOS</b-link>
                            </div>
                        </nav>
                        
                    </b-col>
                </b-row>
    
                <b-row>
                    <b-col class="address-footer">
                        <p>Rua Empresário João Rodrigues Alves, Nº 125 - Sala 1401 Torre A - Bancários</p>
                        <p>João Pessoa - PB, 58053-110</p>
                    </b-col>
                </b-row>
            </b-container>

        </b-container>

    </footer>
</template>

<script>
    
    export default {
        
    }
</script>

<style scoped>
    .footer {
        background-color: rgb(42, 44, 44);
        color: white;
        font-weight: bold;
    }

    .footer-head {
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }

    .personal-icon {
        margin: 5px;
        border-radius: 50%;
    }

    .address-footer {
        margin-top: 60px;
        text-align: center;
    }
    
    .personal-link {
        color: #ffffff;
        font-weight: bolder;
        font-size: 16px;
    }

    .menu-footer {
        display: flex;
        flex-direction: row;
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
        font-weight:normal;
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
            font-size: 22px;
        }
         
     }

</style>