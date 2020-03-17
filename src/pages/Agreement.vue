<template>
    <b-container fluid class="agreement mb-4">

        <b-row class="agreement-head">
            <b-col>
                <div class="agreement-title">
                    <h5>CONVÊNIOS</h5>
                </div>
            </b-col>
        </b-row>

        <b-row class="mt-4">
            <b-col>
                <b-form inline :style="{float: 'right'}">
                    <b-form-group >
                        <span>Filtrar</span>
                        <b-form-select class="ml-3"  v-model="selected" >
                            <b-form-select-option value=""></b-form-select-option>
                            <b-form-select-option v-for="(citie,index) in cities" 
                               :value="citie.nm_city" :key="index">
                                {{citie.nm_city}}
                            </b-form-select-option>
                        </b-form-select>
                    </b-form-group>
                </b-form>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <div class="agreement-card mt-3">
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
    .agreement {
        width: 95%;
    }

    .agreement-head {
        margin-top: 20px;
        border-bottom: 3px solid red;
    }

    .agreement-title {
        background: rgba(138,21,0,1);
        background: -moz-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -webkit-gradient(left top, right top, color-stop(0%, rgba(138,21,0,1)), color-stop(25%, rgba(186,35,15,1)), color-stop(71%, rgba(201,27,8,1)), color-stop(100%, rgba(240,31,12,1)));
        background: -webkit-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -o-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -ms-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: linear-gradient(to right, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8a1500', endColorstr='#f01f0c', GradientType=1 );
        width: 180px;
        height: 40px;
        color: white;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-left: -15px;
        margin-top: 10px;
    }

    .agreement-card {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>