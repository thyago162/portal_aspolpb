<template>
    <b-modal title="Nova noticia" 
        ref="news" id="news" size="xl">
        <form >
            <b-container fluid>
                <b-row>
                    <b-col >
                        <b-form-group label="Título">
                            <b-form-input type="text"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-form-group label="Conteúdo">
                            <vue-editor v-model="content" useCustomImageHandler/>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-container>

        </form>
    </b-modal>
</template>

<script>
    import { VueEditor} from 'vue2-editor';
    export default {
        components: {
            VueEditor
        },

        computed: {
         
        },
        data() {
            return {
                content: ''
            }
        }
        
    }
</script>

<style scoped>
    .editor {
        height: 200px;
    }
</style>