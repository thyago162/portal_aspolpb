<template>
    <b-container>
        <b-row class="header-title">
            <b-col lg="11" class="title">
                <h5>RELATÓRIOS</h5>
            </b-col>
        </b-row>

        <b-row >
            <b-col class="geral">
                <h4>
                    Visão Geral
                </h4>
            </b-col>
        </b-row>

        <b-row class="mt-3">
            <b-col cols="12" >
                <Abstract />
            </b-col>
        </b-row>

        <b-row>
            <b-col lg="11" class="mt-4 agreement">
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

    .geral {
        margin-top: 20px;
        margin-left: 35px;
    }

    .agreement {
        margin-left: 35px;
    }
</style>