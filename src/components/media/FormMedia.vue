<template>
    <b-modal id="form-media" ref="media" title="Novo item" size="lg" 
        header-bg-variant="success" header-text-variant="light" @ok="handleOk" ok-title="Salvar">
        <b-alert variant="danger" :show="visibility" 
            v-for="(error, index) in errors" :key="index" 
            dismissible >{{error}}</b-alert>

        <form @submit.stop.prevent="formSubmited">

            <b-form-group label="Título">
                <b-form-input type="text"  v-model="form.nm_title" required/>
            </b-form-group>

            <b-form-group label="Subtitulo">
                <b-form-input type="text" v-model="form.nm_subtitle"   required/>
            </b-form-group>

            <b-form-group label="Link">
                <b-form-input  type="text"  v-model="form.nm_link" required/>
            </b-form-group>

            <b-form-group label="Data">
                <b-form-input type="date" v-model="form.dt_date"></b-form-input>
            </b-form-group>

            <b-row>
                <b-col>
                    <b-form-group label="Imagem">
                        <image-uploader
                            :debug="1"
                            :maxWidth="550"
                            :maxHeight="300"
                            :quality="0.7"
                            :autoRotate="true"
                            outputFormat="file"
                            :preview="true"
                            :className="['fileinput', { 'fileinput--loaded' : hasImage }]"
                            :capture="true"
                            accept="image/*"
                            doNotResize="['gif', 'svg']"
                            @input="setImage"
                         ></image-uploader>
                    </b-form-group>
                </b-col>
                <b-col>
                     <b-form-group  label="Audio">
                        <b-form-file v-model="file" :state="Boolean(form.nm_audio_path)" 
                            @input="setAudio('audios')" accept=".mp3, .wma"></b-form-file>
                    </b-form-group>
                </b-col>
            </b-row>

             <b-form-group label="Tipo">
                <b-form-radio-group :options="options"  v-model="form.nu_type">
                </b-form-radio-group>
            </b-form-group>

        </form>
    </b-modal>
</template>

<script>
    import ImageUploader from 'vue-image-upload-resize';
    export default {

        components: {
            ImageUploader
        },

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
                hasImage: false,
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

            setImage(file) {

                let folder = 'images'
                
                if(file) {
                    this.file = file;
                    this.hasImage = true;
                    this.storeFile(folder)
                } else {
                    this.deleteFile(folder)
                }

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
                form.append('nm_subtitle',this.form.nm_subtitle);
                form.append('nm_link',this.form.nm_link);
                form.append('nm_image_path',this.form.nm_image_path);
                form.append('nm_audio_path',this.form.nm_audio_path);
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
                    'nm_subtitle': this.form.nm_subtitle,
                    'nm_link': this.form.nm_link,
                    'nu_image_path': this.form.nu_image_path,
                    'nu_audio_path': this.form.nu_audio_path,
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

            setAudio(param) {

               if (this.file) {

                   this.storeFile(param);

               } else {
                   
                   this.deleteFile(param);
               }
               
           },

            storeFile(param) {

                let form = new FormData();

                form.append('file',this.file);
                form.append('folder','public/media/'+param);

                this.$http.post('storage/save',form,{
                    headers: {
                        Authorization: 'Bearer '+this.token,
                        'Content-type': 'multipart/form-data'
                    }
                })
                .then(res => {

                    if (res.status === 200) {

                        param === 'images' ?
                        this.form.nm_image_path = res.data.result.url :
                        this.form.nm_audio_path = res.data.result.url
                    }
                    
                })
                .catch(err => {
                    this.erro = err;
                })

            },

            removeFile(param) {

                let url = param === 'images' ? 
                    this.form.nm_image_path : 
                    this.form.nm_audio_path
                
                let form = new FormData();
                form.append('url',url.replace('storage','public'));
                form.append('folder','public/media/'+param);

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