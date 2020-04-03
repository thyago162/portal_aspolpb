<template>
    <b-modal id="transparency-file-form" ref="transparency-file-form-ref" title="Adicionar documento" @ok="handleOk" 
    ok-title="Salvar" ok-only header-bg-variant="danger" header-text-variant="light">

        <template v-slot:modal-footer="{ok}">
            <b-button variant="danger" size="md" @click="ok()">
                <span :style="{fontWeight: 'bolder'}">Salvar</span>
                <b-spinner small label="Small Spinner" class="ml-1" v-show="loading"></b-spinner>
            </b-button>
        </template>

        <form @submit.stop.prevent="formSubmited" >

            <b-form-group label="Nome do arquivo">
                <b-form-input type="text" v-model="form.nm_name"/>
            </b-form-group>

            <b-form-group label="Arquivo">
                <b-form-file accept=".pdf" v-model="file" :state="Boolean(file)" 
                    @input="loadFile"></b-form-file>
            </b-form-group>

            <b-form-group label="Tipo de documento" >
                <b-form-select :options="options" v-model="form.nm_type_doc"></b-form-select>
            </b-form-group>

            <b-form-group label="Ano do documento" >
                <b-form-input type="number" placeholder="Ex: 2020" v-model="form.nu_year"/>
            </b-form-group>

        </form>
    </b-modal>
</template>

<script>
    export default {
        props: ['id'],

        computed: {
                token: function() {
                    return this.$session.get('jwt');
                }
            },

        data() {
            return {
                form: {},
                file: null,
                loading: false,
                options: [
                    {value: 'Contabilidade', text: 'Contabilidade'},
                    {value: 'Certidão', text: 'Certidão'},
                    {value: 'Financeiro', text: 'Financeiro'},
                    {value: 'Outros', text: 'Outros'},
                ]
            }
        },

        methods: {
            handleOk(bvModalEvt) {
                bvModalEvt.preventDefault();
                this.formSubmited();
            },

            formSubmited() {
                this.loading = true;

                if (!this.form.id_transparency_file) {
                    this.save()
                } else {
                    this.update()
                }
            },

            save() {
                let form = new FormData();

                form.append('nm_name', this.form.nm_name);
                form.append('nm_file_path', this.form.nm_file_path);
                form.append('nm_type_doc', this.form.nm_type_doc);
                form.append('nu_year', this.form.nu_year);
                form.append('fk_transparency', this.id);

                this.$http.post('transparency-file',form, {
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        this.loading = false;
                        this.$store.dispatch('transparency', this.token)
                        this.$refs['transparency-file-form-ref'].hide()
                    }
                })

            }, 

            update() {

            },

            loadFile() {

                if ( this.file ) {

                    this.saveFile();
                    
                } else {
                    
                    this.deleteFile();
                }
            },

            saveFile() {
                let form = new FormData();

                form.append('file',this.file);
                form.append('folder','public/transparency/');

                this.$http.post('storage/save',form,{
                    headers: {
                        Authorization: 'Bearer '+this.token,
                        'Content-type': 'multipart/form-data'
                    }
                })
                .then(res => {

                    if (res.status === 200) {
                        this.form.nm_file_path = res.data.result.url.replace('public','storage')
                    }
                    
                })
                .catch(err => {
                    this.erro = err;
                })

            },

            deleteFile(param) {

                let url = this.form.nm_image_path.replace('http://localhost:8080/','')

                let form = new FormData();
                form.append('url',url.replace('storage','public'));
                form.append('folder','public/transparency/'+param);

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
        }
    }
</script>