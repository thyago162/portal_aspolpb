<template>
    <b-modal title="Nova noticia" 
        ref="news" id="news" size="xl">
        <form >
            {{editorData}}
            <b-container fluid>
                <b-row>
                    <b-col lg="6">
                        <b-form-group label="Título">
                            <b-form-input type="text"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col lg="3">
                        <b-form-group label="Imagem">
                            <b-form-file></b-form-file>
                        </b-form-group>
                    </b-col>
                    <b-col lg="3">
                        <b-form-group label="Data">
                            <b-form-input type="date"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-form-group label="Conteúdo">
                            <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" ></ckeditor>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-container>

        </form>
    </b-modal>
</template>

<script>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    export default {
        data() {
            return {
                editor: ClassicEditor,
                editorData: '',
                editorConfig: {

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