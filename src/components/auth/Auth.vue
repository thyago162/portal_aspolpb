<template>

    <b-modal id="auth" :title="title" @ok="handleOk" @reset="resetModal" 
        @cancel="resetModal" :ok-title="btnTitle" ref="auth" header-bg-variant="danger" header-text-variant="white">
        <b-alert variant="danger" :show="visibility" 
            v-for="error in errors" :key="error" 
            dismissible >{{error}}</b-alert>

        <form @submit.stop.prevent="sendForm">
            <b-form-group label="Nome" v-show="!auth">
                <b-form-input type="text" placeholder="Nome completo" 
                    v-model="formData.name" required :state="validate.name" min="10" />
            </b-form-group>

            <b-form-group label="Email">
                <b-form-input type="email" placeholder="email@example.com.br" 
                    v-model="formData.email" required trim :state="validate.email"/>
            </b-form-group>
               
            <b-form-group label="Senha">
                <b-form-input type="password" trim placeholder="Mínimo 6 caracteres" 
                    v-model="formData.password" required :state="validate.password" 
                    min="6" id="password"/>
            </b-form-group>

            <b-popover target="password" triggers="hover" placement="top">
                <template v-slot:title>A senha deve conter</template>
                <p>
                    <b-icon icon="check" variant="success" v-show="this.validate.size"></b-icon>
                    <b-icon icon="x" variant="danger" v-show="!this.validate.size"> </b-icon>
                    Pelo menos 6 caracteres
                </p>
                <p>
                    <b-icon icon="check" variant="success" v-show="this.validate.special"></b-icon>
                    <b-icon icon="x" variant="danger" v-show="!this.validate.special"> </b-icon>
                    Pelo menos 2 caractere especial 
                </p>
                <p>
                    <b-icon icon="check" variant="success" v-show="this.validate.upercase"></b-icon>
                    <b-icon icon="x" variant="danger" v-show="!this.validate.upercase"> </b-icon>
                    Pelo menos 1 letra maiscula
                </p>
                <p>
                    <b-icon icon="check" variant="success" v-show="this.validate.lowercase"></b-icon>
                    <b-icon icon="x" variant="danger" v-show="!this.validate.lowercase"> </b-icon>
                    Pelo menos 1 letra minuscula
                </p>
                <p>
                    <b-icon icon="check" variant="success" v-show="this.validate.number"></b-icon>
                    <b-icon icon="x" variant="danger" v-show="!this.validate.number"> </b-icon>
                    Pelo menos 1 número
                </p>
            </b-popover>

            <b-form-group v-show="!auth" label="Confirmar senha" >
                <b-form-input type="password" trim :state="validate.confirmation"  
                    v-model="formData.confirmation" 
                    placeholder="Confirme a senha" min="6"/>
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
                visibility: false,
                errors: [],
                formData: {
                    name: '',
                    email: '',
                    password: '',
                    confirmation: '',
                },
                validate: {},
                securityPass: {
                    lowercase: new RegExp("(?=.*[a-z])"),
                    upercase: new RegExp("(?=.*[A-Z])"),
                    number: new RegExp("(?=.*[0-9])"),
                    special: new RegExp("(?=.[!@#$%^&.;_])")
                }
            }
        },

        computed: {
      
            title() {
                return this.auth ? 'Fazer login' : 'Criar uma conta'
            },

            btnTitle() {
                return this.auth ? 'Login' : 'Registrar'
            },

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

                let formValidate = this.filledFields()

                if(formValidate) {
                    this.$store.dispatch('loading',true);
                    let form = new FormData();

                    form.append('name',this.formData.name);
                    form.append('email',this.formData.email);
                    form.append('password',this.formData.password);

                    this.$http.post('register',form)
                    .then(res => {
                        if (res.status === 200 && res.data.response.token) {
                            //this.$store.dispatch('loading', false);
                            this.$refs['auth'].hide();
                            this.resetModal();
                            this.auth = true;
                            alert('Usuário cadastrado com sucesso')
                        }else {
                            this.$store.dispatch('loading', false);
                            this.errors.push(res.data.response.error);
                            this.visibility = true;
                        }
                        
                    })
                    .catch(err => {
                        this.$store.dispatch('loading', false);
                        this.errors.push(err)
                        this.visibility = true;
                    })
                }    
            },

            authenticate() {

                this.$store.dispatch('loading',true);
                let form = new FormData();
                form.append('email', this.formData.email);
                form.append('password',this.formData.password);

                this.$http.post('login',form)
                .then(res => {
                    this.$store.dispatch('loading', false);
                    
                    if ('token' in res.data.response) {

                        this.$session.start();
                        this.$session.set('jwt',res.data.response.token);

                        this.$store.dispatch('saveToken',res.data.response.token);
                        location.reload()
                    } else {
                        
                        this.errors.push(res.data.response.error);
                        this.visibility = true;
                    }
                    })
                    .catch(err => {
                        this.errors.push(err)
                        this.visibility = true;
        
                    })
               
            },

            resetModal() {
                this.formData.name = '',
                this.formData.email = '',
                this.formData.password = '',
                this.formData.confirmation = ''
            },

            validateName() {
                if (this.formData.name.search(" ") <= 0) {
                    this.errors.push("Nome e sobrenome obrigatórios");
                    this.validate.name = false;

                }else {
                    this.validate.name = true;
                }

            },

            validateEmail() {
                if (this.formData.email.search('@') <= 0) {
                    this.errors.push('Formato de email inválido');
                    this.validate.email = false;
                }else {
                    this.validate.email = true
                }

            },

            validatePassword() {
                if (this.formData.password.length >= 6 ) {
                    this.validate.size = true;

                    if (this.securityPass.lowercase.test(this.formData.password)) {
                        this.validate.lowercase = true;
                        
                        if (this.securityPass.upercase.test(this.formData.password)) {
                            this.validate.upercase = true;

                            if (this.securityPass.number.test(this.formData.password)) {
                                this.validate.number = true;

                                if (this.securityPass.special.test(this.formData.password)) {
                                    this.validate.password = true;
                                    this.validate.special = true;
                                    
                                } else {
                                    this.validate.special = false;
                                    this.validate.password = false;
                                }
                            } else {        
                                this.validate.number = false;
                                this.validate.password = false;
                            }

                        }else {    
                            this.validate.upercase = false;
                            this.validate.password = false;
                        }

                    }else {
                        this.validate.lowercase = false;
                        this.validate.password = false;
                    }
                } else {
                    this.validate.size = false;
                    this.validate.password = false;
                }

            },

            passwordsMatch() {
                if (this.formData.password != this.formData.confirmation) {
                    this.errors.push("As senhas não coincidem");
                    this.validate.confirmation = false;

                } else {
                    this.validate.confirmation = true;
                }
                
            },

            filledFields() {
                this.validateName()
                this.validateEmail()
                this.validatePassword()
                this.passwordsMatch()

                if (this.validate.name && this.validate.email && this.validate.password && this.validate.confirmation) {
                    return true;
                }else {
                    this.visibility = true;
                    return false;
                }
            }
        }

        
    }
</script>

<style scoped>
    .loading {
        position: absolute;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>