<template>
    <b-modal id="form-history" ref="form-history" header-bg-variant="success" header-text-variant="light" 
        title="Nossa história" size="xl" @ok="handleOk" ok-only>

        <template v-slot:modal-footer="{ok}">
             <b-button variant="danger" size="md" @click="ok()">
                <span :style="{fontWeight: 'bolder'}">Salvar</span>
                <b-spinner small label="Small Spinner" class="ml-1" v-show="loading"></b-spinner>
            </b-button>
        </template>

        <ErroMessage :errors="errors" :visibility="visibility" />

        <form @submit.stop.prevent="formSubmited">
            <b-form-group label="Conteúdo">
                <vue-editor v-model="form.nm_content"></vue-editor>
            </b-form-group>
        </form>

    </b-modal>
</template>

<script>
    import { VueEditor } from 'vue2-editor'
    import ErroMessage from '../../error/ErrorMessage';
    export default {

        props: ['item'],

        data() {
            return {
                errors: [],
                loading: false,
                visibility: false
            }
        },

        components: {
            VueEditor,
            ErroMessage
        },

        computed: {

            token: function() {
                return this.$session.get('jwt');
            },

            form: function() {
                return this.item
            }
        },

        methods: {
            handleOk(bvEvtModal) {
                bvEvtModal.preventDefault();
                this.formSubmited();
                
            },

            formSubmited() {

                if (!this.form.id_our_history) {
                    this.save();
                }else {
                    this.update();
                }
            },

            save() {

                let form = new FormData();
                form.append('nm_content',this.form.nm_content)

                this.$http.post('our-history',form,{
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {
                    if (res.status === 200) {
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
                            this.$store.dispatch('ourHistory');
                            this.$refs['form-history'].hide();
                        }
                        
                    }
                })

            },

            update() {

                this.$http.put('our-history/'+this.form.id_our_history,{
                    'nm_content': this.form.nm_content
                },{
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.token_failure) {
                            alert('Sessão expirada... Você será redirecionado!')
                            this.$router.push('/');
                            this.$session.destroy();
                            this.$store.disptach('logout');
                        }

                        if(res.data.result.error) {
                            this.errors.push(res.data.result.error);
                            this.visibility = true;

                        }else {
                            this.$store.dispatch('ourHistory');
                            this.$refs['form-history'].hide();
                        }
                    }
                })

            },

        }
        
    }
</script>