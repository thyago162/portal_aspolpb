<template>
    <b-modal id="form-media" ref="media" title="Novo item" 
        header-bg-variant="success" header-text-variant="light" @ok="handleOk" ok-title="Salvar">

        <b-alert variant="danger" :show="visibility" 
            v-for="(error, index) in errors" :key="index" 
            dismissible >{{error}}</b-alert>

        <form @submit.stop.prevent="formSubmited">

            <b-form-group label="Tipo">
                <b-form-radio-group :options="options"  v-model="form.nu_type">
                </b-form-radio-group>
            </b-form-group>

            <b-form-group label="Título">
                <b-form-input type="text"  v-model="form.nm_title" required/>
            </b-form-group>

            <b-form-group label="Link">
                <b-form-input  type="text"  v-model="form.nm_link" required/>
            </b-form-group>

            <b-form-group label="Data">
                <b-form-input type="date" v-model="form.dt_date"></b-form-input>
            </b-form-group>

            <b-form-group v-if="form.nu_type === 1 || form.nu_type === 3" :label="title">
                <b-form-file v-model="file" :state="Boolean(file)" @input="image"></b-form-file>
            </b-form-group>

            <div v-if="form.nu_type === 2 ">
                <h6>Prévia</h6>
                <iframe :src="form.nm_link" frameborder="0"  width="465px" height="360px"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
            </div>

        </form>
    </b-modal>
</template>

<script>
    export default {

        props: ['media'],

        data() {
            return {
                options: [
                    {text: 'Notícias', value: 1},
                    {text: 'Vídeos', value: 2},
                    {text: 'Audios', value: 3},
                ],
                errors: [],
                file: null,
                visibility: false

            }
        },

        computed: {
            form: function() {
                return this.media;
            },
            title: function() {
                return this.form.nu_type == 1 ? 'Imagem' : 'Arquivo'
            },
            token: function() {
                return this.$session.get('jwt');
            }
        },

        methods: {

            validateTitle(){
                this.form.nm_title.length == 0 ?
                this.errors.push('O campo título deve ser preenchido') :
                ''
            },

            validateLink() {
                this.form.nm_link == 0 ?
                this.errors.push('O campo link deve ser preenchido') :
                ''
            },

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
                form.append('nm_link',this.form.nm_link);
                form.append('nm_file_path',this.form.nm_file_path);
                form.append('dt_date',this.form.dt_date);
                form.append('nu_type',this.form.nu_type);

                this.$http.post('media',form,{
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {

                    if (res.status === 200 ) {

                        if (res.data.result.error) {
                            this.errors = res.data.result.error;
                            this.visibility = true;
                        } else {

                            this.$store.dispatch('media')
                            this.$refs['media'].hide();
                        }
                        
                    }
                })
                .catch(err => {
                    this.errors.push(err)
                    this.visibility = true;
                })
            },
            update(){

                this.$http.put('media/'+this.form.id_media,{
                    'nm_title': this.form.nm_title,
                    'nm_link': this.form.nm_link,
                    'nu_file_path': this.form.nu_file_path,
                    'dt_date': this.form.dt_date,
                    'nu_type': this.form.nu_type
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
                form.append('folder','public/media');

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
                form.append('folder','public/media');

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