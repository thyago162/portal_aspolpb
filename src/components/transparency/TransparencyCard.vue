<template>
    <b-card>
        <b-card-header>
           <b-row>
               <b-col lg="7">
                    <b-card-title>
                        <b>Gestão -</b> {{item.nm_management_name}}
                        {{item.nu_start | date}} {{item.nu_end | date}}
                    </b-card-title>
               </b-col>
               <b-col lg="2">
                   <b-button :style="{float: 'right'}" variant="info" @click="showDetails" >Exibir detalhes</b-button>
               </b-col>
               <b-col lg="2">
                   <b-button :style="{float: 'right'}" variant="danger" v-b-modal.transparency-file-form 
                    @click="setProps(item.id_transparency)">Adicionar documento</b-button>
               </b-col>
               <b-col lg="1">
                   <b-button :style="{float: 'right'}" variant="warning">
                       <b-icon icon="pencil"></b-icon>
                   </b-button>
               </b-col>
           </b-row>
        </b-card-header>
        <b-card-body v-show="show">
            <b-row>
                <b-col>
                    <div v-html="item.nm_content"></div>
                </b-col>
                <b-col>
                    <h2 :style="{color: 'red'}">DOCUMENTOS</h2>
                    <hr>
                        <b-list-group>
                            <b-list-group-item button variant="info" @click="showCertidoes = !showCertidoes">
                                <span :style="{fontWeight: 'bold'}">CERTIDÕES</span>
                                <b-card no-body v-show="showCertidoes">
                                    <b-card-header class="mt-2">
                                        <b-link v-for="(item,index) in certidão" :key="index">
                                            {{item.nm_name}}
                                        </b-link>
                                    </b-card-header>
                                </b-card>
                            </b-list-group-item>

                            <b-list-group-item button  @click="showContabil = !showContabil">
                                <span :style="{fontWeight: 'bold'}">CONTABILIDADE</span>
                                <b-card no-body v-show="showContabil">
                                    <b-card-header class="mt-2">
                                        <b-link v-for="(item,index) in contabil" :key="index">
                                            {{item.nm_name}}
                                        </b-link>
                                    </b-card-header>
                                </b-card>
                            </b-list-group-item>

                            <b-list-group-item button variant="info"  @click="showFinanceiro = !showFinanceiro">
                                <span :style="{fontWeight: 'bold'}">FINANCEIRO</span>
                                <b-list-group v-show="showFinanceiro">
                                   <b-list-group-item v-for="(year, index) in years" :key="index" button>
                                       {{year}}
                                       <b-card no-body class="mt-2">
                                            <b-card-header>
                                                <div v-for="(item,index) in financeiro" :key="index">
                                                    <b-link  v-if="item.nu_year == parseInt(year)"  >
                                                        {{item.nm_name}}
                                                    </b-link>
                                                </div>
                                            </b-card-header>
                                        </b-card>
                                   </b-list-group-item>
                                </b-list-group>
                            </b-list-group-item>

                            <b-list-group-item button  @click="showOutros = !showOutros">
                                <span :style="{fontWeight: 'bold'}">OUTROS</span>
                                <b-card no-body v-show="showOutros" class="mt-2">
                                    <b-card-header>
                                        <b-link v-for="(item,index) in outros" :key="index">
                                            {{item.nm_name}}
                                        </b-link>
                                    </b-card-header>
                                </b-card>
                            </b-list-group-item>

                        </b-list-group>
                </b-col>
            </b-row>
        </b-card-body>
        <TransparencyFileForm :id="id"/>
    </b-card>
</template>

<script>

    import TransparencyFileForm from '../../components/transparency/TransparencyFileForm';

    export default {

        components: {
            TransparencyFileForm
        },

        props: ['item'],

        data() {
            return {
                show: false,
                id: '',
                start: '',
                end: '',
                files: [],
                showCertidoes: false,
                showContabil: false,
                showFinanceiro: false,
                showOutros: false
            }
        },

        computed: {
            token: function() {
                return this.$session.get('jwt');
            },

            contabil: function() {
                return this.files.filter((param) => {
                    return param.nm_type_doc == 'Contabilidade'
                })
            },

            outros: function() {
                return this.files.filter((param) => {
                    return param.nm_type_doc == 'Outros'
                })
            },

            financeiro: function() {
                return this.files.filter((param) => {
                    return param.nm_type_doc == 'Financeiro'
                })
            },

            certidão: function() {
                return this.files.filter((param) => {
                    return param.nm_type_doc == 'Certidão'
                })
            },

            years: function() {
                let arrayYears = new Array();

                let date = new Date();
                let endYear = !this.item.nu_end ? date.getFullYear() : this.item.nu_end;

                for (var i = this.item.nu_start; i <= endYear; i++) {
                    arrayYears.push(i);
                }

                return arrayYears.reverse();
            }
        },

        methods: {
            showDetails() {
                this.show = !this.show;
                this.getFiles()
            },

            setProps(id) {
                this.id = id;
            },

            getFiles() {
                this.$http('transparency-file/'+this.id, {
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        this.files = res.data.result.transparencyFile
                    }

                })
            },
        }
    }
</script>