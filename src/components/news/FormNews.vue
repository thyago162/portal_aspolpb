<template>
    <b-modal title="Nova noticia" header-text-variant="light"
        ref="formnews" id="form-news" size="xl" header-bg-variant="primary" 
            @ok="handleOk" ok-only ok-title="Salvar">

        <template v-slot:modal-footer="{ok}">      
            <b-button @click="ok()" variant="success" size="md">
                <span :style="{fontWeight: 'bolder'}">Salvar</span>
                <b-spinner class="ml-1" label="Spinning" small v-show="loading"></b-spinner>
            </b-button>
        </template>

        <ErroMessage :errors="errors" :visibility="visibility"/>
        <Session :countdown="countdown" />

        <form  @submit.stop.prevent="formSubmited" enctype="multipart/form-data">
            <b-container fluid>
                <b-row>
                    <b-col >
                        <b-form-group label="Título">
                            <b-form-input 
                                type="text" 
                                v-model="news.nm_title"
                                required
                                name="nm_title"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>

                 <b-row>
                    <b-col>
                        <b-form-group label="Subtítulo">
                            <b-form-input type="text" v-model="news.nm_subtitle" />
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col lg="3" md="2">
                        <b-form-group label="Data">
                            <b-form-input type="date" v-model="news.dt_date" 
                            name="dt_date" required/>
                        </b-form-group>
                    </b-col>

                    <b-col lg="3">
                        <b-form-group label="Destacar" class="ml-4">
                            <b-form-radio-group v-model="news.st_highlights" required>
                                <b-form-radio :value="0" name="no-highlights" >Não</b-form-radio>
                                <b-form-radio :value="1" name="yes-highlights">Sim</b-form-radio>
                            </b-form-radio-group>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col>
                        <b-form-group label="Conteúdo">
                            <vue-editor id="editor"
                                v-model="news.nm_content"
                                ></vue-editor>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col lg="9">
                        <b-form-group label="Image">
                            <b-form-file
                                name="nm_image_path"
                                @change="setImage"
                                v-model="file"
                                :state="Boolean(file)"
                                placeholder="Escolha uma imagem..."/>
                        </b-form-group>
                        {{form.nm_image_path}}
                    </b-col>
                </b-row>

                <b-row>
                    <b-col lg="6">
                        <div v-if="file">
                            <span >
                            {{file.name}}
                            <b-button size="sm" variant="default" @click="removeSelectedImage">
                                <b-icon icon="trash" variant="danger"></b-icon>
                            </b-button>
                            </span>

                            <vue-cropper
                                class="mt-2"
                                ref="cropper"
                                :src="form.nm_image_path"
                                alt="Source Image"
                                :aspect-ratio="16 / 9"
                                preview=".preview"
                            ></vue-cropper>

                            <div>
                                <b-button size="sm" class="m-2" variant="info" @click.prevent="cropImage">Cortar</b-button>
                                <b-button size="sm" @click.prevent="reset" variant="warning">Resetar</b-button>
                            </div>
            
                        </div>
                    </b-col>

                    <b-col lg="6">
                        <div v-if="cropImg"  class="cropped-image">
                            <h6 class="mt-2">Prévia</h6>
                            <b-img
                                :src="cropImg"
                                alt="Imagem Recortada"
                                fluid
                            >
                            </b-img>
                        </div> 
                    </b-col>
                </b-row>
            </b-container>

        </form>
    </b-modal>
</template>

