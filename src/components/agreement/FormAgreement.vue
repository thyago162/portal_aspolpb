<template>
   <div>
       <b-modal id="form-agreement" ref="agreement" title="CONVÊNIOS" size="xl" 
        header-bg-variant="dark" header-text-variant="light" @ok="handleOk">
           <form >
               <b-container>
                   {{form.nm_social_network_link}}
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
                           <b-form-group label="Cidade">
                               <b-form-select v-model="form.nm_city">
                                <b-form-select-option value="Campina Grande">Campina Grande</b-form-select-option>
                                <b-form-select-option value="João Pessoa" >João Pessoa</b-form-select-option>
                               </b-form-select>
                           </b-form-group>
                           <b-form-group label="Categorias">
                               <b-form-radio-group v-model="form.nm_category">
                                   <b-form-radio value="alimentação">Alimentação</b-form-radio>
                                   <b-form-radio value="beleza" >Beleza</b-form-radio>
                                   <b-form-radio value="educação">Educação</b-form-radio>
                                   <b-form-radio value="educação">Lazer</b-form-radio>
                                   <b-form-radio value="saúde">Saúde</b-form-radio>
                                   <b-form-radio value="educação">Serviços</b-form-radio>
                                   <b-form-radio value="transporte">Transporte</b-form-radio>
                                   <b-form-radio value="vestuário">Vestuário</b-form-radio>
                                   <b-form-radio value="outros">Outros</b-form-radio>
                               </b-form-radio-group>
                           </b-form-group>
                           <b-form-group label="Conteúdo">
                               <VueEditor :editorToolbar="customToolbar" 
                               v-model="form.nm_content"/>
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

                this.$http.post('agreement',form, {
                    headers: {
                        Authorization: 'Bearer '+this.token,
                        'Content-type': 'Multipart/form'
                    }
                })
                .then(res => {
                    if(res.status === 200) {
                        this.$store.dispatch('agreement');
                        this.$$refs['agreement'].hide();
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