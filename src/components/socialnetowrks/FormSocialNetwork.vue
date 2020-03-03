<template>
    <b-modal id="form-social-network" ref="socialnetwork" title="Novo item" header-bg-variant="success" 
        header-text-variant="light" @ok="handleOk" ok-title="Salvar" ok-only>
        <b-alert :show="visibility" v-for="(erro, index) in errors" :key="index" variant="danger">
            {{erro}}
        </b-alert>
        <form @submit.stop.prevent="formSubmited">
            <b-form-group label="Titulo">
                <b-form-input type="text" v-model="form.nm_title"/>
            </b-form-group>

            <b-form-group label="Link">
                <b-form-input type="text" v-model="form.nm_link"/>
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
    export default {
        props: ['item'],

        data() {
            return {
                file: null,
                errors: [],
                visibility: false
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

            validateTitle() {
               this.form.nm_title.lenght <= 0 ?
               this.errors.push('O campo titulo não pode ficar vazio') :
               ''
            },

            validateLink() {
                this.form.nm_link.lenght <= 0 ?
                this.errors.push('O campo link não pode ficar vazio') :
                ''
            },

            validateDate() {
                this.form.nm_image_path.lenght <= 0 ?
                this.errors.push('O campo image não pode ficar vazio') :
                ''
            },

            validateImage() {
                this.form.dt_date.lenght <= 0 ?
                this.errors.push('O campo date não pode ficar vazio') :
                ''
            },

            handleOk(bvModalEvt){
                bvModalEvt.preventDefault();
                this.formSubmited();
            },
            
            formSubmited() {

                this.validateTitle();
                this.validateLink();
                this.validateImage();
                this.validateDate();

                if (this.errors.length == 0) {

                    if (!this.form.id_social_network) {

                        this.save();
                    }else {
                        this.update();
                    }
                }else {
                    alert('chegou aqui')
                    this.visibility = true;
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
                        this.$store.dispatch('socialNetwork')
                        this.$refs['socialnetwork'].hide()
                    }
                })
                .catch(err => {
                    this.errors.push(err)
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
                        this.$store.dispatch('socialNetwork')
                        this.$refs['socialnetwork'].hide()
                    }
                })
                .catch(err => {
                    this.errors.push(err)
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
                       alert('Imagem removida');
                   }
               })

            },

            increment() {
                ++ this.validate 
            }
        }
        
    }
</script>