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
                        <nav class="menu-footer ml-5">
                            <div class="mr-4">
                                <b-link class="personal-link">INICIO</b-link>
                            </div>
                            <div :style="{display: 'flex', flexDirection: 'column'}">
                                <b-link class="personal-link">INSTITUCIONAL</b-link>
                                <b-link class="personal-link">QUEM SOMOS</b-link>
                                <b-link class="personal-link">NOSSA HISTÓRIA</b-link>
                                <b-link class="personal-link">CAMPANHA</b-link>
                            </div>
                            <div class="mr-4 ml-3">
                                <b-link class="personal-link">NOÍTICIAS</b-link>
                            </div>
                            <div class="mr-4">
                                <b-link class="personal-link">CONTATOS</b-link>
                            </div>
                            <div class="mr-4">
                                <b-link class="personal-link">CONVÊNIOS</b-link>
                            </div>
                            <div :style="{display: 'flex', flexDirection: 'column'}">
                                <b-link class="personal-link" >ÁREA RESTRITA</b-link>
                                <b-link class="personal-link">TRANSPARÊNCIA</b-link>
                                <b-link class="personal-link">SUGESTÕES</b-link>
                                <b-link class="personal-link">ASSESSORIA JURÍDICA</b-link>
                                <b-link class="personal-link">ARQUIVOS</b-link>
                            </div>
                        </nav>
                        
                    </b-col>
                </b-row>
    
                <b-row>
                    <b-col class="address-footer">
                        <p>Rua Joaquim Borda Filho, Nº 12 - Sala 201 - Jardim São Paulo</p>
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
    }

    .menu-footer {
        display: flex;
        flex-direction: row;
        margin-top: 50px;
    }

</style>