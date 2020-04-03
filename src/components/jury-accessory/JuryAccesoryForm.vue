<template>
    <b-modal size="lg" title="Editar" id="jury-accessory-form" ref="jury-accessory" 
        header-bg-variant="info" ok-title="Salvar" ok-only  header-text-variant="light" @ok="handleOk">

        <template v-slot:modal-footer="{ok}">
            <b-button variant="danger" size="md" @click="ok()">
                <span :style="{fontWeight: 'bolder'}">Salvar</span>
                <b-spinner small label="Small Spinner" class="ml-1" v-show="loading"></b-spinner>
            </b-button>
        </template>

        <form @submit.stop.prevent="formSubmited">
            <b-form-group label="Conteúdo">
                <VueEditor v-model="form.nm_content"/>
            </b-form-group>

            <b-form-group label="Nome do arquivo">
                <b-form-input v-model="form.nm_name" />
            </b-form-group>

            <b-form-group label="Arquivo">
                <b-form-file v-model="file" :state="Boolean(file)" 
                    @input="image"></b-form-file>
                    {{form.nm_file_path}}
            </b-form-group>

        </form>

    </b-modal>
</template>

<script>
    import { VueEditor } from 'vue2-editor';
    export default {

        props: ['item'],

        components: {
            VueEditor
        },

        computed: {

            token() {
                return this.$store.getters.getToken;
            },

            form() {
                return this.item;
            },
        },

        data() {
            return {
                errors: [],
                file: null,
                loading: false
            }
        },

        methods: {
            handleOk: function(bvModalEvt) {
                bvModalEvt.preventDefault();
                this.formSubmited();
            },

            formSubmited() {
                this.loading = true;

                if (!this.form.id_jury_accessory) {
                    this.save()
                }else {
                    this.update();
                }
            },

            save(){
                let form = new FormData();
                form.append('nm_name',this.form.nm_name);
                form.append('nm_content',this.form.nm_content);
                form.append('nm_file_path',this.form.nm_file_path);
            
                this.$http.post('jury-accessory',form,{
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

                        if (res.data.result.error) {
                            this.errors.push(Object.values(res.data.result.error))
                            this.visibility = true;

                        } else {
                            this.$store.dispatch('juryAccessory')
                            this.$refs['jury-accessory'].hide();
                        }
                    }
                    this.loading = false
                })
                .catch(err => {
                    this.loading = false
                    this.errors.push(err);
                })
            },
            update(){

                this.$http.put('jury-accessory/'+this.form.id_jury_accessory,{
                    'nm_name': this.form.nm_name,
                    'nm_content': this.form.nm_content,
                    'nm_file_path': this.form.nm_file_path,
                },{
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {
                    if(res.status === 200) {
                        if (res.data.token_failure) {
                            this.countdown = 3;
                        }

                        if (res.data.result.error) {
                            this.errors.push(Object.values(res.data.result.error))
                            this.visibility = true;

                        } else {
                            this.$store.dispatch('juryAccessory')
                            this.$refs['jury-accessory'].hide();
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
                form.append('folder','public/jury-accessory');

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

                let url = this.form.nm_image_path;

                let form = new FormData();
                form.append('url',url.replace('storage','public'));
                form.append('folder','public/jury-accessory');

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