<template>
    <b-container fluid class="mb-3">
        <b-row class="header-title mt-3" >
            <b-col class="title" lg="11">
                <h5>PAINEL DE CONTROLE</h5>
            </b-col>
        </b-row>
        <b-row class="mt-5 align-body">
            <b-col lg="11">
                
                <div class="options" v-if="isLoged != null">

                    <b-button class="control-panel-btn" variant="primary"  @click="cpOption('cp-news')">
                        <font-awesome-icon icon="newspaper" class="icon alt" size="2x"/>
                        <h4>NOTÍCIAS</h4> 
                    </b-button>

                    <b-button class="control-panel-btn" variant="success" v-b-modal.cp-institucional >
                        <font-awesome-icon  icon="building" class="icon alt" size="2x"/>
                        <h4>INSTITUCIONAL</h4>
                    </b-button>

                    <b-button class="control-panel-btn" variant="secondary" v-b-modal.cp-agreement >
                        <font-awesome-icon icon="file" size="2x" class="icon alt"/>
                        <h4> CONVÊNIOS</h4>
                    </b-button>

                    <b-button class="control-panel-btn" variant="info" v-b-modal.cp-associated >
                        <font-awesome-icon icon="address-card" size="2x" class="icon alt"/>
                        <h4>ASSOCIADOS</h4>
                    </b-button>

                    <b-button class="control-panel-btn" variant="danger" v-b-modal.cp-social-network >
                        <font-awesome-icon icon="tv" size="2x" class="icon alt"/>
                        <h4>MIDIAS SOCIAIS</h4>
                    </b-button>

                    <b-button class="control-panel-btn" variant="danger" disabled>
                        <b-icon icon="card-list" class="h4 mb-2"></b-icon>
                        <h4>PESQUISAS</h4>
                    </b-button>

                    <b-button class="control-panel-btn" variant="warning" v-b-modal.cp-file >
                        <div class="h3">
                            <b-icon icon="folder-fill" size="2x" class="icon alt"/>
                        </div>
                        <h4>ARQUIVOS</h4>
                    </b-button>

                    <b-button class="control-panel-btn" variant="dark" v-b-modal.cp-user >
                        <font-awesome-icon icon="users" size="2x" class="icon alt" />
                        <h4>USUÁRIOS</h4>
                    </b-button>

                </div>
                <h5 v-else :style="{color: 'red'}">
                    Permissão negada!
                </h5>
                
            </b-col>
        </b-row>

        <CpPartner />
        <CpUser />
        <CpInstitucional />
        <CpSocialNetwork />
        <CpAgreement />
        <CpFile />
        <CpAssociated />
        </b-container>
</template>

<script>
    import CpPartner from '../../components/controlpanel/cpPartner';
    import CpUser from '../../components/controlpanel/CpUser';
    import CpInstitucional from '../../components/controlpanel/CpInstitucional';
    import CpSocialNetwork from '../../components/controlpanel/CpSocialNetork';
    import CpAgreement from '../../components/controlpanel/CpAgreement';
    import CpFile from '../../components/controlpanel/CpFile';
    import CpAssociated from '../../components/controlpanel/CpAssociated';

    export default {
        components: {
            CpPartner,
            CpUser,
            CpInstitucional,
            CpSocialNetwork,
            CpAgreement,
            CpFile,
            CpAssociated
        },

        computed: {
            isLoged: function() {
                return this.$store.getters.getToken;
            }
        },

        methods: {
            cpOption() {
                this.$router.push({name: 'table-news'})
            }
        }
        
    }
</script>

<style scoped>

    h5 {
        margin-top: 10px;
    }

     .options {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }

    .control-panel-btn {
        margin: 15px;
        height: 130px;
        width: 250px;
    }
</style>