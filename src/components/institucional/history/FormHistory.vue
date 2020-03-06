<template>
    <b-modal id="form-history" ref="form-history" 
        title="Nossa história" size="xl" @ok="handleOk">

        <form @submit.stop.prevent="formSubmited">
            <b-form-group label="Conteúdo">
                <vue-editor v-model="form.nm_content"></vue-editor>
            </b-form-group>
        </form>

    </b-modal>
</template>

<script>
    import { VueEditor } from 'vue2-editor'
    export default {

        props: ['item'],

        components: {
            VueEditor
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
                        this.$store.dispatch('ourHistory');
                        this.$refs['form-history'].hide();
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
                        this.$store.dispatch('ourHistory');
                        this.$refs['form-history'].hide();
                    }
                })

            },

        }
        
    }
</script>