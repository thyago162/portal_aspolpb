<template>
    <b-container>
        <b-row>
            <b-col >
                <h4>Dados pessoais</h4>
            </b-col>
            <b-col v-if="item.st_active === 0">
                <b-button-group :style="{float: 'right', marginBottom: '10px'}">
                    <b-button variant="success" @click="defer(item.id_associated)">
                        Deferir
                        <b-spinner small label="Small Spinner" class="ml-1" v-show="loading"></b-spinner>
                        </b-button>
                    <b-button variant="warning" v-b-modal.correct-data>Solicitar correção</b-button>
                </b-button-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-table stacked :fields="fields" :items="items">
                    <template v-slot:cell(ch_sex)="row">
                        <span >
                            {{row.item.ch_sex === 'M' ? 'Masculino' : 'Feminino'}} 
                        </span>
                        
                    </template>

                    <template v-slot:cell(dt_birthday)="row">
                        <span>
                            {{row.item.dt_birthday | date}}
                        </span>
                    </template>
                </b-table>
            </b-col>
        </b-row>
        <CorrectData :item="item" />
    </b-container>
</template>

<script>
    import CorrectData from './CorrectData';
    export default {
        props: ['item'],

        components: {
            CorrectData
        },

        computed: {
            items: function() {
                return [this.item]
            },

            token: function() {
                return this.$store.getters.getToken;
            }
        },

        data() {
            return {
                fields: [
                    {key: 'nu_rg', label: 'Rg'},
                    {key: 'ch_sex', label: 'Sexo'},
                    {key: 'dt_birthday', label: 'Data de nascimento'},
                    {key: 'nm_civil_state' , label: 'Estado civil'},
                    {key: 'nm_education_level', label: 'Escolaridade'},
                    {key: 'nm_office', label: 'Profissão'},
                    {key: 'nm_office_class', label: 'Classe'},
                    {key: 'nm_super_stocking', label: 'Lotação (Superintendência)'},
                    {key: 'nm_sectional_stocking', label: 'Lotação (Seccional)'},
                    {key: 'nm_work_unit', label: 'Unidade em que trabalha'},
                    {key: 'nm_municipality_work_unit', label: 'Município em que trabalha'},
                    {key: 'nm_cep', label: 'Cep'},
                    {key: 'nm_street', label: 'Rua'},
                    {key: 'nu_number', label: 'Número'},
                    {key: 'nm_complement', label: 'Complemento'},
                    {key: 'nm_neighbohood', label: 'Bairro'},
                    {key: 'nm_city', label: 'Cidade'},
                    {key: 'nm_uf', label: 'Estado'}

                ],
                errors: [],
                visibility: true,
                loading: false
            }
        },

        methods: {
            defer(id) {
                this.loading = true;
                this.$http.put('associated/defer/'+id, {
                    headers: {
                        Authoriazation: 'Bearer '+this.token
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        this.loading = false;
                        alert("Cadastro deferido.");
                    }
                })
                .catch(err => {
                    this.errors.push(err);
                    this.visibility = true;
                })
            },
        }
        
    }
</script>