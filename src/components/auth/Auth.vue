<template>

    <b-modal id="auth" :title="title" @ok="handleOk" @reset="resetModal" 
        @cancel="resetModal" :ok-title="btnTitle" ref="auth" header-bg-variant="danger" header-text-variant="white">
        
        <ErroMessage :errors="errors" :visibility="visibility" />

        <form @submit.stop.prevent="sendForm">
            <b-form-group label="Nome" v-show="!auth">
                <b-form-input type="text" placeholder="Nome completo" 
                    v-model="formData.name" required  min="10" />
            </b-form-group>

            <b-form-group label="Email">
                <b-form-input type="email" placeholder="email@example.com.br" 
                    v-model="formData.email" required trim />
            </b-form-group>

            <b-link @click="closeModal" v-show="auth" :style="{position: 'absolute', marginLeft: '65%'}" v-b-modal.reset-password>Esqueceu a senha?</b-link>

            <b-form-group label="Senha">
                <b-input-group>
                    <b-form-input trim placeholder="Minimo de 6 caracteres" 
                        v-model="formData.password" min="6" id="password" :type="type"/>
                    <b-input-group-append>
                        <b-button variant="dark" @click="showPasswordValue">
                            <b-icon icon="eye" v-show="showPassword"></b-icon>
                            <b-icon icon="eye-slash" v-show="!showPassword"></b-icon>
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-form-group>

            <b-popover target="password" triggers="hover" placement="top">
                <template v-slot:title>A senha deve conter</template>
             
                <p>
                    Pelo menos 1 caractere especial 
                </p>
                <p>
                    Pelo menos 1 letra maiscula
                </p>
                <p>
                    Pelo menos 1 letra minuscula
                </p>
                <p>
                    Pelo menos 1 número
                </p>
            </b-popover>

            <b-form-group v-show="!auth" label="Confirmar senha">
                <b-input-group>
                    <b-form-input trim placeholder="Minimo de 6 caracteres" 
                        v-model="formData.confirmation" min="6" id="password" :type="type"/>
                    <b-input-group-append>
                        <b-button variant="dark" @click="showPasswordValue">
                            <b-icon icon="eye" v-show="showPassword"></b-icon>
                            <b-icon icon="eye-slash" v-show="!showPassword"></b-icon>
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-form-group>

            <p v-show="!auth">Possui uma conta? Clique aqui para 
                <a href="#registrar" @click="loginOrRegister">entrar</a></p>
            <p v-show="auth">Não tem uma conta? Clique aqui para se 
                <a href="#login" @click="loginOrRegister">registrar</a></p>
        </form>

    </b-modal>

</template>

<script>
    import ErroMessage from '../error/ErrorMessage';
    
    export default {

        components: {
            ErroMessage
        },

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
                showPassword: false,
                type: 'password'
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

            showPasswordValue() {
                this.showPassword = !this.showPassword
                this.showPassword == true ? this.type = 'text' : this.type = 'password'
                
            },

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

                if (this.passwordsMatch()) {

                    //this.$store.dispatch('loading',true);
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
                            //this.$store.dispatch('loading', false);
                            this.errors.push(res.data.response.error);
                            this.visibility = true;
                        }
                            
                    })
                    .catch(err => {
                        //this.$store.dispatch('loading', false);
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
                        this.$session.set('user',res.data.response.user);

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

            passwordsMatch() {
                if (this.formData.password != this.formData.confirmation) {
                    alert('As senhas não coincidem')

                } else {
                    return true;
                }
                
            },

            closeModal() {
                this.$refs['auth'].hide();
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