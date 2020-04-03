<template>
    <b-container fluid>
        <b-row :style="{width: '99%'}" class="ml-2">
            <b-col class="jury-accessory-head">
                <div class="jury-accessory-title">
                    <h5>ASSESSORIA JURÍDICA</h5>
                </div>
            </b-col>
        </b-row>
        <b-row class="mt-4">
            <b-col>
                <div>
                    <b-card no-body>
                        <b-tabs card>
                        <b-tab title="Informação" active>
                            <b-row class="">
                                <b-col lg="8">
                                    <span>
                                        {{item.nm_name}} 
                                    </span>
                                    <b-button variant="default" size="sm" @click="openFile">
                                        <b-icon icon="download"></b-icon>
                                    </b-button>
                                    
                                </b-col>
                                <b-col>
                                    <b-button :style="{float: 'right'}" v-b-modal.jury-accessory-form>
                                        <b-icon icon="pencil"></b-icon>
                                    </b-button>
                                </b-col>
                            </b-row>

                            <b-row class="mt-3">
                                <b-col v-html="item.nm_content"></b-col>
                            </b-row>                            
                            
                        </b-tab>
                        <b-tab title="Registro de demanda jurídica">
                            
                            <form  :style="{width: '60%'}">
                                <b-form-group>
                                    <b-form-radio-group></b-form-radio-group>
                                </b-form-group>

                                <b-form-group label="Nome completo">
                                    <b-form-input type="text"/>
                                </b-form-group>

                                <b-form-group label="Cidade/UF">
                                    <b-form-input />
                                </b-form-group>

                                <b-form-group label="E-mail">
                                    <b-form-input type="email" />
                                </b-form-group>

                                <b-form-group label="Nome completo">
                                    <b-form-textarea rows="10"></b-form-textarea>
                                </b-form-group>

                                <b-form-group label="Anexar arquivo">
                                    <b-form-file></b-form-file>
                                </b-form-group>

                                <b-button variant="success" :style="{width: '100%'}">ENVIAR</b-button>
                            </form>
                        </b-tab>
                        </b-tabs>
                    </b-card>
                </div>
            </b-col>
        </b-row>
        <JuryAccessoryForm :item="item" />
    </b-container>
</template>


<script>
    import JuryAccessoryForm from '../../components/jury-accessory/JuryAccesoryForm';
    export default {

        components: {
            JuryAccessoryForm
        },

        mounted() {
            this.$store.dispatch('juryAccessory',this.token);
        },

        computed: {
            token: function() {
                return this.$session.get('jwt');
            },

            item: function() {
                return this.$store.getters.getJuryAccessory;
            }
        },

        methods: {
            openFile() {
                window.open(this.item.nm_file_path.replace('public','storage'))
            }
        }

        
    }
</script>

<style scoped>
    .form-jury-accessory {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    h5 {
        margin-top: 10px;
    }

    .jury-accessory-head {
        margin-top: 20px;
        border-bottom: 3px solid red;
    }

    .jury-accessory-title {
        background: rgba(138,21,0,1);
        background: -moz-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -webkit-gradient(left top, right top, color-stop(0%, rgba(138,21,0,1)), color-stop(25%, rgba(186,35,15,1)), color-stop(71%, rgba(201,27,8,1)), color-stop(100%, rgba(240,31,12,1)));
        background: -webkit-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -o-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -ms-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: linear-gradient(to right, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8a1500', endColorstr='#f01f0c', GradientType=1 );
        width: 250px;
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