<script>
    import VueCropper from 'vue-cropperjs';
    import ErroMessage from '../error/ErrorMessage';
    import { VueEditor } from 'vue2-editor';
    import Session from '../session/Session';
    export default {
        props: ['item'],

        components: {
            VueEditor,
            ErroMessage,
            Session,
            VueCropper
        },

        computed: {
            token() {
                return this.$session.get('jwt');
            },

            news() {
                return this.item
            },

        },
        data() {
            return {
                form: {},
                file: null,
                loading: false,
                hasImage: false,
                countdown: 0,
                errors: [],
                visibility: false,
                customToolbar: [
                    [{ 'font': [] }],
                    [{ 'header': [false, 1, 2, 3, 4, 5, 6, ] }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
                    [{ 'header': 1 }, { 'header': 2 }],
                    ['blockquote', 'code-block'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
                    [{ 'script': 'sub'}, { 'script': 'super' }],
                    [{ 'indent': '-1'}, { 'indent': '+1' }],
                    [{ 'color': [] }, { 'background': [] }],
                    ['link', 'video',],
                    [{ 'direction': 'rtl' }],
                    ['clean'],
                ],
                cropImg: '',
                imgSrc: ''
            
            }
        },

        methods: {
            
            handleOk: function(bvModalEvt) {
                bvModalEvt.preventDefault();
                this.formSubmited();
            },

            formSubmited() {
                this.loading = true;
                if (this.form.nm_image_path && this.file) {
                    this.deleteImage()
                }

                this.saveImage(this.file)
            },
 
            saveNews() {

                let formData = new FormData();

                if (this.news.nm_image_path == undefined) {
                    this.news.nm_image_path = '';
                }

                formData.append('nm_title', this.news.nm_title);
                formData.append('nm_subtitle', this.news.nm_subtitle);
                formData.append('nm_content', this.news.nm_content);
                formData.append('dt_date', this.news.dt_date);
                formData.append('nm_image_path', this.news.nm_image_path),
                formData.append('st_highlights',this.news.st_highlights);

                this.$http.post('news',formData, {
                        headers: {
                            Authorization: 'Bearer '+this.token,
                        }
                })
                .then(res => {
                        
                    if (res.status === 200) {
                        this.loading = false;

                        if (res.data.token_failure) {
                            this.countdown = 3;   
                        }

                        if (res.data.result.error) {
                            this.errors.push(Object.values(res.data.result.error));
                            this.visibility = true;

                        }else {
                            this.$store.dispatch('news');
                            this.$refs['formnews'].hide();
                        }
                        
                    }
                })
                .catch(err => {
                    this.errors.push(err);
                    this.visibility = true;
                }) 
            },

            editNews() {
                this.$http.put('news/'+this.item.id_news,{
                    'nm_title': this.news.nm_title,
                    'nm_subtitle': this.news.nm_subtitle,
                    'nm_content': this.news.nm_content,
                    'dt_date': this.news.dt_date,
                    'st_highlights': this.news.st_highlights,
                    'nm_image_path' : this.news.nm_image_path
                }, {
                    headers: {
                        Authorization: 'Bearer '+this.token,
                    }
                })
                .then( res => {
                    if (res.status === 200) {
                        this.loading = false;

                        if (res.data.token_failure) {
                            this.countdown = 3;
                        }

                        if (res.data.result.error) {
                            this.errors.push(Object.values(res.data.result.error));
                            this.visibility = true;

                        }else {
                            this.$store.dispatch('news');
                            this.$refs['formnews'].hide();
                        }

                    }
                    
                })
                .catch(err => {
                    this.errors.push(err);
                    this.visibility = true;
                })

            },

            image() {
                if ( this.file ) {

                    if (this.news.nm_image_path) {
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
                form.append('folder','public/news');

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
                        this.news.nm_image_path = image;

                        if (!this.form.id_news) {
                            this.saveNews();
                            
                        }else {
                            this.update();
                        }
                    }
                    
                })
                .catch(err => {
                    this.erro = err;
                })

            },

            deleteImage() {

                let url = this.news.nm_image_path.replace('http://193.46.198.137:8000/api/','')

                let form = new FormData();
                form.append('url',url.replace('storage','public'));
                form.append('folder','public/news');

               this.$http.post('storage/delete',form,
                {
                   headers: {
                       Authorization: 'Bearer '+this.token
                   }
               })
               .then(res => {
                   
                   if (res.status === 200) {
                       res
                   }
               })
            },

            setImage(e) {
                const file = e.target.files[0];

                if (file.type.indexOf('image/') === -1) {
                    alert('Please select an image file');
                    return;
                }

                if (typeof FileReader === 'function') {
                    const reader = new FileReader();

                reader.onload = (event) => {
                    this.imgSrc = event.target.result;
                    // rebuild cropperjs with the updated source
                    this.$refs.cropper.replace(event.target.result);
                };

                reader.readAsDataURL(file);
                //this.saveImage(file)
                } else {
                    alert('Sorry, FileReader API not supported');
                }
            },

            cropImage() {
                let vm = this
                // get image data for post processing, e.g. upload or setting image src
                this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
                this.$refs.cropper.getCroppedCanvas().toBlob(function (blob) {
                    vm.file = new File([blob], 'arquivo')
                },'image/jpeg')
            },

            reset() {
                this.$refs.cropper.reset();
            },

            removeSelectedImage() {
                this.file = null;
                this.cropImg  = ''
            }

        },
    }
</script>

<style scoped>
    .editor {
        height: 200px;
    }
</style>