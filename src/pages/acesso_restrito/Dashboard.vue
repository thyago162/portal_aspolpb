<template>
    <b-container fluid>
        <b-row class="header-title ml-1 mr-1">
            <b-col class="title">
                <h5>RELATÓRIOS</h5>
            </b-col>
        </b-row>

        <b-row class="mt-3 ml-1 mr-1">
            <b-col >
                <h4>
                    Visão Geral
                </h4>
            </b-col>
        </b-row>

        <b-row class="mt-3">
            <b-col >
                <Abstract />
            </b-col>
        </b-row>

        <b-row class="ml-1 mr-1">
            <b-col class="mt-4 agreement">
                <h4>Convênios</h4>
                <b-row>
                    <b-col>
                        <AgreementChart />
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>

</template>

<script>
    import AgreementChart from '../../components/dashboard/AgreementChart';
    import Abstract from '../../components/dashboard/Abstract';
    export default {
        components: {
            AgreementChart,
            Abstract
        },

        data() {
            return {
            }
        },

    }
   
    
</script>

<style scoped>
    h5 {
        margin-top: 10px;
    }

</style>