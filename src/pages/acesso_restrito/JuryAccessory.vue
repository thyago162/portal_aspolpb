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
                            
                            <form  :style="{width: '60%'}" @submit.stop.prevent="sendForm">
                                <b-form-group>
                                    <b-form-radio-group></b-form-radio-group>
                                </b-form-group>

                                <b-form-group label="Nome completo">
                                    <b-form-input type="text" v-model="user.name" readonly required/>
                                </b-form-group>

                                <b-form-group label="Cidade/UF">
                                    <b-form-input required />
                                </b-form-group>

                                <b-form-group label="E-mail">
                                    <b-form-input type="email" readonly v-model="user.email" required/>
                                </b-form-group>

                                <b-form-group label="Descrição">
                                    <b-form-textarea rows="10" v-model="content"></b-form-textarea>
                                </b-form-group>

                                <b-form-group label="Anexar arquivo">
                                    <b-form-file v-model="file" :state="Boolean(file)" @input="saveImage"></b-form-file>
                                </b-form-group>

                                <b-button variant="success" :style="{width: '100%'}" type="submit">
                                    ENVIAR
                                    <b-spinner small label="Small Spinner" class="ml-1" v-show="loading"></b-spinner>
                                </b-button>
                            </form>
                        </b-tab>
                        </b-tabs>
                    </b-card>
                </div>
            </b-col>
        </b-row>
        <Session :countdown="countdown" />
        <JuryAccessoryForm :item="item" />
    </b-container>
</template>


<script>

    import JuryAccessoryForm from '../../components/jury-accessory/JuryAccesoryForm';
    import Session from '../../components/session/Session';

    export default {

        components: {
            JuryAccessoryForm,
            Session
        },

        mounted() {
            this.$store.dispatch('juryAccessory',this.token);
        },

        data() {
            return {
                countdown: 0,
                loading: false,
                file: null,
                content: '',
                filePath: ''
             
            }
        },

        computed: {
            token: function() {
                return this.$store.getters.getToken;
            },

            item: function() {
                return this.$store.getters.getJuryAccessory;
            },

            user: function() {
                return this.$session.get('user');
            },
        },

        methods: {
            openFile() {
                window.open(this.item.nm_file_path.replace('public','storage'))
            },

            sendForm(){
                this.loading = true;

                let form = new FormData();
                form.append('name', this.user.name);
                form.append('email', this.user.email);
                form.append('content', this.content);
                form.append('filePath', this.filePath);

                this.$http.post('jury-accessory/email',form, {
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        this.loading = false;

                        if (res.data.token_failure) {
                            this.countdown = 3;

                        }else {
                            alert('E-mail enviado com sucesso!')
                            location.reload()
                        }
                    }
                })
                .catch(err => {
                    alert(err)
                })
            },

            saveImage() {
                let form = new FormData();

                form.append('file',this.file);
                form.append('folder','public/temp');

                this.$http.post('storage/save',form,{
                    headers: {
                        Authorization: 'Bearer '+this.token,
                        'Content-type': 'multipart/form-data'
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        let image = res.data.result.url;
                        image = image.replace('public','storage')
                        this.filePath = image;
                    }
                        
                })
                .catch(err => {
                    this.erro = err;
                })

            },
        },

        
        
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