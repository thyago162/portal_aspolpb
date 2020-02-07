<template>

    <b-modal id="auth" :title="title" @ok="handleOk" @reset="resetModal" 
        @cancel="resetModal" :ok-title="btnTitle" ref="auth" header-bg-variant="danger" header-text-variant="white">

        <b-alert :variant="type" 
            dismissible show>
            {{message}}
        </b-alert>

        <form @submit.stop.prevent="sendForm">
            <b-form-group label="Nome" v-show="!auth">
                <b-form-input type="text" placeholder="Nome completo" 
                    v-model="formData.name" required :state="validName"/>
            </b-form-group>

            <b-form-group label="Email">
                <b-form-input type="email" placeholder="email@example.com.br" 
                    v-model="formData.email" required trim :state="validEmail"/>
            </b-form-group>

            <b-form-group label="Senha">
                <b-form-input type="password" trim placeholder="Mínimo 6 caracteres" 
                    v-model="formData.password" required :state="validPassword"/>
            </b-form-group>

            <b-form-group v-show="!auth" label="Confirmar senha" >
                <b-form-input type="password" trim :state="passwordsMatch" 
                    v-model="formData.confirmation"/>
            </b-form-group>

            <p v-show="!auth">Possui uma conta? Clique aqui para 
                <a href="#registrar" @click="loginOrRegister">entrar</a></p>
            <p v-show="auth">Não tem uma conta? Clique aqui para se 
                <a href="#login" @click="loginOrRegister">registrar</a></p>
        </form>

    </b-modal>

</template>

<script>
    export default {
        data() {
            return {
                auth: true,
                message: '',
                type: '',
                formData: {
                    name: '',
                    email: '',
                    password: '',
                    confirmation: '',
                },
            }
        },

        computed: {
            validName() {
                return this.formData.name.search(' ') > 0 ? true : false
            },

            validEmail() {
                return this.formData.email.search('@') > 0 ? true : false
            },
            validPassword() {
                return this.formData.password.length > 5 ? true : false
            },

            passwordsMatch() {
                return this.validPassword && this.formData.password === this.formData.confirmation ? true : false
            },

            title() {
                return this.auth ? 'Fazer login' : 'Criar uma conta'
            },

            btnTitle() {
                return this.auth ? 'Login' : 'Registrar'
            },

            filledFields() {
                return this.validName && this.validEmail
                    && this.validPassword && this.passwordsMatch ? true : false 
            }
        },

        methods: {
            loginOrRegister() {
                this.auth = !this.auth;
            },

            handleOk(bvModalEvt) {
                bvModalEvt.preventDefault();
                this.sendForm()
            },

            sendForm() {
                !this.auth ? this.register() : this.authenticate()
            },

            register() {
                
                if (this.filledFields) {
                    let form = new FormData();

                    form.append('name',this.formData.name);
                    form.append('email',this.formData.email);
                    form.append('password',this.formData.password);

                    this.$http.post('register',form)
                    .then(res => {
                        alert(res.data)
                        this.resetModal();
                    })
                }

            },

            authenticate() {

                if (this.validEmail && this.validPassword) {

                    let form = new FormData();
                    form.append('email', this.formData.email);
                    form.append('password',this.formData.password)

                    this.$http.post('login',form)
                    .then(res => {
                        
                        if ('token' in res.data.response) {
                            this.$store.dispatch('saveToken',res.data.response.token);
                            this.$refs['auth'].hide();
                        } else {
                            this.message = 'Credenciais inválidas',
                            this.type = 'danger'
                        }

                    })
                }else {
                    alert('Os campos email e senha devem ser preenchidos!')
                }
            },

            resetModal() {
                this.formData.name = '',
                this.formData.email = '',
                this.formData.password = '',
                this.formData.confirmation = ''
            }
            
        }
        
    }
</script>