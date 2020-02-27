<template>
    <b-modal title="Nova noticia" 
        ref="formnews" id="form-news" size="xl" header-bg-variant="primary" 
            @ok="handleOk">
        <form  @submit.stop.prevent="formSubmited" enctype="multipart/form-data">
            <b-container fluid>
                <b-row>
                    <b-col lg="9" md="7">
                        <b-form-group label="Título">
                            <b-form-input 
                                type="text" 
                                v-model="news.nm_title"
                                required
                                name="nm_title"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>

                    <b-col lg="3" md="2">
                        <b-form-group label="Data">
                            <b-form-input type="date" v-model="news.dt_date" 
                            name="dt_date" required/>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col lg="9">
                        <b-form-group label="Image">
                            <b-form-file
                                name="nm_image_path"
                                @input="image"
                                v-model="file"
                                :state="Boolean(file)"
                                placeholder="Escolha uma imagem..."/>
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
                                :editor-toolbar="customToolbar"
                                v-model="news.nm_content"
                                ></vue-editor>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-container>

        </form>
    </b-modal>
</template>

<script>
    import { VueEditor } from 'vue2-editor';

    export default {
        props: ['item'],

        components: {
            VueEditor,
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
                hasImage: false,
                erro: [],
                validation: {},
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
            
            }
        },

        methods: {
            
            handleOk: function(bvModalEvt) {
                bvModalEvt.preventDefault();
                this.formSubmited();
            },

            formSubmited() {

                this.formValidation();

                if (this.validation.title && this.validation.content) {

                    let formData = new FormData();
                    formData.append('nm_title', this.news.nm_title);
                    formData.append('nm_content', this.news.nm_content);
                    formData.append('dt_date', this.news.dt_date);
                    formData.append('nm_image_path', this.news.nm_image_path),
                    formData.append('st_highlights',this.news.st_highlights);

                    if (this.item.id_news) {
                        this.editNews();

                    }else {
                        this.saveNews(formData);
                    }

                }else {
                    alert('Os campos devem ser preenchidos');
                }

            },

            formValidation() {
                this.validateTitle();
                this.validateContent();
            },

            validateTitle() {
                return this.news.nm_title.length > 0 ? 
                this.validation.title = true : 
                this.validation.title = false
            },

            validateContent() {
                return this.news.nm_content.length > 0 ?
                this.validation.content = true :
                this.validation.content = false
            },

            saveNews(formData) {

                this.$http.post('news',formData, {
                        headers: {
                            Authorization: 'Bearer '+this.token,
                        }
                })
                .then(res => {
                        
                        if (res.status === 200) {
                            location.reload(true)
                            this.$refs['formnews'].hide();
                        }
                })
                .catch(err => {
                    this.erro.push(err)
                }) 
            },

            editNews() {
                this.$http.put('news/'+this.item.id_news,{
                    'nm_title': this.news.nm_title,
                    'nm_content': this.news.nm_content,
                    'dt_date': this.news.dt_date,
                    'st_highlights': this.news.st_highlights,
                    'nm_image_path' : this.nm_image_path
                }, {
                    headers: {
                        Authorization: 'Bearer '+this.token,
                    }
                })
                .then( res => {
                    if (res.status === 200) {
                        
                        this.$refs['formnews'].hide();
                    }
                })
                .catch(err => {
                    this.erro.push(err)
                })

            },

            image() {
                if (this.file) {

                    this.saveImage();

                } else if (this.file && this.news.nm_image_path) {

                    this.deleteImage();
                }else {
                    this.deleteImage();
                }
            },

            saveImage() {
                let form = new FormData();

                form.append('file',this.file);
                form.append('folder','public/news');

                this.$http.post('storage',form,{
                    headers: {
                        Authorization: 'Bearer '+this.token,
                        'Content-type': 'multipart/form-data'
                    }
                })
                .then(res => {

                    if (res.status === 200) {
                        this.news.nm_image_path = res.data.result.url.replace('public','storage');
                    }
                    
                })
                .catch(err => {
                    this.erro = err;
                })

            },

            deleteImage() {

               this.$http.delete('storage/',{
                   'url': this.news.nm_image_path
               },
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
        },
    }
</script>

<style scoped>
    .editor {
        height: 200px;
    }
</style>