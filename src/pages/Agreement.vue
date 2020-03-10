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

           <b-col lg="2">
               <b-list-group >
                   <b-list-group-item button  @click="getAgreement('alimentação')" >Alimentação</b-list-group-item>
                   <b-list-group-item button @click="getAgreement('beleza')" >Beleza</b-list-group-item>
                   <b-list-group-item button @click="getAgreement('educação')" >Educação</b-list-group-item>
                   <b-list-group-item button @click="getAgreement('lazer')">Lazer</b-list-group-item>
                   <b-list-group-item button @click="getAgreement('saúde')" >Saúde</b-list-group-item>
                   <b-list-group-item button @click="getAgreement('serviços')" >Serviços</b-list-group-item>
                   <b-list-group-item button @click="getAgreement('transporte')" >Transporte</b-list-group-item>
                   <b-list-group-item button @click="getAgreement('vestuário')">Vesturário</b-list-group-item>
                   <b-list-group-item button @click="getAgreement('outros')">Outros</b-list-group-item>
               </b-list-group>
           </b-col>

           <b-col>
              <b-tabs>
                  <b-tab title="Campina Grande" :style="{overflow: 'auto'}">
                      <div v-for="(item, index) in agreement" :key="index">
                          <AgreementCard v-if="item.nm_city == 'Campina Grande'" :item="item" />
                      </div>
                  </b-tab>
                  <b-tab title="João Pessoa" :style="{overflow: 'auto'}">
                      <div v-for="(item, index) in agreement" :key="index">
                          <AgreementCard v-if="item.nm_city == 'João Pessoa'" :item="item" />
                      </div>
                  </b-tab>
              </b-tabs>
               
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
            this.getAgreement();
        },

        data() {
            return {
                agreement: []
            }

        },

        methods: {
            getAgreement(param) {
                !param ? param = 'alimentação' : ''
                this.$http.post('agreement/category',{
                    'nm_category': param
                })
                .then(res => {
                    if (res.status === 200) {
                        this.agreement = res.data.result.category;
                    }
                })
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
</style>