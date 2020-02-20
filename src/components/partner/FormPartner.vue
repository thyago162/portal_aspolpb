<template>
   <b-modal id="form-partner" ref="formpartner" size="md" title="Adicionar parceiro"
    header-bg-variant="danger" header-text-variant="light" @ok="handleOk">
        <b-form @submit.stop.prevent="formSubmited">
            <b-form-group label="Nome do parceiro">
                <b-form-input type="text" v-model="form.title"/>
            </b-form-group>

            <b-form-group label="Link do site">
                <b-form-input type="text" v-model="form.link" />
            </b-form-group>

            <b-form-group label="Image do parceiro">
                <b-form-file v-model="form.file" :state="Boolean(form.file)"></b-form-file>
            </b-form-group>

        </b-form>
   </b-modal>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    title: '',
                    file: null,
                    link: ''
                },
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
            }
        },

        methods: {
            validateTitle(){
                alert(this.form.title.length)
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
                   formData.append('nm_title',this.form.title);
                   formData.append('nm_image_path',this.form.file);
                   formData.append('nm_link',this.form.link);

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

           }
        }
        
    }
</script>

<style scoped>

</style>