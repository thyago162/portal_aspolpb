<template>
    <b-container fluid class="mb-5">
        <b-row class="cp-row">
            <b-col class="cp-head ml-4">
                <div class="cp-title">
                    <h5>PAINEL DE CONTROLE</h5>
                </div>
            </b-col>
        </b-row>
        <b-row class="mt-5">
            <b-col>
                <div class="options" v-if="isLoged != null">

                    <b-button class="control-panel-btn" v-b-modal.cp-news 
                        variant="primary"  >
                        <font-awesome-icon icon="newspaper" class="icon alt" size="2x"/>
                        <h4>NOTÍCIAS</h4> 
                    </b-button>

                    <b-button class="control-panel-btn" variant="success" v-b-modal.cp-institucional >
                        <font-awesome-icon  icon="building" class="icon alt" size="2x"/>
                        <h4>INSTITUCIONAL</h4>
                    </b-button>

                    <b-button class="control-panel-btn" variant="danger" v-b-modal.cp-partner>
                        <font-awesome-icon icon="handshake" size="2x" class="icon alt"/>
                        <h4>PARCEIROS</h4> 
                    </b-button>

                    <b-button class="control-panel-btn" variant="secondary" v-b-modal.cp-agreement >
                        <font-awesome-icon icon="file" size="2x" class="icon alt"/>
                        <h4> CONVÊNIOS</h4>
                    </b-button>

                    <b-button class="control-panel-btn" variant="info" v-b-modal.cp-associated >
                        <font-awesome-icon icon="address-card" size="2x" class="icon alt"/>
                        <h4>ASSOCIADOS</h4>
                    </b-button>

                    <b-button class="control-panel-btn" variant="warning" v-b-modal.cp-social-network >
                        <font-awesome-icon icon="tv" size="2x" class="icon alt"/>
                        <h4>MIDIAS SOCIAIS</h4>
                    </b-button>

                    <b-button class="control-panel-btn" variant="success" v-b-modal.cp-file disabled>
                        <div class="h3">
                            <b-icon icon="folder-fill" size="2x" class="icon alt"/>
                        </div>
                        
                        <h4>ARQUIVOS</h4>
                    </b-button>

                    <b-button class="control-panel-btn" variant="dark" v-b-modal.cp-user >
                        <font-awesome-icon icon="users" size="2x" class="icon alt" />
                        <h4>USUÁRIOS</h4>
                    </b-button>

                    <b-button class="control-panel-btn" variant="dark" v-b-modal.cp-user disabled>
                        <font-awesome-icon icon="users" size="2x" class="icon alt"/>
                        <h4>DASHBOARD</h4>
                    </b-button>

                </div>
                <h5 v-else :style="{color: 'red'}">
                    Permissão negada!
                </h5>
                
            </b-col>
        </b-row>

        <CpNews />
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
    import CpNews from '../../components/controlpanel/CpNews';
    import CpPartner from '../../components/controlpanel/cpPartner';
    import CpUser from '../../components/controlpanel/CpUser';
    import CpInstitucional from '../../components/controlpanel/CpInstitucional';
    import CpSocialNetwork from '../../components/controlpanel/CpSocialNetork';
    import CpAgreement from '../../components/controlpanel/CpAgreement';
    import CpFile from '../../components/controlpanel/CpFile';
    import CpAssociated from '../../components/controlpanel/CpAssociated';

    export default {
        components: {
            CpNews,
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
        }
        
    }
</script>

<style scoped>
    .cp-row {
        width: 99%;
    }

    .cp-head {
        border-bottom: 3px solid red;
        margin-top: 20px;
    }

    .cp-title {
        background: rgba(138,21,0,1);
        background: -moz-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -webkit-gradient(left top, right top, color-stop(0%, rgba(138,21,0,1)), color-stop(25%, rgba(186,35,15,1)), color-stop(71%, rgba(201,27,8,1)), color-stop(100%, rgba(240,31,12,1)));
        background: -webkit-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -o-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -ms-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: linear-gradient(to right, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8a1500', endColorstr='#f01f0c', GradientType=1 );
        width: 250px;
        height: 40px;
        color: white;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-left: -15px;
        margin-top: 10px;
    }

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