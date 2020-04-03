<template>
    <b-modal id="warning-form" ref="warning-form" title="Novo item" 
       ok-only header-bg-variant="primary" header-text-variant="light" 
        ok-title="Salvar" @ok="handleOk" no-close-on-backdrop >

        <template v-slot:modal-footer="{ok}">      
            <b-button @click="ok()" variant="success" size="md">
                <span :style="{fontWeight: 'bolder'}">Salvar</span>
                <b-spinner class="ml-1" label="Spinning" small v-show="loading"></b-spinner>
            </b-button>
        </template>

        <ErroMessage :errors="errors" :visibility="visibility" />
        <Session :countdown="countdown" />

        <form @submit.stop.prevent="formSubmited">

            <b-form-group label="Imagem">
                <b-form-file v-model="file" :state="Boolean(file)" @input="image" />
            </b-form-group>
            

            <b-form-group label="Ativar">
                <b-form-radio-group v-model="form.st_status">
                    <b-form-radio :value="1" >Sim</b-form-radio>
                    <b-form-radio :value="0" >Não</b-form-radio>
                </b-form-radio-group>
            </b-form-group>
        </form>


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
                options: [
                    {text: 'Sim', value: 1},
                    {text: 'Não', value: 0}
                ],
                file: null,
                errors: [],
                visibility: false,
                loading: false,
                countdown: 0
            }
        },

        computed: {
            token: function() {
                return this.$session.get('jwt');
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
                if (!this.form.id_warning) {
                    this.save();
                }else {
                    this.update();
                }

            },

            save(){
                let form = new FormData();
                form.append('nm_image_path',this.form.nm_image_path);
                form.append('st_status',this.form.st_status);

                this.$http.post('warning',form,{
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {

                    if (res.status === 200 ) {
                        this.loading = false;

                        if (res.data.token_failure) {
                            this.countdown = 3;
                        }

                        if (res.status.result.error) {
                            this.errors.push(Object.values(res.status.result.error));
                            this.visibility = true;

                        }else {
                            this.$http.dispatch('warning');
                            this.$refs['warning-form'].hide();
                        }
                        
                    }
                })
                .catch(err => {
                    this.errors.push(err);
                })
            },

            update(){
                this.$http.put('warning/'+this.form.id_warning,{
                    'nm_image_path': this.form.nm_image_path,
                    'st_status': this.form.st_status
                },{
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {
                    if(res.status === 200) {
                        this.loading = false;

                         if (res.data.token_failure) {
                            this.countdown = 3;
                        }

                        if (res.status.result.error) {
                            this.errors.push(Object.values(res.status.result.error));
                            this.visibility = true;

                        }else {
                            this.$http.dispatch('warning');
                            this.$refs['warning-form'].hide();
                        }
                    }
                })
            },

            image() {

               if (this.file) {

                   if (this.item.nm_image_path) {
                       this.deleteImage();
                   }

                   this.saveImage();

               } else {
                   
                   this.deleteImage();
               }
               
           },

            saveImage() {

                let form = new FormData();

                form.append('file',this.file);
                form.append('folder','public/warning');

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
                form.append('folder','public/warning');

               this.$http.post('storage/delete',form,
                {
                   headers: {
                       Authorization: 'Bearer '+this.token
                   }
               })
    
            },
        }
        
    }
</script>