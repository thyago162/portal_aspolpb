<template>
    <b-modal id="form-social-network" ref="socialnetwork" title="Novo item" header-bg-variant="success" 
        header-text-variant="light" @ok="handleOk" ok-title="Salvar" ok-only @hide="resetErrors">

        <template v-slot:modal-footer="{ok}">
             <b-button variant="danger" size="md" @click="ok()">
                <span :style="{fontWeight: 'bolder'}">Salvar</span>
                <b-spinner small label="Small Spinner" class="ml-1" v-show="loading"></b-spinner>
            </b-button>
        </template>

        <ErrorMessage :errors="errors" :visibility="visibility" />
        <form @submit.stop.prevent="formSubmited">
            <b-form-group label="Titulo">
                <b-form-input type="text" v-model="form.nm_title" placeholder="Informe o título"/>
            </b-form-group>

            <b-form-group label="Link">
                <b-form-input type="text" v-model="form.nm_link" placeholder="http://exemplo.com.br"/>
            </b-form-group>

            <b-form-group label="Data">
                <b-form-input type="date" v-model="form.dt_date"></b-form-input>
            </b-form-group>

            <b-form-group label="Imagem">
                <b-form-file v-model="file" :state="Boolean(file)" @input="image"></b-form-file>
            </b-form-group>
        </form>
    </b-modal>
</template>

<script>
    import ErrorMessage from '../error/ErrorMessage';
    export default {

        props: ['item'],

        components: {
            ErrorMessage
        },

        data() {
            return {
                file: null,
                errors: [],
                visibility: false,
                loading: false
            }
        },

        computed: {
            form: function() {
                return this.item
            },
            token: function() {
                return this.$session.get('jwt');
            }
        },

        methods: {

            handleOk(bvModalEvt){
                bvModalEvt.preventDefault();
                this.formSubmited();
            },
            
            formSubmited() {
                this.loading = true;

                if (!this.form.id_social_network) {
                    this.save();

                }else {
                    this.update();
                }
              
            },
            save(){
                let form = new FormData();

                form.append('nm_title',this.form.nm_title);
                form.append('nm_link', this.form.nm_link);
                form.append('nm_image_path', this.form.nm_image_path);
                form.append('dt_date',this.form.dt_date);

                this.$http.post('social-network',form, {
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {
                    if (res.status === 200 ) {
                        this.loading = false;

                        if (res.data.token_failure) {
                            alert('Sessão expirada... Você será redirecionado!');
                            this.$router.push('/');
                            this.$session.destroy();
                            this.$store.disptach('logout');
                            location.reload();   
                        }

                        if (res.data.result.error) {
                            this.errors.push(res.data.result.error);
                            this.visibility = true;

                        } else {
                            this.$store.dispatch('socialNetwork')
                            this.$refs['socialnetwork'].hide()
                        }
                    }
                })
                .catch(err => {
                    this.loading = false;
                    this.errors.push(err)
                    this.visibility = true;
                })
            },

            update(){

                this.$http.put('social-network/'+this.form.id_social_network,{
                    'nm_title': this.form.nm_title,
                    'nm_link': this.form.nm_link,
                    'nm_image_path': this.form.nm_image_path,
                    'dt_date': this.form.dt_date
                },{
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                 .then(res => {
                    if (res.status === 200 ) {
                        this.loading = false;

                        if (res.data.token_failure) {
                            alert('Sessão expirada... Você será redirecionado!');
                            this.$router.push('/');
                            this.$session.destroy();
                            this.$store.disptach('logout');
                            location.reload();   
                        }

                        if (res.data.result.error) {
                            this.errors.push(res.data.result.error);
                            this.visibility = true;

                        } else {
                            this.$store.dispatch('socialNetwork')
                            this.$refs['socialnetwork'].hide()
                        }
                       
                    }
                })
                .catch(err => {
                    this.loading = false;
                    this.errors.push(err)
                    this.visibility = true;
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
                form.append('folder','public/socialnetwork');

                this.$http.post('storage/save',form,{
                    headers: {
                        Authorization: 'Bearer '+this.token,
                        'Content-type': 'multipart/form-data'
                    }
                })
                .then(res => {

                    if (res.status === 200) {
                        this.form.nm_image_path = res.data.result.url;
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
                form.append('folder','public/socialnetwork');

               this.$http.post('storage/delete',form,
                {
                   headers: {
                       Authorization: 'Bearer '+this.token
                   }
               })
               .then(res => {
                   
                   if (res.status === 200) {
                       this.form.nm_image_path = '';
                   }
               })

            },

            resetErrors() {
                this.errors = [];
                this.visibility = false;
            }
        }
        
    }
</script>