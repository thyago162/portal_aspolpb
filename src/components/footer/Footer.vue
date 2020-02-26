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
                    <b-col class="menu-footer">
                        <b-nav class="ml-4">
                            <b-nav-item :to="{name: 'home'}" >
                                <span class="personal-link">
                                    INICIO
                                </span>
                            </b-nav-item>

                            <b-nav-item-dropdown text="INSTITUCIONAL" 
                                right toggle-class="nav-link-custom" >
                                <b-dropdown-item>QUEM SOMOS</b-dropdown-item>
                                <b-dropdown-item>NOSSA HISTÓRIA</b-dropdown-item>
                                <b-dropdown-item>CAMPANHAS</b-dropdown-item>
                                <b-dropdown-item>IDENTIDADE VISUAL</b-dropdown-item>
                            </b-nav-item-dropdown>

                            <b-nav-item :to="{name: 'noticias'}" >
                                
                                    <span class="personal-link">NOTÍCIAS</span>
                            </b-nav-item>
                            <b-nav-item >
                                <span class="personal-link">
                                    CONVÊNIOS
                                </span>
                            </b-nav-item>
                            <b-nav-item>
                                <span class="personal-link">
                                    CONTATOS
                                </span>
                            </b-nav-item>
                            <b-nav-item>
                                <span class="personal-link">
                                    ASSOCIE-SE
                                </span>
                            </b-nav-item>
                            <b-nav-item>
                                <span class="personal-link">
                                    ÁREA RESTRITA 
                                    <b-icon icon="lock-fill"></b-icon>
                                </span>
                            </b-nav-item>
                        </b-nav>
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
        height: 300px;
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

    .menu-footer {
        margin-top: 50px;
    }

    .address-footer {
        margin-top: 60px;
        text-align: center;
    }
    
    .personal-link {
        color: #ffffff;
    }
</style>