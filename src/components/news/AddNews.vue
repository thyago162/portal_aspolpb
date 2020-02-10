<template>
    <b-modal title="Nova noticia" 
        ref="news" id="news" size="xl">
        <form >
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
                        <ckeditor :editor="editor" :config="editorConfig"/>
                    </b-col>
                </b-row>
            </b-container>

        </form>
    </b-modal>
</template>

<script>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    export default {
        components: {
        },

        computed: {
            lista() {
                return ClassicEditor.builtinPlugins.map( plugin => plugin.pluginName );
            }
        },
        data() {
            return {
                editor: ClassicEditor,
                editorConfig: {
                    removePlugins: ['Image','ImageCaption','imageStyle','imageToolbar','ImageUpload','Link'],
                    language: 'pt-br'
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