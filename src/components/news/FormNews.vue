<template>
    <b-modal title="Nova noticia" 
        ref="formnews" id="form-news" size="xl" header-bg-variant="primary" 
            @ok="handleOk" @show="resetModal" @hidden="resetModal">
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
                            <b-form-input type="date" v-model="item.dt_date" required/>
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col lg="7">
                        <b-form-group label="Image">
                            <b-form-file   
                                :state="Boolean(file)"
                                placeholder="Escolha uma imagem..."/>
                        </b-form-group>
                    </b-col>
                    <b-col lg="5">
                        <b-form-checkbox 
                            :value="1" :unchecked-value="0" checked>
                            Destacar?
                        </b-form-checkbox>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col>
                        <b-form-group label="Conteúdo">
                            <vue-editor id="editor" 
                                :editor-toolbar="customToolbar"
                                
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

        mounted() {
        },

        computed: {
            token() {
                return this.$session.get('jwt');
            },
   
        },
        data() {
            return {
                form: {
                    title: this.item.nm_title
                },
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
                    formData.append('nm_title',this.item.nm_title);
                    formData.append('nm_content',this.item.nm_content);
                    formData.append('dt_date',this.item.dt_date);
                    formData.append('nm_image_path',this.file),
                    formData.append('st_highlights',this.item.st_highlight);

                    if (this.item.id_news) {
                        alert(formData)


                        this.editNews(formData);

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
                return this.item.nm_title.length > 0 ? 
                this.validation.title = true : 
                this.validation.title = false
            },

            validateContent() {
                return this.item.nm_content.length > 0 ?
                this.validation.content = true :
                this.validation.content = false
            },

            saveNews(formData) {

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
                this.$http.put('news/'+this.item.id_news,formData, {
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

            },

            resetModal() {
                this.item = []
            }
        
        },
    }
</script>

<style scoped>
    .editor {
        height: 200px;
    }
</style>