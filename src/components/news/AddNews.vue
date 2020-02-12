<template>
    <b-modal title="Nova noticia" 
        ref="news" id="news" size="xl" header-bg-variant="primary" @ok="handleOk">
        <form  @submit.stop.prevent="formSubmited">
            {{form.content}}
            <b-container fluid>
                <b-row>
                    <b-col lg="9" md="7">
                        <b-form-group label="Título">
                            <b-form-input type="text" v-model="form.title" required></b-form-input>
                        </b-form-group>
                    </b-col>

                    <b-col lg="3" md="2">
                        <b-form-group label="Data">
                            <b-form-input type="date" v-model="form.date" />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-form-group label="Conteúdo">
                            <vue-editor id="editor" 
                                :editorOptions="editorSettings"
                                :customModules="customModulesForEditor"
                                :useCustomImageHandler="customHandle" 
                                @image-added="handleImageAdded" v-model="form.content"
                                @image-removed="handleImageDeleted"
                                ></vue-editor>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-container>

        </form>
    </b-modal>
</template>

<script>
    import { VueEditor } from 'vue2-editor'
    import { ImageDrop } from 'quill-image-drop-module'

    export default {
        components: {
            VueEditor
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
                    date: ''
                },
                customHandle: true,
                erro: [],
                validation: {},
                customModulesForEditor: [{ alias: "imageDrop", module: ImageDrop } ],
                editorSettings: {
                   modules: {
                        imageDrop: false,
                   }
                },
                test: {}
            }
        },

        methods: {
            
            handleImageAdded(file, Editor, cursorLocation) {

                var data = new FormData();
                data.append('image',file);

                this.$http.post('news/image/add',data, {
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {
                    alert(res.data.url)
                    let url = res.data.url.replace('public/','storage/');
                    Editor.insertEmbed(cursorLocation, "image", url);

                })
                .catch(err => {
                    this.erro.push(err)
                })
            },

            handleImageDeleted(file) {

                let data = new FormData();
                data.append('image',file.replace('http://localhost:8000/storage/news/',''))

                this.$http.post('news/image/delete',data, {
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {
                    alert(res.data)
                })
                .catch(err => {
                    this.erro.push(err);
                })
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
                    

                    this.$http.post('news',formData, {
                        headers: {
                            Authorization: 'Bearer '+this.token
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