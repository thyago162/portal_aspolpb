<template>
   <b-modal id="form-partner" ref="formpartner" size="md" title="Adicionar parceiro"
    header-bg-variant="danger" header-text-variant="light" @ok="handleOk">
        <b-form @submit.stop.prevent="formSubmited">
            <b-form-group label="Nome do parceiro">
                <b-form-input type="text" v-model="form.nm_title"/>
            </b-form-group>

            <b-form-group label="Link do site">
                <b-form-input type="text" v-model="form.nm_link" />
            </b-form-group>

            <b-form-group label="Image do parceiro">
                <b-form-file v-model="file" 
                    :state="Boolean(file)" @input="image"></b-form-file>
            </b-form-group>

        </b-form>
   </b-modal>
</template>

<script>
    export default {

        props: ['partner'],

        data() {
            return {
                file: null,
                error: [],
                validate:{
                    title: false,
                    file:  false
                }
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

            validateTitle(){
                this.form.title.length > 0 ? 
                this.validate.title = true : 
                this.validate.title = false
            },
            validateFile() {
                this.form.file ? this.validate.file= true : 
                this.validate.file = false
            },

            validateForm() {
                this.validate.title && this.validate.file ? 
                this.validate.form = true : 
                this.validate.form = false
            },

            handleOk(bvModalEvt){
                bvModalEvt.preventDefault();
                 this.validateForm()
                this.formSubmited();
            },

           formSubmited() {

                //alert(this.validate.title)
                //alert(this.validate.file)

               //if (this.validate.form) {

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
                           this.$refs['formpartner'].hide()
                       }
                       
                   })
                   .catch(err => {
                       err.push()
                   })
               //}else {
                //   alert('Os campos devem ser preenchidos');
               //}

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
                        this.form.nm_image_path = res.data.result.url;
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

            }
        }
        
    }
</script>

<style scoped>

</style>