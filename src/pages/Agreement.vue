<template>
    <b-container fluid class="mb-3">

        <b-row class="header-title ml-1 mr-1">
            <b-col class="title" >
                <h5>CONVÊNIOS</h5>
            </b-col>
        </b-row>

        <b-row class="mt-4 align-body">
            <b-col >
                <b-form inline :style="{float: 'right'}">
                    <b-form-group >
                        <b-form-select class="ml-3"  v-model="selected" >
                            <b-form-select-option value="">Filtrar</b-form-select-option>
                            <b-form-select-option v-for="(citie,index) in cities" 
                               :value="citie.nm_city" :key="index">
                                {{citie.nm_city}}
                            </b-form-select-option>
                        </b-form-select>
                    </b-form-group>
                </b-form>
            </b-col>
        </b-row>

        <b-row class="ml-1 mr-1">
            <b-col >
                <div class="agreement-card mt-3" >
                    <AgreementCard :item="agreement" 
                        v-for="(agreement,index) in agreements" :key="index"/>
                </div>
                
            </b-col>
        </b-row>

    </b-container>
</template>

<script>
    import AgreementCard from '../components/agreement/AgreementCard';
    
    export default {

        components: {
            AgreementCard
        },

        mounted() {
            this.$store.dispatch('agreement');
            this.getAllCitys();
        },

        data() {
            return {
                cities: [],
                selected: '',
                filter: []
            }

        },

        computed: {
            agreements: function() {
                if (this.selected) {
                    let agreement = this.$store.getters.getAgreement
                    
                    return agreement.filter((param) => {
                        return param.nm_city === this.selected
                    })
                }else {
                    return this.$store.getters.getAgreement;
                }

            }
        },

        methods: {
           getAllCitys() {
               this.$http('agreement/cities')
               .then(res => {
                   if (res.status === 200) {
                       this.cities = res.data.result.cities;
                   }
               })
               .catch(err => {
                   err
               })
           },

            agreementFilter() {
                if (this.selected) {

                    this.$http.post('agreement/cities', {
                    'nm_city': this.selected
                    })
                    .then(res => {
                        if (res.status === 200) {
                            this.agreements = res.data.result.agreements
                        }
                    })
                    .catch(err => {
                        err
                    })
                }else {
                    this.filter = this.$store.getters.getAgreement;
                }
            }
        }


        
    }
</script>

<style scoped>
    h5 {
        margin-top: 10px;
    }
    
    .agreement-card {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }

     @media screen and (max-width: 1400px) {
        .agreement-title {
            width: 150px;
            height: 35px;
        }

        h5 {
            font-size: 16px;
            font-weight: bold;
        }

        a {
            font-weight: bolder;
            font-size: 12px;
        }
    }

    @media screen  and (max-width: 999px){

        h5 {
            font-size: 14px;
        }

        a {
            font-weight: bolder;
            font-size: 11px;
        }
        
    }

    @media screen and (max-width: 575px) {

        h5 {
            font-size: 10px;
        }

        a {
            font-weight: bolder;
            font-size: 10px;
        }
        
    }
</style>