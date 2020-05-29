<template>
   <div>
       <b-modal id="form-agreement" ref="agreement" title="CONVÊNIOS" size="lg" 
        header-bg-variant="dark" header-value-variant="light" @ok="handleOk" header-text-variant="light">

        <template v-slot:modal-footer="{ok}">
            <b-button @click="preview()" v-if="formControl > 1" variant="primary">Anterior</b-button>
            <b-button @click="next()" v-if="formControl < 4" variant="primary">Próximo</b-button>
            <div v-if="formControl === 4">
                <b-button variant="danger" size="md" @click="ok()">
                    <span :style="{fontWeight: 'bolder'}">Salvar</span>
                    <b-spinner small label="Small Spinner" class="ml-1" v-show="loading"></b-spinner>
                </b-button>
            </div>
            
        </template>

           <form @submit.stop.prevent="formSubmited">
               <b-container>
                    <b-row>
                       
                       <b-col v-if="formControl == 1"> 
                            <b-form-group label="Categoria">
                                <b-form-select v-model="form.nm_category" :options="options"></b-form-select>
                            </b-form-group>
                           <b-form-group label="Nome">
                               <b-form-input type="text" v-model="form.nm_title" placeholder="Nome da empresa convêniada"/>
                           </b-form-group>
                           
                           <b-form-group label="Contrato">
                               <b-form-file accept="application/pdf" v-model="doc" 
                                :state="Boolean(file)" ></b-form-file>
                           </b-form-group>

                           <b-form-group label="Site">
                               <b-form-input v-model="form.nm_link" placeholder="Site da empresa, com http" />
                           </b-form-group>

                            <b-form-group label="Instagram">
                               <b-form-input v-model="instagram" type="text" placeholder="Instagram da empresa" />
                           </b-form-group>

                            <b-form-group label="Facebook">
                               <b-form-input v-model="facebook" type="text" />
                           </b-form-group>

                            <b-form-group label="Twitter">
                               <b-form-input v-model="twitter" type="text" />
                           </b-form-group>
                       </b-col>
                       <b-col v-if="formControl == 2">
                          
                           <b-form-group label="Conteúdo">
                               <VueEditor :editorToolbar="customToolbar" 
                               v-model="form.nm_content"/>
                           </b-form-group>
                       </b-col>

                       <b-col v-if="formControl == 3">

                            <h5>Endereço</h5>

                            <b-form-group>
                                <b-form-checkbox name="checkbox-1" :value="0" :unchecked-value="1" v-model="address">
                                    Não possui endereço?
                                </b-form-checkbox>
                            </b-form-group>

                            <div v-if="address == 1">

                                <b-form-group label="Cep">
                                    <b-input-group>
                                        <b-form-input trim placeholder="Apenas números" 
                                            v-model="form.nm_cep" type="text"/>
                                        <b-input-group-append>
                                            <b-button variant="default" @click="searchCep">
                                                <b-icon icon="search" ></b-icon>
                                                Buscar
                                                <b-spinner small label="Small Spinner" class="ml-1" v-show="loadingAddress"></b-spinner>
                                            </b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                </b-form-group>

                                <b-form-group label="Rua">
                                    <b-form-input v-model="form.nm_street" />
                                </b-form-group>

                                <b-form-group label="Número">
                                    <b-form-input v-model="form.nu_number" type="number" min="0"/>
                                </b-form-group>

                                <b-form-group label="Complemento">
                                    <b-form-input placeholder="Ex: apt 000" v-model="form.nm_complement"/>
                                </b-form-group>

                                <b-form-group label="Bairro">
                                    <b-form-input v-model="form.nm_neighbohood" />
                                </b-form-group>

                                <b-form-group label="Cidade">
                                    <b-form-input v-model="form.nm_city" />
                                </b-form-group>

                                <b-form-group label="UF">
                                    <b-form-input placeholder="Ex: PB" v-model="form.nm_uf"></b-form-input>
                                </b-form-group>
                            </div>

                       </b-col>

                       <b-col v-if="formControl == 4" >

                            <Image-Upload 
                                :id="item.id_agreement" 
                                folder="public/agreement" 
                                :path="item.nm_image_path" 
                                size="150x120"
                            />
                            <span v-if="form.nm_image_path">
                                {{form.nm_image_path | fileName }} 
                                <b-button size="sm" variant="default" @click="deleteImage()"> 
                                    <b-icon icon="trash" variant="danger" /> 
                                </b-button>
                            </span>

                            <b-row>
                                <b-col>
                                    <b-img v-if="form.nm_image_path" :src="form.nm_image_path"></b-img>
                                </b-col>
                            </b-row>

                       </b-col>
                    </b-row>
                  
                </b-container>
            </form>
        </b-modal>

       <SessionOff ref="session" />
       <ModalError ref="error" :errors="errors" />

   </div>
</template>

