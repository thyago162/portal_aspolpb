<template>
    <b-modal id="cp-associated" title="Associados" size="xl" hide-footer 
        header-bg-variant="info" header-text-variant="light">
        <b-container>
            <b-row>
                <b-col lg="5">

                    <b-input-group>
                            <template v-slot:prepend>
                                <b-input-group-text>
                                    <b-icon icon="search"></b-icon>
                                </b-input-group-text>
                            </template>
                        <b-form-input v-model="search" />
                    </b-input-group>
                 </b-col>
  
            </b-row>
            <b-row class="mt-3">
                <b-col>
                    <b-table :fields="fields"  :items="associated">
                        <template v-slot:cell(show_details)="row" hover striped>
                            <b-button size="sm" @click="row.toggleDetails" class="mr-2">
                            {{ row.detailsShowing ? 'Menos' : 'Mais'}} Detalhes
                            </b-button>

  
                        </template>

                        <template v-slot:row-details="row">
                            <b-card>
                                <b-row class="mb-2">
                                    <b-col>
                                        <h5><b>Dados Pessoais</b></h5>
                                        <p><b>Rg:</b> {{row.item.nu_rg}}</p>
                                        <p><b>Sexo:</b> {{row.item.ch_sex}}</p>
                                        <p><b>Aniversário:</b> {{row.item.dt_birthday | date}}</p>
                                        <p><b>Estado civil:</b> {{row.item.nm_civil_state}}</p>
                                        <p><b>Escolaridade:</b> {{row.item.nm_education_level}}</p>
                                    </b-col>

                                    <b-col>
                                        <h5><b>Dados Profissionais</b></h5>
                                        <p><b>Cargo:</b> {{row.item.nm_office}}</p>
                                        <p><b>Classe:</b> {{row.item.nm_office_class}}</p>
                                        <p><b>Lotação (Superintendência):</b> {{row.item.nm_super_stocking}}</p>
                                        <p><b>Lotação (Seccional):</b> {{row.item.nm_sectional_stocking}}</p>
                                        <p><b>Unidade de trabalho:</b> {{row.item.nm_work_unit}}</p>
                                        <p><b>Município do trabalho:</b> {{row.item.nm_municipality_work_unit}}</p>
                                    </b-col>

                                    <b-col>
                                        <h5><b>Endereço</b></h5>
                                        <p><b>Rua:</b> {{row.item.nm_street}}, Nº {{row.item.nu_number}} - {{row.item.nm_complement}}</p>
                                        <p><b>Bairro:</b> {{row.item.nm_neighbohood}}</p>
                                        <p><b>Cidade:</b> {{row.item.nm_city}} - {{row.item.nm_uf}}</p>
                                        <p><b>Cep:</b> {{row.item.nm_cep}}</p>
                                    </b-col>
                            
                                </b-row>
                                <b-card-footer>

                                </b-card-footer>

                            </b-card>
                        </template>
                    </b-table>
                </b-col>
            </b-row>
        </b-container>
    </b-modal>
</template>

<script>
    export default {

        mounted() {
            this.$store.dispatch('associated', this.token);
        },

        data() {
            return {
                search: '',
                fields: [
                    {key: 'nu_registration', label: 'Registro'},
                    {key: 'nm_name', label: 'Nome'},
                    {key: 'nm_cpf', label: 'Cpf'},
                    {key: 'nm_email', label: 'Email'},
                    {key: 'nm_phone', label: 'Telefone'},
                    {key: 'show_details', label: ''},
                ]
            }
        },

        computed: {
            associated: function() {
                return this.$store.getters.getAssociated;
            },

            token: function() {
                return this.$session.get('jwt')
            }
        }
        
    }
</script>