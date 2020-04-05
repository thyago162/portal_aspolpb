<template>
    <b-container fluid>
        <b-row >
           <b-col class="title">
                <h5 class="mt-2">SUGESTÕES</h5>
           </b-col>
        </b-row>

        <b-row class="mb-4 mt-4 ">
            <b-col  class="suggestion-form">
                <form class="form" @submit.stop.prevent="sendForm">
                    <b-form-group label="Nome completo">
                        <b-form-input readonly  v-model="user.name"/>
                    </b-form-group>

                    <b-form-group label="E-mail">
                        <b-form-input readonly v-model="user.email" />
                    </b-form-group>

                    <b-form-group label="Assunto">
                        <b-form-input v-model="subject" required type="text"></b-form-input>
                    </b-form-group>

                    <b-form-group label="Conteúdo">
                        <b-form-textarea required rows="10" v-model="content"></b-form-textarea>
                    </b-form-group>

                    <b-button variant="danger" :style="{width: '100%'}" type="submit">
                        Enviar
                     <b-spinner small label="Small Spinner" class="ml-1" v-show="loading"></b-spinner>
                    </b-button>
                </form>
            </b-col>
        </b-row>
         <Session :countdown="countdown" />
    </b-container>
</template>

<script>
    import Session from '../../components/session/Session'

    export default {

        components: {
            Session
        },

        computed: {
            user: function() {
                return this.$session.get('user');
            },

            token: function() {
                return this.$store.getters.getToken;
            }
        },
        
        data() {
            return {
                subject: '',
                content: '',
                countdown: 0,
                loading: false
            }
        },

        methods: {
            sendForm(){
                this.loading = true;

                let form = new FormData();
                form.append('name', this.user.name);
                form.append('email', this.user.email);
                form.append('subject', this.subject);
                form.append('content', this.content);

                this.$http.post('suggestion',form, {
                    headers: {
                        Authorization: 'Bearer '+'token'
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        this.loading = false;

                        if (res.data.token_failure) {
                            this.countdown = 3;

                        }else {
                            alert('E-mail enviado com sucesso!')
                            location.reload()
                        }
                    }
                })
                .catch(err => {
                    alert(err)
                })
            }  
        }   
    }
</script>

<style scoped> 
    h5 {
        margin-top: 10px;
    }

    .suggestion-form {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .suggestion-form form {
        width: 60%;
    }

    @media screen and (max-width: 414px) {
        
        .suggestion-form {
            justify-content: center;
            align-items: center;
        }

        .suggestion-form form {
            width: 100%;
        }
        
    }

</style>