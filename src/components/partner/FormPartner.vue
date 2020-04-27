<template>
   <b-modal id="form-partner" ref="formpartner" size="md" title="Adicionar parceiro"
    header-bg-variant="danger" header-text-variant="light" @ok="handleOk" ok-only @hide="resetModal">

        <template v-slot:modal-footer="{ok}">
            <b-button variant="danger" size="md" @click="ok()">
                <span :style="{fontWeight: 'bolder'}">Salvar</span>
                <b-spinner small label="Small Spinner" class="ml-1" v-show="loading"></b-spinner>
            </b-button>
        </template>
        
        <b-form @submit.stop.prevent="formSubmited">

            <b-form-group label="Nome do parceiro">
                <b-form-input type="text" v-model="form.nm_title"/>
            </b-form-group>

            <b-form-group label="Link do site">
                <b-form-input type="text" v-model="form.nm_link" placeholder="http://www.exemplo.com" />
            </b-form-group>

            <b-form-group label="Image do parceiro">
                <b-form-file v-model="file" 
                    :state="Boolean(file)" @input="image"></b-form-file>
            </b-form-group>

        </b-form>
        <SessionOff ref="session"/>
        <ModalError :errors="errors" ref="error" />
   </b-modal>
</template>

<script>
    import SessionOff from '../session/Session';
    import ModalError from '../error/ModalError';

    export default {

        props: ['partner'],

        components: {
            SessionOff,
            ModalError
        },

        data() {
            return {
                file: null,
                visibility: false,
                loading: false,
                errors: {},
                validate:{
                    title: false,
                    file:  false
                },
               
            }
        },

        computed: {
            token() {
                return this.$session.get('jwt');
            },

            form: function() {
                return this.partner;
            }
        },

        methods: {

            handleOk(bvModalEvt){
                bvModalEvt.preventDefault();
                this.formSubmited();
            },

           formSubmited() {
                this.loading = true;

                if (!this.form.id_partner) {
                    this.save();

                } else {
                    this.update();
                }

           },

           save() {

                let formData = new FormData();
                formData.append('nm_title',this.form.nm_title);
                formData.append('nm_image_path',this.form.nm_image_path);
                formData.append('nm_link',this.form.nm_link);

                this.$http.post('partner',formData, {
                    headers: {
                        Authorization: 'Bearer '+this.token,
                        'Content-Type': 'multipart/form-data'
                       }
                   })
                .then(res => {
                    if (res.status === 200 ){

                        this.loading = false;
                        this.visibility = false;

                        if (res.data.token_failure) {
                           this.$refs.session.$refs.session.show()
                        }

                        if(res.data.result.error) {
                            this.errors = res.data.result
                            this.$refs.error.$refs['modal-error'].show()

                        }else {
                            this.$refs['formpartner'].hide()
                            this.$store.dispatch('partners')
                        }
                        
                    }
                       
                })
           },

           update() {

               this.$http.put('partner/'+this.form.id_partner,{
                   'nm_title': this.form.nm_title,
                   'nm_link': this.form.nm_link,
                   'nm_image_path': this.form.nm_image_path
               },{
                   headers: {
                       Authorization: 'Bearer '+this.token
                   }
               })
               .then(res => {

                   if (res.status === 200) {

                        this.loading = false;
                        this.visibility = false;

                        if (res.data.token_failure) {
                           this.$refs.session.$refs.session.show()
                        }

                        if(res.data.result.error) {
                            this.errors.messages = res.data.result.error,
                            this.errors.code = res.data.result.code,
                            this.visibility = true;

                        }else {
                            this.$refs['formpartner'].hide()
                            this.$store.dispatch('partners')
                        }
                   }

               })

           },

           image() {

               if (this.file) {

                   this.saveImage();

               } else {
                   
                   this.deleteImage();
               }
               
           },

            saveImage() {

                let form = new FormData();

                form.append('file',this.file);
                form.append('folder','public/partner');

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
                        this.form.nm_image_path = image;
                    }
                    
                })
                .catch(err => {
                    this.erro = err;
                })

            },

            deleteImage() {

                let url = this.form.nm_image_path;

                let form = new FormData();
                form.append('url',url.replace('storage','public'));
                form.append('folder','public/partner');

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

            resetModal() {
                this.visibility = false;
                this.errors = [];
            },
        }
        
    }
</script>

<style scoped>

</style>