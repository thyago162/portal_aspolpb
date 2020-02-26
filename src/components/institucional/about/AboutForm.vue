<template>
    <div>
        <b-modal id="about-form" ref="about" title="NOVO MEMBRO" 
            header-bg-variant="success" header-text-variant="light" size="md" 
                ok-title="Salvar" cancel-title="Fechar" @ok="preventDefault">
            <b-form @submit.stop.prevent="sendForm">
                <b-form-group label="Nome" >
                    <b-form-input placeholder="Nome completo" type="text" 
                        required v-model="form.nm_name"/>
                </b-form-group>

                <b-form-group label="Cargo">
                    <b-form-input required  v-model="form.nm_office"/>
                </b-form-group>

                <b-form-group label="Telefone">
                    <b-form inline >
                        <b-input placeholder="ddd" style="width: 100px;" 
                            required v-model="form.nm_ddd"  type="tel"/>
                        <b-input placeholder="Apenas números" class="ml-3" 
                            required  v-model="form.nm_phone"  type="tel"/>
                    </b-form>
                </b-form-group>

                <b-form-radio-group class="mt-4" required v-model="form.fk_advice">
                    <b-form-radio value="1">Diretoria</b-form-radio>
                    <b-form-radio value="2">Conselho Fiscal</b-form-radio>
                    <b-form-radio value="3">Diretoria Regional</b-form-radio>
                </b-form-radio-group>

                <b-form-group label="Foto" class="mt-4">
                    <b-form-file v-model="file" :state="Boolean(file)" @input="image"></b-form-file>
                </b-form-group>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
    export default {

        props: ['about'],

        data() {
            return {
                file: null,
                validate: {},
                error: []
            }
        },

        computed: {
            token: function() {
                return this.$session.get('jwt');
            },

            form: function() {
                return this.about;
            }
        },

        methods: {
            preventDefault(evBvModal){
                evBvModal.preventDefault();
                this.sendForm();
            },

            sendForm() {

                let form = new FormData();
                form.append('nm_name',this.form.nm_name);
                form.append('nm_office',this.form.nm_office);
                form.append('nm_ddd',this.form.nm_ddd);
                form.append('nm_phone',this.form.nm_phone);
                form.append('fk_advice',this.form.fk_advice);
                form.append('nm_image_path',this.file);

                if (!this.about.id_about) {
                    this.save(form);
                } else {
                    this.update();
                }

            },
            validateName(){
                this.form.nm_name.lenght > 0 ? 
                this.validate.name = true : 
                this.error.push('O campo nome deve ser preenchido')

            },
            validateOffice(){
                this.form.nm_ofice.lenght > 0 ? 
                this.validate.ofice = true : 
                this.error.push('O campo profissãodeve ser preenchido')
            },
            validatePhone(){
                this.form.nm_ddd.lenght > 0 &&
                this.form.nm_phone.lenght > 0  ?
                this.validate.phone = true :
                this.error.push('O campo telefone deve ser preenchido')
            },
            validateAdvices(){
                this.form.fk_advices.lenght > 0 ?
                this.validate.advices = true :
                this.error.push('Deve ser escolhido um departamento')
            },

  
            save(form){

                this.$http.post('about',form,{
                    headers: {
                        Authorization: 'Bearer '+this.token,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(res => {

                    if (res.status === 200 ){
                        this.$refs['aboutform'].hide();
                        this.$store.dispatch('about');
                    }
                })
                .catch(err => {
                    this.error = err.data.result.error;
                })
            },

            update(){
                this.$http.put('about',{
                    'nm_name': this.form.nm_name,
                    'nm_ofice': this.form.nm_ofice,
                    'nm_ddd': this.form.nm_ddd,
                    'nm_phone': this.form.nm_phone,
                    'fk_advice': this.form.fk_advice
                },
                {
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {

                    if (res.status === 200) {
                        this.$refs['about'].hide()
                    }
                })
            },

            image() {
                if (this.file) {
                    this.saveImage();
                }
            },

            saveImage() {

                let form = new FormData();

                form.append('file',this.file);
                form.append('folder','public/about/');

                this.$http.post('storage',form, {
                    headers: {
                        Authorization: 'Bearer '+this.token,
                        'Content-type': 'multipart/form-data'
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        this.form.nm_image_path = res.data.result.url.replace('public','storage');
                    }
                })
                .catch(err => {
                    err
                })
            }
        }

        
    }
</script>