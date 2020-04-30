<template>
    <div>
        <Bar :chart-data="datacollection" v-if="loaded"/>
    </div>
</template>

<script>
    import Bar from '../../charts/Bar';
    export default {
        components: {
            Bar
        },

        created() {
            this.$store.dispatch('agreement');
        },

        mounted() {
            this.fillChart()
        },

        data() {
            return {
                datacollection: null,
                loaded: false,
                categorys: [
                    'Alimentação', 'Beleza', 'Educação', 'Lazer','Saúde',
                    'Serviços','Transporte','Vestuário','Outros'
                ],
                category: ''
            }
        },

        computed: {
            agreement: function() {
                return this.$store.getters.getAgreement
            },

            dataChart: function() {
                let array = [];
                let result;
                let vm = this;

                this.categorys.forEach(element => {

                    vm.category = element;
                    result = this.agreement.filter((param) => {
                        return param.nm_category == vm.category
                    })
                    array.push(result.length)
                });

                return array;
            }
        },

        methods: {
            fillChart() {
                this.datacollection = {
                   labels: this.categorys,
                   datasets: [
                       {
                           label: 'Convênio por categoria',
                           backgroundColor: 'blue',
                           data: this.dataChart
                       }
                   ] 
                },
                this.loaded = true;
            }
        }
        
    }
</script>