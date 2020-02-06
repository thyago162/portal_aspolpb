<template>
    <b-modal id="auth" :title="title" @ok="sendForm" @reset="resetModal" 
        @cancel="resetModal" :ok-title="btnTitle" >
        <form @submit.stop.prevent="handleOk">
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
                formData: {
                    name: '',
                    email: '',
                    password: '',
                    confirmation: ''
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
                this.auth ? this.register() : this.authenticate()
            },

            register() {

            },

            authenticate() {
                if (this.filledFields) {

                    let form = new FormData();
                    form.append('email', this.formData.email);
                    form.append('password',this.formData.password)

                    this.$http.post('login',form)
                    .then(res => {
                        
                        if ('error' in res.data) {
                            alert(res.data.error)
                        }

                        alert(res.data.token)
                    })
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