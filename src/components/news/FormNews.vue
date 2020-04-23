<template>
    <b-modal title="Nova noticia" header-text-variant="light"
        ref="formnews" id="form-news" size="xl" header-bg-variant="primary" 
            ok-only  ok-title="Salvar">

        <template v-slot:modal-footer>
           
            <b-button variant="info" @click="preview = !preview">
                {{preview ? 'Fechar pre-visualização': 'Exibir pré-visualização'}}
            </b-button>

            <b-button @click="handleOk" variant="success" size="md">
                <span :style="{fontWeight: 'bolder'}">Salvar</span>
                <b-spinner class="ml-1" label="Spinning" small v-show="loading"></b-spinner>
            </b-button> 

        </template>

        <ErroMessage :errors="errors" :visibility="visibility"/>

        <form  @submit.stop.prevent="formSubmited" enctype="multipart/form-data">
            <b-container fluid>

               <b-row>
                   <b-col>
                        <b-form-checkbox v-b-tooltip.hover title="Ativar notícia" 
                            :style="{float: 'right'}" switch v-model="news.st_active" :unchecked-value="0" :value="1" />
                   </b-col>
               </b-row>

                <b-row class="mt-2">
                    <b-col v-show="!preview">
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
                                        <b-form-radio :value="0" default name="no-highlights" >Não</b-form-radio>
                                        <b-form-radio :value="1" name="yes-highlights">Sim</b-form-radio>
                                    </b-form-radio-group>
                                </b-form-group>
                            </b-col>

                             <b-col lg="3">
                               <!-- <b-form-group label="Habilitar" class="ml-4">
                                    <b-form-radio-group v-model="news.st_active" required>
                                        <b-form-radio :value="0" name="no-active" >Não</b-form-radio>
                                        <b-form-radio :value="1" name="yes-active">Sim</b-form-radio>
                                    </b-form-radio-group> 
                                </b-form-group> -->
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
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col lg="6">
                                <div v-if="file || item.nm_image_path">
                                    <span >
                                    {{file ? file.name : form.nm_image_path}}
                                    
                                    <b-button size="sm" variant="default" @click="removeSelectedImage">
                                        <b-icon icon="trash" variant="danger"></b-icon>
                                    </b-button> 
                                    </span>

                                    <vue-cropper
                                        class="mt-2"
                                        ref="cropper"
                                        :src="item.nm_image_path"
                                        alt="Source Image"
                                        :aspect-ratio="16 / 9"
                                        preview=".preview"
                                    ></vue-cropper>

                                    <div v-if="!news.nm_image_path">
                                        <b-button size="sm" class="m-2" variant="info" @click.prevent="cropImage">
                                            Selecionar área
                                        </b-button>
                                        <b-button size="sm" @click.prevent="reset" variant="warning">
                                            Resetar
                                        </b-button>
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
                    </b-col>
                    <transition name="fade">
                        <b-col v-show="preview">
                            <PreviewNews :news="news" :img="imgSrc" :crop="cropImage" />
                        </b-col>
                    </transition>
                </b-row>
            </b-container>

        </form>

        <SessionOff ref="session"/> 
        
    </b-modal>
</template>

<script>
    import VueCropper from 'vue-cropperjs';
    import ErroMessage from '../error/ErrorMessage';
    import { VueEditor } from 'vue2-editor';
    import PreviewNews from './PreviewNews';
    import SessionOff from '../session/Session';

    export default {
        props: ['item'],

        components: {
            VueEditor,
            ErroMessage,
            VueCropper,
            PreviewNews,
            SessionOff
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
                imgSrc: '',
                preview: false,
                options: [
                    {text: 'ativar'}
                ]
            
            }
        },

        methods: {
            
            handleOk: function(bvModalEvt) {
                bvModalEvt.preventDefault();
                this.formSubmited();
            },

            formSubmited() {
                this.loading = true;
                this.saveNews();
            },
 
            saveNews() {

                let formData = new FormData();

                if (this.news.nm_image_path == undefined) {
                    this.news.nm_image_path = '';
                }

                formData.append('id_news', this.news.id_news);
                formData.append('nm_title', this.news.nm_title);
                formData.append('nm_subtitle', this.news.nm_subtitle);
                formData.append('nm_content', this.news.nm_content);
                formData.append('dt_date', this.news.dt_date);
                formData.append('file', this.file),
                formData.append('st_highlights',this.news.st_highlights);
                formData.append('nm_image_path', this.news.nm_image_path);
                formData.append('st_active', this.news.st_active);

                this.$http.post('news',formData, {
                        headers: {
                            Authorization: 'Bearer '+this.token,
                        }
                })
                .then(res => {
                        
                    if (res.status === 200) {
                        this.loading = false;

                        if (res.data.token_failure) {
                           this.$refs.session.$refs.session.show()
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
                this.cropImg  = '';

                if (this.news.nm_image_path) {
                    this.deleteImage();
                }
            },

            deleteImage() {

                let url = this.news.nm_image_path;

                let form = new FormData();
                form.append('nm_image_path', url);
                form.append('folder','public/news');
                form.append('id_news', this.news.id_news);

               this.$http.post('news/image-remove',form,
                {
                   headers: {
                       Authorization: 'Bearer '+this.token
                   }
               })
               .then(res => {
                   
                   if (res.status === 200) {
                       alert('Imagem removida');
                       this.item.nm_image_path = '';
                       this.imgSrc = ''
                   }
               })

            },

            pre() {
                this.preview = !this.preview;
            }
        },
    }
</script>

<style scoped>
    .editor {
        height: 200px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>