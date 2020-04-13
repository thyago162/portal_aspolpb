<template>
    <b-modal hide-header @ok="handleOk" id="reset-password" 
     header-bg-variant="danger" cancel-title="Fechar" :ok-title="btnTitle[step]" header-text-variant="light">
        <b-container fluid>
              <b-row>
                <b-col class="logo">
                    <b-img :src="image" width="250px" height="120px"></b-img>
                </b-col>
            </b-row>

            <b-row class="mt-3">
                <b-col >
                    <div>
                        <form @submit.stop.prevent="formSubmited">

                            <transition name="slide-fade">
            
                                <div v-if="step === 0">
                                    <b-form-group label="Entre com o seu e-mail">
                                        <b-form-input type="email" v-model="email" placeholder="Ex: exemplo@email.com"/>
                                    </b-form-group>
                                </div>

                                <div v-if="step === 1">
                                    <b-form-group label="Informe o código de 4 digitos enviado para o seu e-mail">
                                        <b-form-input type="text" v-model="code" />
                                    </b-form-group>
                                </div>

                                <div v-if="step === 2">
                                    <b-form-group label="Nova senha">
                                        <b-form-input type="password" v-model="password"/>
                                        {{password}}
                                    </b-form-group>

                                    <b-form-group label="Confirmar senha">
                                        <b-form-input type="password" v-model="repeatPassword" />
                                        {{repeatPassword}}
                                    </b-form-group>
                                </div>

                            </transition>

                        </form>
                    </div>

                </b-col>
            </b-row>

        </b-container>
        
    </b-modal>
</template>

<script>
    export default {
        data() {
            return {
                step: 0,
                btnTitle: [
                    'Enviar',
                    'Confirmar',
                    'Resetar'
                ],
                email: '',
                password: '',
                repeatPassword: '',
                code: '',
                user: [],
                erros: [],
                image: require('../../assets/images/logo_aspol_02.png')
            }
        },

        methods: {
            handleOk(bvModalEvt){
                bvModalEvt.preventDefault();
                this.formSubmited();

            },

            passwordsMatch() {
                this.password == this.repeatPassword ? true : false
            },

            formSubmited() {
          
                if (this.step === 0) {
                    this.stepOne();

                }else if (this.step === 1) {
                    this.stepTwo();

                }else {

                    if (this.passwordsMatch()) {
                        this.stepThree()

                    }else {
                        alert('As senhas não coicidem')
                    }
                    
                }
            },

            stepOne() {

                let form = new FormData();
                form.append('email', this.email);

                this.$http.post('reset-password-email',form)
                .then(res => {
                    if (res.status === 200) {
                        alert('Email enviado com successo.')
                        this.step = 1;
                        this.user = res.data.result.user;
                    }
                })
                
            },

            stepTwo() {
                let form = new FormData();
                form.append('token', this.code)
                form.append('id',this.user.id_user)

                this.$http.post('reset-password-code',form)
                .then(res => {
                    if (res.status === 200) {
                        alert('Token verificado!')
                        this.step = 2;
                    }
                })
            },

            stepThree() {
                let form = new FormData();
                form.append('id',this.user.id_user);
                form.append('step',this.step);

                this.$http.post('reset-password',form)
                .then(res => {
                    if (res.status === 200) {
                        alert('A senha foi resetada.')
                        this.$refs['reset-password'].hide();
                    }
                })
                .catch(err => {
                    err
                })

            }
        }
        
    }
</script>

<style scoped>
    .logo {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .body {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active em versões anteriores a 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }

</style>