<template>
   <div>
       <b-modal id="form-agreement" ref="agreement" title="CONVÊNIOS" size="xl" 
        header-bg-variant="dark" header-value-variant="light" @ok="handleOk">
           <form @submit.stop.prevent="formSubmited">
               <b-container>
                   <b-row>
                       <b-col lg="5"> 
                           <b-form-group label="Nome">
                               <b-form-input type="text" v-model="form.nm_title" />
                           </b-form-group>
                           
                           <b-form-group label="Imagem">
                               <b-form-file accept=".jpg, .png" v-model="file" 
                                :state="Boolean(file)" @input="image('image')"></b-form-file>
                           </b-form-group>

                           <b-form-group label="Pdf">
                               <b-form-file accept="application/pdf" v-model="file" 
                                :state="Boolean(file)" @input="image('pdf')"></b-form-file>
                           </b-form-group>

                           <b-form-group label="Site">
                               <b-form-input v-model="form.nm_link" />
                           </b-form-group>

                            <b-form-group label="Instagram">
                               <b-form-input v-model="instagram" />
                           </b-form-group>

                            <b-form-group label="Facebook">
                               <b-form-input v-model="facebook" />
                           </b-form-group>

                            <b-form-group label="Twitter">
                               <b-form-input v-model="twitter"/>
                           </b-form-group>
                       </b-col>
                       <b-col lg="7">
                           <b-form-group label="Categoria">
                               <b-form-select v-model="form.nm_category" :options="options">
                                
                               </b-form-select>
                           </b-form-group>
                          
                           <b-form-group label="Conteúdo">
                               <VueEditor :editorToolbar="customToolbar" 
                               v-model="form.nm_content"/>
                           </b-form-group>
                       </b-col>
                   </b-row>
                   <b-row>
                       <b-col>
                           <hr />
                           <h5>Endereço</h5>
                           <hr />
                        </b-col>
                   </b-row>
                   <b-row>
                       <b-col xl="2">
                           <b-form-group label="Cep">
                               <b-form-input placeholder="Apenas números" v-model="form.nm_cep"/>
                           </b-form-group>
                       </b-col>
                       <b-col>
                           <b-form-group label="Rua">
                               <b-form-input v-model="form.nm_street" />
                           </b-form-group>
                       </b-col>
                       <b-col xl="1">
                           <b-form-group label="Número">
                               <b-form-input v-model="form.nu_number"/>
                           </b-form-group>
                       </b-col>
                       <b-col xl="3">
                           <b-form-group label="Complemento">
                               <b-form-input placeholder="Ex: apt 000" v-model="form.nm_complement"/>
                           </b-form-group>
                       </b-col>
                   </b-row>
                   <b-row>
                       <b-col xl="4">
                           <b-form-group label="Bairro">
                               <b-form-input v-model="form.nm_neighbohood" />
                           </b-form-group>
                       </b-col>
                       <b-col xl="3">
                           <b-form-group label="Cidade">
                               <b-form-input v-model="form.nm_city" />
                           </b-form-group>
                       </b-col>
                       <b-col xl="1">
                           <b-form-group label="UF">
                               <b-form-input placeholder="Ex: PB" v-model="form.nm_uf"></b-form-input>
                           </b-form-group>
                       </b-col>
                   </b-row>
                 
               </b-container>
           </form>
       </b-modal>
   </div>
</template>

<script>
    import { VueEditor } from 'vue2-editor';
    export default {

        mounted() {
            this.splitSocialNetwork()
        },

        props: ['item'],

        components: {
            VueEditor
        },

        computed: {
            form: function() {
                return this.item;
            },
            token: function() {
                return this.$session.get('jwt');
            }
            
        },
        data() {
            return {
                file: null,
                errors: [],
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
                ]
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

                if (!this.form.id_agreement) {
                    this.save();
                }else {
                    this.update()
                }

            },

            save() {
                let form = new FormData();
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
                form.append('nm_city', this.form.nm_city);
                form.append('nm_uf',this.form.nm_uf);

                this.$http.post('agreement',form, {
                    headers: {
                        Authorization: 'Bearer '+this.token,
                        'Content-type': 'Multipart/form'
                    }
                })
                .then(res => {
                    if(res.status === 200) {
                        if (res.data.token) {
                            alert('Sessão expirada... Você será redirecionado!')
                            this.$session.destroy();
                            this.$store.disptach('logout');
                            this.$router.push('/');
                        }
                        this.$store.dispatch('agreement');
                        this.$refs['agreement'].hide();
                    }
                })
            },
            update(id){

                this.$http.put('agreement'+id,{
                    'nm_title': this.form.nm_title,
                    'nm_content': this.form.nm_content,
                    'nm_image_path': this.form.nm_image_path,
                    'nm_file_path': this.form.nm_file_path,
                    'nm_link': this.form.nm_link,
                    'nm_social_network_link': this.form.nm_social_network_link,
                    'nm_category': this.form.nm_category,
                    'nm_city': this.form.nm_city
                },{
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {
                    if(res.status === 200) {
                        this.$store.dispatch('agreement');
                        this.$refs['agreement'].hide();
                    }
                })
            },

            image(param) {

                if ( this.file ) {

                    this.saveImage(param);
                    
                } else {
                    
                    this.deleteImage();
                }
            },

            saveImage(param) {
                let form = new FormData();

                form.append('file',this.file);
                form.append('folder','public/agreement/'+param);

                this.$http.post('storage/save',form,{
                    headers: {
                        Authorization: 'Bearer '+this.token,
                        'Content-type': 'multipart/form-data'
                    }
                })
                .then(res => {

                    if (res.status === 200) {

                        param === 'image' ?
                        this.form.nm_image_path = res.data.result.url.replace('public','storage') :
                        this.form.nm_file_path = res.data.result.url.replace('public','storage')
                    }
                    
                })
                .catch(err => {
                    this.erro = err;
                })

            },

            deleteImage(param) {

                let url = this.form.nm_image_path.replace('http://localhost:8080/','')

                let form = new FormData();
                form.append('url',url.replace('storage','public'));
                form.append('folder','public/agreement/'+param);

               this.$http.post('storage/delete',form,
                {
                   headers: {
                       Authorization: 'Bearer '+this.token
                   }
               })
               .then(res => {
                   
                   if (res.status === 200) {
                       alert('Imagem removida');
                   }
               })

            },
            joinSocialNetworkLinks() {
                this.form.nm_social_network_link = this.instagram + ',' +
                this.facebook + ',' + this.twitter
            }
        }
        
    }
</script>