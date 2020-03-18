<template>
    <b-modal size="lg" title="Editar" id="jury-accessory-form" ref="jury-accessory" 
        header-bg-variant="info" ok-title="Salvar" ok-only  header-text-variant="light" @ok="handleOk">
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
                return this.$session.get('jwt');
            },

            form() {
                return this.item;
            },
        },

        data() {
            return {
                errors: [],
                file: null
            }
        },

        methods: {
            handleOk: function(bvModalEvt) {
                bvModalEvt.preventDefault();
                this.formSubmited();
            },

            formSubmited() {
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

                        if (res.data.token) {
                            alert('Sessão expirou, você será redirecionado...')
                            this.$session.destroy();
                            this.$router.push('/')
                        }
                        this.$store.dispatch('juryAccessory')
                        this.$refs['jury-accessory'].hide();
                    }
                })
                .catch(err => {
                    err
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
                        this.$store.dispatch('juryAccessory');
                        this.$refs['jury-accerrory'].hide();
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