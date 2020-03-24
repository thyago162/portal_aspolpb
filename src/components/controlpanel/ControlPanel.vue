<template>
    <div>
        <b-modal id="control-panel" ref="control-panel" 
            title="Painel de controle" hide-footer header-bg-variant="secondary" 
                header-text-variant="light">
            <div class="options">

                <b-button class="control-panel-btn"  
                    variant="primary" @click="closeModal" >
                    <font-awesome-icon icon="newspaper" class="icon alt"/>
                    NOTÍCIAS
                </b-button>

                <b-button class="control-panel-btn" variant="success" >
                    <font-awesome-icon  icon="building" class="icon alt"/>
                    INSTITUCIONAL
                </b-button>

                <b-button class="control-panel-btn" variant="danger" >
                    <font-awesome-icon icon="handshake" />
                    PARCEIROS
                </b-button>

                 <b-button class="control-panel-btn" variant="secondary" >
                    <font-awesome-icon icon="file" />
                    CONVÊNIOS
                </b-button>

                <b-button class="control-panel-btn" variant="info" >
                    <font-awesome-icon icon="address-card" />
                    ASSOCIADOS
                </b-button>

                 <b-button class="control-panel-btn" variant="primary" >
                    <font-awesome-icon icon="bullhorn" />
                    AVISOS
                </b-button>

                <b-button class="control-panel-btn" variant="warning" >
                    <font-awesome-icon icon="tv" />
                    MIDIAS SOCIAIS
                </b-button>

                 <b-button class="control-panel-btn" variant="success" >
                    <b-icon icon="folder-fill" />
                    ARQUIVOS
                </b-button>

                <b-button class="control-panel-btn" variant="dark" >
                    <font-awesome-icon icon="users" />
                    USUÁRIOS
                </b-button>

            </div>
            
        </b-modal>
    <CpNews />
    <CpPartner />
    <CpUser />
    <CpInstitucional />
    <CpSocialNetwork />
    <CpAgreement />
    <CpFile />
    <CpAssociated />

    </div>
</template>

<script>
    import CpNews from './CpNews';
    import CpPartner from './cpPartner';
    import CpUser from './CpUser';
    import CpInstitucional from './CpInstitucional';
    import CpSocialNetwork from './CpSocialNetork';
    import CpAgreement from './CpAgreement';
    import CpFile from './CpFile';
    import CpAssociated from './CpAssociated';

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

        methods: {
            closeModal() {
                this.$refs['control-panel'].hide();
            },
        }
        
    }
</script>

<style scoped>
    .options {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    .control-panel-btn {
        margin: 5px;
        height: 50px;
        width: 180px;
    }

    @media screen and (max-width: 589px){
      .control-panel-btn {
          width: 200px;
      }
    }
</style>