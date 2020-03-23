<template>
    <b-modal title="Novo item" id="new-management-form" 
        ref="new-management-ref" size="lg" @ok="handleOk">

        <form @submit.stop.prevent="formSubmited">
            <b-form-group label="Título">
                <b-form-input type="text" v-model="form.nm_management_name"/>
            </b-form-group>

            <b-row>
                <b-col>
                    <b-form-group label="Início do mandato">
                        <b-form-input type="number" v-model="form.nu_start"/>
                    </b-form-group>
                </b-col>

                <b-col>
                    <b-form-group label="Fim do mandato">
                        <b-form-input type="number" v-model="form.nu_end" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-form-group>
                <VueEditor  v-model="form.nm_content"/>
            </b-form-group>
        </form>

    </b-modal>
</template>

<script>
    import {VueEditor} from 'vue2-editor';
    export default {

        components: {
            VueEditor
        },

        computed: {
            token: function() {
                return this.$session.get('jwt');
            }
        },

        data() {
            return {
                form: {}
            }
        },

        methods: {
            handleOk(bvModalEvt) {
                bvModalEvt.preventDefault();
                this.formSubmited();
            },

            formSubmited() {

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
                        this.$store.dispatch('transparency', this.token)
                        this.$refs['new-management-ref'].hide()
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