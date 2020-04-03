<template>
   <b-modal id="form-partner" ref="formpartner" size="md" title="Adicionar parceiro"
    header-bg-variant="danger" header-text-variant="light" @ok="handleOk" ok-only @hide="resetModal">

        <template v-slot:modal-footer="{ok}">
            <b-button variant="danger" size="md" @click="ok()">
                <span :style="{fontWeight: 'bolder'}">Salvar</span>
                <b-spinner small label="Small Spinner" class="ml-1" v-show="loading"></b-spinner>
            </b-button>
        </template>

        <ErroMessage :errors="errors" :visibility="visibility" />
        <Session :countdown="countdown" />
        
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
   </b-modal>
</template>

<script>
    import ErroMessage from '../error/ErrorMessage';
    import Session from '../session/Session'
    export default {

        props: ['partner'],

        components: {
            ErroMessage,
            Session
        },

        data() {
            return {
                file: null,
                visibility: false,
                errors: [],
                validate:{
                    title: false,
                    file:  false
                },
                loading: false,
                countdown: 0
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

                        this.loading = false

                        if (res.data.token_failure) {
                           this.countdown = 3;
                        }

                        if(res.data.result.error) {
                            this.errors.push(Object.values(res.data.result.error));
                            this.visibility = true;

                        }else {
                            this.$refs['formpartner'].hide()
                            this.$store.dispatch('partners')
                        }
                        
                    }
                       
                })
                .catch(err => {
                    this.loading = false;
                    this.errors.push(err)
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
                        if (res.data.token_failure) {
                           this.countdown = 3;
                        }

                        if(res.data.result.error) {
                            this.errors.push(Object.values(res.data.result.error));
                            this.visibility = true;

                        }else {
                            this.$refs['formpartner'].hide()
                            this.$store.dispatch('partners')
                        }
                   }

               })
               .catch(err => {
                   this.loading = false;
                   this.errors.push(err)
                   this.visibility = true;
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
            }
        }
        
    }
</script>

<style scoped>

</style>