<template>
   <b-modal id="campaign-form" ref="campaign-form" size="md" title="Adicionar arquivo"
    header-bg-variant="info" header-text-variant="light" @ok="handleOk" ok-only @hide="resetModal">

        <template v-slot:modal-footer="{ok}">
            <b-button variant="danger" size="md" @click="ok()">
                <span :style="{fontWeight: 'bolder'}">Salvar</span>
                <b-spinner small label="Small Spinner" class="ml-1" v-show="loading"></b-spinner>
            </b-button>
        </template>
        
        <b-form @submit.stop.prevent="formSubmited">

            <b-form-group label="Nome do arquivo">
                <b-form-input type="text" v-model="form.name" />
            </b-form-group>

            <b-form-group label="Arquivo">
                <b-form-file v-model="file" accept=".jpeg, jpg, png, bpm, .pdf, .odt, .doc*" 
                    :state="Boolean(file)" @input="image"></b-form-file>
            </b-form-group>

        </b-form>
        <SessionOff ref="session"/> 
        <ModalError ref="error" :errors="errors" />
   </b-modal>
</template>

<script>
    import ModalError from '../error/ModalError';
    import SessionOff from '../session/Session';

    export default {

        components: {
            ModalError,
            SessionOff
        },

        data() {
            return {
                file: null,
                visibility: false,
                errors: {},
                validate:{
                    title: false,
                    file:  false
                },
                loading: false,
                countdown: 0,
                form: {
                    nm_image_path: '',
                    name: ''
                }
            }
        },

        computed: {
            token() {
                return this.$store.getters.getToken;
            },
        },

        methods: {

            handleOk(bvModalEvt){
                bvModalEvt.preventDefault();
                this.formSubmited();
            },

           formSubmited() {
                this.loading = true;
                this.save();
           },

           save() {

                let formData = new FormData();
                formData.append('nm_name', this.form.name);
                formData.append('nm_file_path',this.form.nm_file_path);

                this.$http.post('campaign',formData, {
                    headers: {
                        Authorization: 'Bearer '+this.token,
                        'Content-Type': 'multipart/form-data'
                       }
                   })
                .then(res => {
                    if (res.status === 200 ){

                        this.loading = false

                        if (res.data.token_failure) {
                           this.$refs.session.$refs.session.show()
                        }

                        if(res.data.result.error) {
                            this.$refs.error.$refs['modal-error'].show();
                            this.errors = res.data.result;

                        }else {
                            this.$refs['campaign-form'].hide()
                            this.$store.dispatch('campaign')
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
                form.append('folder','public/campaign');

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
                        this.form.nm_file_path = image;
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
                form.append('folder','public/campaing');

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
                this.form.nm_image_path = '';
                this.form.name = '';
            }
        }
        
    }
</script>

<style scoped>

</style>