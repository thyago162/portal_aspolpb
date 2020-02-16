<template>
    <div>
        <b-modal id="control-panel" ref="control-panel" 
            title="Painel de controle" hide-footer header-bg-variant="secondary" 
                header-text-variant="light">
            <div class="options">

                <b-button class="control-panel-btn" v-b-modal.cp-news 
                    variant="primary" @click="closeModal" >
                    <font-awesome-icon icon="newspaper" class="icon alt"/>
                    NOTÍCIAS
                </b-button>

                <b-button class="control-panel-btn" variant="success">
                    <font-awesome-icon  icon="building" class="icon alt"/>
                    INSTITUCIONAL
                </b-button>

                <b-button class="control-panel-btn" variant="warning">
                    <font-awesome-icon icon="phone"/>
                    CONTATOS
                </b-button>

                <b-button class="control-panel-btn" variant="danger">
                    <font-awesome-icon icon="handshake" />
                    CONVÊNIOS
                </b-button>

                <b-button class="control-panel-btn" variant="info">
                    <font-awesome-icon icon="address-card" />
                    ASSOCIADOS
                </b-button>

                <b-button class="control-panel-btn" variant="dark">
                    <font-awesome-icon icon="users" />
                    USUÁRIOS
                </b-button>

            </div>
            
        </b-modal>
    <CpNews />
    </div>
</template>

<script>
    import CpNews from './CpNews';
    export default {

        components: {
            CpNews
        },

        methods: {
            closeModal() {
                this.$refs['control-panel'].hide();
            }
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
        width: 170px;
    }
</style>