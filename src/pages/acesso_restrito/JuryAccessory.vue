<template>
    <b-container fluid class="mb-3">
        <b-row class="header-title mt-3">
            <b-col class="title" lg="11">                
                <h5>ASSESSORIA JURÍDICA</h5>
            </b-col>
        </b-row>
        <b-row class="mt-4 align-body">
            <b-col lg="11">
                <div>
                    <b-card no-body>
                        <b-tabs card>
                        <b-tab title="Informação" active>
                            <b-row class="">
                                <b-col lg="8">
                                    <div v-if="item.nm_name !='undefined'">
                                        <span>
                                            {{item.nm_name}} 
                                        </span>
                                        <b-button variant="default" size="sm" @click="openFile">
                                            <b-icon icon="download"></b-icon>
                                        </b-button>
                                    </div>
                                    
                                </b-col>
                                <b-col>
                                    <b-button :style="{float: 'right'}" v-b-modal.jury-accessory-form @click="resetModal()">
                                        <b-icon icon="pencil"></b-icon>
                                    </b-button>
                                </b-col>
                            </b-row>

                            <b-row class="mt-3" v-if="item.nm_content != 'undefined'">
                                <b-col v-html="item.nm_content"></b-col>
                            </b-row>                            
                            
                        </b-tab>
                        <b-tab title="Registro de demanda jurídica">
                            <b-row>
                                <b-col class="jury-accessory-form">
                                    <form  @submit.stop.prevent="sendForm">
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

                                        <b-button variant="danger" :style="{width: '100%'}" type="submit">
                                            ENVIAR
                                            <b-spinner small label="Small Spinner" class="ml-1" v-show="loading"></b-spinner>
                                        </b-button>
                                    </form>
                                </b-col>
                            </b-row>
                        </b-tab>
                        </b-tabs>
                    </b-card>
                </div>
            </b-col>
        </b-row>
        <Session ref="session"/>
        <JuryAccessoryForm :item="item" />
    </b-container>
</template>


<script>

    import JuryAccessoryForm from '../../components/jury-accessory/JuryAccesoryForm';
    import Session from '../../components/session/Session';

    export default {

        components: {
            JuryAccessoryForm,
            Session,
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
                           this.$refs.session.$refs.session.show();
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

            resetModal() {
                this.item.nm_content = '';
                this.item.nm_name = '';
                this.item.nm_file_path = '';
            }
        },

    }
</script>

<style scoped>
    .jury-accessory-form {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .jury-accessory-form form {
        width: 60%;
    }

    h5 {
        margin-top: 10px;
    }

    @media screen and (max-width: 414px) {
        
        .jury-accessory-form {
            justify-content: center;
            align-items: center;
        }

        .jury-accessory-form form {
            width: 100%;
        }
        
    }

</style>