<template>
    <b-modal title="Nova noticia" 
        ref="news" id="news" size="xl" header-bg-variant="primary" @ok="handleOk">
        <form  @submit.stop.prevent="formSubmited" enctype="multipart/form-data">
        {{form.file}}
            <b-container fluid>
                <b-row>
                    <b-col lg="9" md="7">
                        <b-form-group label="Título">
                            <b-form-input 
                                type="text" 
                                v-model="form.title" 
                                required></b-form-input>
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
                            <image-uploader :debug="1" :maxWidth="350" :quality="0.7"
                                outputFormat="file" :preview="true"
                                :className="['fileinput', { 'fileinput--loaded' : hasImage }]" 
                                :capture="false" accept="image/*"
                                doNotResize="['gif', 'svg']"
                                @input="setImage"

                             />
                        </b-form-group>
                    </b-col>
                    <b-col lg="5">
                        <b-form-group label="Posição da imagem">
                            <b-form-radio-group
                            id="image_position"
                            name="image_position"
                            :options="options" 
                            v-model="form.imagePosition"></b-form-radio-group>
                        </b-form-group>
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
    import ImageUploader from 'vue-image-upload-resize'

    export default {
        components: {
            VueEditor,
            ImageUploader
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
                    imagePosition: ''
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
                options: [
                    {text: 'Em cima', value: 1},
                    {text: 'Direita', value: 2},
                    {text: 'Esquerda', value: 3},
                    {text: 'Em baixo', value: 4},
                ]
            }
        },

        methods: {

            setImage: function (file) {
                this.hasImage = true
                this.form.file = file
            },
            
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
                    formData.append('nu_image_position',this.form.imagePosition)
                    

                    this.$http.post('news',formData, {
                        headers: {
                            Authorization: 'Bearer '+this.token,
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(res => {
                        
                        if (res.status === 200) {
                            this.$refs['news'].hide();
                            this.$state.dispatch('news');
                        }
                    })
                    .catch(err => {
                        this.erro.push(err)
                    })

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
            }
        }
        
    }
</script>

<style scoped>
    .editor {
        height: 200px;
    }
</style>