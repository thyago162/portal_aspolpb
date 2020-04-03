<template>
   <b-modal id="form-file" ref="formfile" size="md" title="Adicionar arquivo"
    header-bg-variant="success" header-text-variant="light" @ok="handleOk" ok-only >

        <template v-slot:modal-footer="{ok}">
             <b-button variant="danger" size="md" @click="ok()">
                <span :style="{fontWeight: 'bolder'}">Salvar</span>
                <b-spinner small label="Small Spinner" class="ml-1" v-show="loading"></b-spinner>
            </b-button>
        </template>

        <ErroMessage :errors="errors" :visibility="visibility" />
        <Session :countdown="countdown" />

        <b-form @submit.stop.prevent="formSubmited">
            <b-form-group label="Nome do arquivo">
                <b-form-input type="text" v-model="form.nm_name" />
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
    import Session from '../session/Session';
    export default {

        props: ['item'],

        components: {
            ErroMessage,
            Session
        },

        data() {
            return {
                file: null,
                visibility: false,
                loading: false,
                countdown: 0,
                errors: [],
                value: ''
            }
        },

        computed: {
            token() {
                return this.$store.getters.getToken;
            },

            form: function() {
                return this.item;
            }
        },

        methods: {

            handleOk(bvModalEvt){
                bvModalEvt.preventDefault();
                this.formSubmited();
            },

           formSubmited() {
               this.loading = true;

                if (!this.form.id_file) {
                    this.save();

                } else {
                    alert('vai atualizar')
                    this.update();

                }
           },

           save() {
                let formData = new FormData();
                formData.append('nm_name',this.form.nm_name);
                formData.append('nm_file_path',this.form.nm_file_path);

                this.$http.post('file',formData, {
                    headers: {
                        Authorization: 'Bearer '+this.token,
                       }
                   })
                .then(res => {

                    if (res.status === 200 ){

                        if (res.data.token_failure) {
                            this.countdown = 3;
                        }

                        if (res.data.result.error) {
                            this.errors.push(Object.values(res.data.result.error));
                            this.visibility = true;

                        } else {
                            this.$refs['formfile'].hide();
                            this.$store.disptach('file', this.token);
                        }  
                    }
                       
                })
                .catch(err => {
                    this.errors.push(err)
                })

           },

           update() {

               this.$http.put('file/'+this.form.id_file,{
                   'nm_name': this.form.nm_name,
                   'nm_file_path': this.form.nm_file_path
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

                        if (res.data.result.error) {
                            this.errors.push(Object.values(res.data.result.error));
                            this.visibility = true;

                        } else {
                            this.$refs['formfile'].hide();
                            this.$store.disptach('file', this.token);
                        }
                   }

               })
               .catch(err => {
                   this.errors.push(err)
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
                form.append('folder','public/file');

                this.$http.post('storage/save',form,{
                    headers: {
                        Authorization: 'Bearer '+this.token,
                        'Content-type': 'multipart/form-data'
                    }
                })
                .then(res => {

                    if (res.status === 200) {
                        this.form.nm_file_path = res.data.result.url;
                    }
                })
                .catch(err => {
                    this.erro = err;
                })
            },

            deleteImage() {

                let url = this.form.nm_file_path;

                let form = new FormData();
                form.append('url',url.replace('storage','public'));
                form.append('folder','public/file');

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

            }
        }
        
    }
</script>

<style scoped>

</style>