<template>
    <b-modal title="Novo item" id="new-management-form" 
        ref="new-management-ref" size="lg" @ok="handleOk" header-bg-variant="info" header-text-variant="light">

        <template v-slot:modal-footer="{ok}">
            <b-button variant="danger" size="md" @click="ok()">
                <span :style="{fontWeight: 'bolder'}">Salvar</span>
                <b-spinner small label="Small Spinner" class="ml-1" v-show="loading"></b-spinner>
            </b-button>
        </template>

        <ErrorMessage :errors="errors" :visibility="visibility" />

        <form @submit.stop.prevent="formSubmited">
            <b-form-group label="Título">
                <b-form-input type="text" v-model="form.nm_management_name"/>
            </b-form-group>

            <b-row>
                <b-col>
                    <b-form-group label="Início do mandato">
                        <b-form-input type="date" v-model="form.nu_start"/>
                    </b-form-group>
                </b-col>

                <b-col>
                    <b-form-group label="Fim do mandato">
                        <b-form-input type="date" v-model="form.nu_end" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-form-group>
                <VueEditor  v-model="form.nm_content"/>
            </b-form-group>
        </form>

        <SessionOff ref="session" />
        <ModalError ref="error" :errors="errors" />

    </b-modal>
</template>

<script>

    import {VueEditor} from 'vue2-editor';
    import SessionOff from '../session/Session';
    import ModalError from '../error/ModalError'

    export default {

        components: {
            VueEditor,
            SessionOff,
            ModalError
        },

        computed: {
            token: function() {
                return this.$session.get('jwt');
            }
        },

        data() {
            return {
                form: {
                    nm_management_name: '',
                    nu_start: '',
                    nu_end: '',
                    nm_content: ''
                },
                loading: false,
                errors: {},
                visibility: false
            }
        },

        methods: {
            handleOk(bvModalEvt) {
                bvModalEvt.preventDefault();
                this.formSubmited();
            },

            formSubmited() {
                this.loading = true;

                if (!this.form.id_transparency) {
                    this.save()
                } else {
                    this.update()
                }

            },

            save() {
                let form = new FormData();

                form.append('nm_management_name',this.form.nm_management_name)
                form.append('nm_content', this.form.nm_content);
                form.append('nu_start',this.form.nu_start);
                form.append('nu_end', this.form.nu_end);

                this.$http.post('transparency',form, {
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        this.loading = false;
                        
                         if (res.data.token_failure) {
                           this.$refs.session.$refs.session.show()
                        }

                        if(res.data.result.error) {
                            this.$refs.error.$refs['modal-error'].show();
                            this.errors = res.data.result;

                        }else {
                            this.$store.dispatch('transparency', this.token)
                            this.$refs['new-management-ref'].hide()
                        }
                        
                    }
                })

            }, 

            update() {

            }
        }
        
    }
</script>

<style scoped>

</style>