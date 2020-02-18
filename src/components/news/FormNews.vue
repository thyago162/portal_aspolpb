<template>
    <b-modal title="Nova noticia" 
        ref="formnews" id="form-news" size="xl" header-bg-variant="primary" @ok="handleOk">
        <form  @submit.stop.prevent="formSubmited" enctype="multipart/form-data">
            <b-container fluid>
                <b-row>
                    <b-col lg="9" md="7">
                        <b-form-group label="Título">
                            <b-form-input 
                                type="text" 
                                v-model="form.title" 
                                required
                                 ></b-form-input>
                        </b-form-group>
                    </b-col>

                    <b-col lg="3" md="2">
                        <b-form-group label="Data">
                            <b-form-input type="date" v-model="form.date" />
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col lg="7">
                        <b-form-group label="Image">
                            <b-form-file v-model="form.file"  
                                :state="Boolean(form.file)"
                                placeholder="Escolha uma imagem..."/>
                        </b-form-group>
                    </b-col>
                    <b-col lg="5">
                        <b-form-checkbox v-model="form.highlight" 
                            :value="1" :unchecked-value="0">
                            Destacar?
                        </b-form-checkbox>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col>
                        <b-form-group label="Conteúdo">
                            <vue-editor id="editor" 
                                :editor-toolbar="customToolbar"
                                v-model="form.content"
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

        updated() {
            this.validateProps();
        },

        computed: {
            token() {
                return this.$session.get('jwt');
            }
        },
        data() {
            return {
                form: {
                    content: '',
                    title: '',
                    date: '',
                    file: null,
                    highlight: 0
                },
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
                isEdit: false
            
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
                    formData.append('nm_title',this.form.title);
                    formData.append('nm_content',this.form.content);
                    formData.append('dt_date',this.form.date);
                    formData.append('nm_image_path',this.form.file),
                    formData.append('st_highlights',this.form.highlight);

                    if (!this.isEdit) {

                        this.newNews(formData);
                    }else {
                        
                        this.editNews(formData);
                    }
                    
                }else {
                    alert('Os campos devem ser preenchidos');
                }

            },

            formValidation() {
                this.validateTitle();
                this.validateContent();
                this.validateDate();
            },

            validateTitle() {
                return this.form.title.length > 0 ? 
                this.validation.title = true : 
                this.validation.title = false
            },

            validateContent() {
                return this.form.content.length > 0 ?
                this.validation.content = true :
                this.validation.content = false
            },

            validateDate() {
                if (!this.form.date) {
                    let date = new Date();
                    this.form.date = date.getDate();
                }
            },

            validateProps() {
                if (this.item.nm_title.length > 0) {

                    this.form.title = this.item.nm_title;
                    this.form.date = this.item.dt_date;
                    this.form.content = this.item.nm_content;
                    this.form.highlight = this.item.st_highlights;

                    this.edit = true;
                }
            },

            newNews(formData) {

                this.$http.post('news',formData, {
                        headers: {
                            Authorization: 'Bearer '+this.token,
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(res => {
                        
                        if (res.status === 200) {
                            this.$refs['formnews'].hide();
                        }
                    })
                    .catch(err => {
                        this.erro.push(err)
                })
                
            },

            editNews(formData) {
                this.$http.put('news'+this.item.id_news,formData, {
                    headers: {
                        Authorization: 'Bearer '+this.token,
                        'Content-Type': 'multipart/form-data'
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

            }
        }
        
    }
</script>

<style scoped>
    .editor {
        height: 200px;
    }
</style>