<script>

    import SessionOff from '../session/Session';
    import { VueEditor } from 'vue2-editor';
    import ModalError from '../error/ModalError';
    import ImageUpload from '../image/ImageUpload';

    export default {

        mounted() {
            this.splitSocialNetwork();
            this.hasAddress();
        },

        props: ['item'],

        components: {
            VueEditor,
            SessionOff,
            ModalError,
            ImageUpload
        },

        computed: {

            form: function() {
                return this.item;
            },

            token: function() {
                return this.$session.get('jwt');
            },

            file: function() {
                return this.$store.getters.getImage
            },
            
        },
        data() {
            return {
                loading: false,
                doc: null,
                formControl: 1,
                errors: {},
                instagram: ' ',
                facebook: ' ',
                twitter: ' ',
                socialNetworks: '',
                customToolbar: [
                    [{ 'font': [] }],
                    [{ 'header': [false, 1, 2, 3, 4, 5, 6, ] }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
                    [{ 'header': 1 }, { 'header': 2 }],
                    ['blockquote', 'code-block'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
                    [{ 'script': 'sub'}, { 'script': 'super' }],
                    [{ 'indent': '-1'}, { 'indent': '+1' }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'direction': 'rtl' }],
                    ['clean'],
                ],
                options: [
                    {value: 'Alimentação', text: 'Alimentação'},
                    {value: 'Beleza', text: 'Beleza'},
                    {value: 'Educação', text: 'Educação'},
                    {value: 'Lazer', text: 'Lazer'},
                    {value: 'Saúde', text: 'Saúde'},
                    {value: 'Serviços', text: 'Serviços'},
                    {value: 'Transporte', text: 'Transporte'},
                    {value: 'Vestuário', text: 'Vestuário'},
                    {value: 'Outros', text: 'Outros'}
                ],
                loadingAddress: false,
                address: 1
            }
        },

        methods: {
            splitSocialNetwork() {
                if (this.form.nm_social_network_link) {
                    this.socialNetworks = this.form.nm_social_network_link.split(',');
                    this.instagram = this.socialNetworks[1]
                    this.facebook = this.socialNetworks[0]
                    this.twitter = this.socialNetworks[2]
                }
            },

            handleOk(bvEvtModal) {
                bvEvtModal.preventDefault();
                this.joinSocialNetworkLinks();
                this.formSubmited();
            },

            formSubmited() {
                this.loading = true;
                this.save();
            },

            save() {
               
               let form = this.fillForm()

                this.$http.post('agreement',form, {
                    headers: {
                        Authorization: 'Bearer '+this.token,
                        'Content-type': 'Multipart/form'
                    }
                })
                .then(res => {
                    if(res.status === 200) {
                        this.loading = false;

                        if (res.data.token_failure) {
                           this.$refs.session.$refs.session.show()
                        }
                        if (res.data.result.error) {
                            this.$refs.error.$refs['modal-error'].show();
                            this.errors = res.data.result;

                        }else {
                            this.$store.dispatch('agreement');
                            this.$refs['agreement'].hide();
                            this.formControl = 1;
                            this.address = 1;
                        }
                        
                    }
                })
            },

            fillForm() {
                let form = new FormData();
                form.append('id_agreement', this.form.id_agreement);
                form.append('nm_title',this.form.nm_title);
                form.append('nm_content',this.form.nm_content);
                form.append('nm_image_path', this.form.nm_image_path);
                form.append('nm_file_path', this.form.nm_file_path);
                form.append('nm_link',this.form.nm_link);
                form.append('nm_social_network_link', this.form.nm_social_network_link);
                form.append('nm_category',this.form.nm_category);
                form.append('nm_city', this.form.nm_city);
                form.append('nm_cep',this.form.nm_cep);
                form.append('nm_street',this.form.nm_street);
                form.append('nu_number', this.form.nu_number);
                form.append('nm_neighbohood', this.form.nm_neighbohood);
                form.append('nm_complement',this.form.nm_complement);
                form.append('nm_uf',this.form.nm_uf);
                form.append('file', this.file);
                form.append('doc', this.doc);
                form.append('has_address', this.address);

                return form;

            },
            
            joinSocialNetworkLinks() {
                this.form.nm_social_network_link = this.instagram + ',' +
                this.facebook + ',' + this.twitter
            },

            searchCep() {
                this.loadingAddress = true;
                let cep = this.form.nm_cep

                this.$http('http://viacep.com.br/ws/'+cep+'/json/')
                .then(res => {
                    if (res.status === 200) {
                        let result = res.data;
                        this.form.nm_street = result.logradouro;
                        this.form.nm_complement = result.complemento;
                        this.form.nm_neighbohood = result.bairro;
                        this.form.nm_city = result.localidade;
                        this.form.nm_uf = result.uf

                        this.loadingAddress = false;
                    }
                })

            },
            next() {
                if (this.formControl <= 4) {
                    parseInt (this.formControl += 1)
                }
            },

            preview() {
                if (this.formControl > 1) {
                    parseInt(this.formControl -= 1)
                }
            },

            deleteImage() {
                let formData = new FormData()

                formData.append('table', 'agreements');
                formData.append('field', 'nm_image_path')
                formData.append('id', this.form.id_agreement);
                formData.append('image_path', this.form.nm_image_path);
                formData.append('folder', 'public/agreement');

                this.$http.post('storage/delete',formData, {
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        this.form.nm_image_path = ''
                    }
                })
            },


            hasAddress() {
                this.item.nm_cep != null ? 
                this.address = 1 : 
                this.address = 0
            }


        }
        
    }
</script>