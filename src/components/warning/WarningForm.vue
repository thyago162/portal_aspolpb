<template>
    <b-modal id="warning-form" ref="warning-form" title="Novo item" 
       ok-only header-bg-variant="primary" header-text-variant="light" ok-title="Salvar" @ok="handleOk">

        <form @submit.stop.prevent="formSubmited">
            <b-form-group label="Titulo">
                <b-form-input type="text" v-model="form.nm_title"/>
            </b-form-group>

            <b-form-group label="Subtitulo">
                <b-form-input type="text" v-model="form.nm_subtitle" />
            </b-form-group>

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
    export default {

        props: ['item'],

        data() {
            return {
                options: [
                    {text: 'Sim', value: 1},
                    {text: 'Não', value: 0}
                ],
                file: null
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

                if (!this.form.id_media) {
                    this.save();
                }else {
                    this.update();
                }

            },

            save(){
                let form = new FormData();
                form.append('nm_title',this.form.nm_title);
                form.append('nm_subtitle',this.form.nm_subtitle);
                form.append('nm_image_path',this.form.nm_image_path);
                form.append('st_status',this.form.st_status);

                this.$http.post('warning',form,{
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {

                    if (res.status === 200 ) {
                        this.$http.dispatch('media')
                        this.$refs['warning-form'].hide();
                    }
                })
                .catch(err => {
                    err
                })
            },
            update(){

                this.$http.put('warning/'+this.form.id_media,{
                    'nm_title': this.form.nm_title,
                    'nm_subtitle': this.form.nm_subtitle,
                    'nu_image_path': this.form.nu_image_path,
                    'st_status': this.form.st_status
                },{
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {
                    if(res.status === 200) {
                        this.$store.dispatch('media');
                        this.$refs['media'].hide();
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
                form.append('folder','public/warning');

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
                form.append('folder','public/warning');

               this.$http.post('storage/delete',form,
                {
                   headers: {
                       Authorization: 'Bearer '+this.token
                   }
               })
               .then(res => {
                   
                   res
               })

            },
        }
        
    }
</script>