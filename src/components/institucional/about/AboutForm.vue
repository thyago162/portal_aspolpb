<template>
    <div>
        <b-modal id="about-form" ref="about" title="NOVO MEMBRO" 
            header-bg-variant="success" header-text-variant="light" size="md" 
                ok-title="Salvar" cancel-title="Fechar" @ok="preventDefault" ok-only>

            <template v-slot:modal-footer="{ok}">
                <b-button variant="danger" size="md" @click="ok()">
                    <span :style="{fontWeight: 'bolder'}">Salvar</span>
                    <b-spinner small label="Small Spinner" class="ml-1" v-show="loading"></b-spinner>
                </b-button>
            </template>

            <ErroMessage :errors="errors" :visibility="visibility" />

            <b-form @submit.stop.prevent="sendForm">
                <b-form-group label="Nome" >
                    <b-form-input placeholder="Nome completo" type="text" 
                        required v-model="form.nm_name"/>
                </b-form-group>

                <b-form-group label="Cargo">
                    <b-form-input required  v-model="form.nm_office"/>
                </b-form-group>

                <b-form-group label="Telefone" v-if="selected == 1">
                    <b-form inline >
                        <b-input placeholder="ddd" style="width: 100px;" 
                            required v-model="form.nm_ddd"  type="tel"/>
                        <b-input placeholder="Apenas números" class="ml-3" 
                            required  v-model="form.nm_phone"  type="tel"/>
                    </b-form>
                </b-form-group>

                <b-form-radio-group class="mt-4" required v-model="form.fk_advice" @input="selectedOption" >
                    <b-form-radio :value="1">Presidência</b-form-radio>
                    <b-form-radio :value="2">Diretoria</b-form-radio>
                    <b-form-radio :value="3">Conselho Fiscal</b-form-radio>
                    <b-form-radio :value="4">Diretoria Regional</b-form-radio>
                </b-form-radio-group>

                <b-form-group label="Foto" class="mt-4" v-if="selected == 1">
                    <b-form-file v-model="file" :state="Boolean(file)" @input="image"></b-form-file>
                </b-form-group>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
    import ErroMessage from '../../error/ErrorMessage'
    export default {

        props: ['about'],

        components: {
            ErroMessage
        },

        data() {
            return {
                file: null,
                errors: [],
                loading: false,
                visibility: false,
                selected: 1
            }
        },

        computed: {
            token: function() {
                return this.$session.get('jwt');
            },

            form: function() {
                return this.about;
            },
        },

        methods: {
            preventDefault(evBvModal){
                evBvModal.preventDefault();
                this.sendForm();
            },

            sendForm() {
                this.loading = true;

                if (!this.about.id_about) {
                    this.save();
                } else {
                    this.update();
                }

            },
  
            save(){
                let form = new FormData();
                form.append('nm_name', this.form.nm_name);
                form.append('nm_office', this.form.nm_office);
                form.append('nm_ddd', this.form.nm_ddd);
                form.append('nm_phone', this.form.nm_phone);
                form.append('fk_advice', this.form.fk_advice);
                form.append('nm_image_path', this.form.nm_image_path);

                this.$http.post('about',form,{
                    headers: {
                        Authorization: 'Bearer '+this.token,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(res => {

                    if (res.status === 200 ){
                        this.loading = false;

                        if (res.data.token_failure) {
                            alert('Sessão expirada... Você será redirecionado!');
                            this.$store.disptach('token', null);
                            this.$session.destroy();
                            this.$store.disptach('logout');
                            this.$router.push('/');
                        }

                        if(res.data.result.error) {
                            this.errors.push(res.data.result.error);
                            this.visibility = true;

                        }else {
                            this.$refs['about'].hide();
                            this.$store.dispatch('about');
                        }  
                    }
                })
                .catch(err => {
                    this.errors.push(err.data.result.error);
                    this.visibility = true;
                })
            },

            update(){
                this.$http.put('about/'+this.form.id_about,{
                    'nm_name': this.form.nm_name,
                    'nm_office': this.form.nm_office,
                    'nm_ddd': this.form.nm_ddd,
                    'nm_phone': this.form.nm_phone,
                    'fk_advice': this.form.fk_advice,
                    'nm_image_path': this.form.nm_image_path
                },
                {
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {

                    if (res.status === 200) {
                        this.loading = false;

                        if (res.data.token_failure) {
                            alert('Sessão expirada... Você será redirecionado!');
                            this.$store.disptach('token', null);
                            this.$session.destroy();
                            this.$store.disptach('logout');
                            this.$router.push('/');
                        }

                        if(res.data.result.error) {
                            this.errors.push(res.data.result.error);
                            this.visibility = true;

                        }else {
                            this.$refs['about'].hide();
                            this.$store.dispatch('about');
                        }  
                    }
                })
            },

            image() {

               if (this.file) {
                   this.saveImage();

               } else {
                   this.deleteImage();
               }
               
           },

            saveImage() {

                let form = new FormData();

                form.append('file',this.file);
                form.append('folder','public/about');

                this.$http.post('storage/save',form,{
                    headers: {
                        Authorization: 'Bearer '+this.token,
                        'Content-type': 'multipart/form-data'
                    }
                })
                .then(res => {

                    if (res.status === 200) {
                        let image = res.data.result.url;
                        image = image.replace('public','storage')
                        this.form.nm_image_path = image;
                    }
                    
                })
                .catch(err => {
                    this.erro = err;
                })

            },

            deleteImage() {

                let url = this.form.nm_image_path;

                let form = new FormData();
                form.append('url',url.replace('storage','public'));
                form.append('folder','public/about');

               this.$http.post('storage/delete',form,
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

            },

            selectedOption(opt) {
                this.selected = opt;
            }
          
        }

        
    }
</script>