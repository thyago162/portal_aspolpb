<template>
    <b-container>
        <b-row>
            <b-col lg="12">
                <b-button size="sm" variant="primary" 
                    v-b-modal.about-form style="float: right" @click="resetModal()">+ Novo item</b-button>
            </b-col>
        </b-row>

        <b-row>
            <b-col class="mt-3">
                <b-table :fields="fields" :items="about">
                    <template v-slot:cell(edit)="row">
                        <b-button @click="edit(row.item)" size="sm" v-b-modal.about-form variant="info">
                            <b-icon icon="pen"></b-icon>
                        </b-button>

                    </template>

                    <template v-slot:cell(remove)="row">
                        <b-button @click="remove(row.item.id_about)" size="sm" variant="danger">
                            <b-icon icon="trash"></b-icon>
                        </b-button>

                    </template>
                </b-table>
            </b-col>
        </b-row>
        <AboutForm :about="this.item"/>
        
    </b-container>
</template>

<script>
    import AboutForm from './AboutForm';
    export default {

        created() {
            this.$store.dispatch('about');
        },

        components: {
            AboutForm,
        },

        computed: {
            about: function() {
                return this.$store.getters.getAbout;
            },

            token: function() {
                return this.$store.getters.getToken;
            }
        },

        data() {
            return {
                fields: [
                    {key: 'nm_name', label: 'Nome', sortable: true},
                    {key: 'nm_office', label: 'Cargo'},
                    {key: 'nm_ddd', label: 'DDD'},
                    {key: 'nm_phone', label: 'Telefone'},
                    {key: 'nm_advice', label: 'Departamento'},
                    {key: 'edit', label: ''},
                    {key: 'remove', label: ''}

                ],
                item: [],
                errors: [],
                loading: false,
            }
        },

        methods: {
            edit(item) {
                this.item = item;
            },

            remove(id) {
                this.loading = true;

                if (confirm("Deseja realmente exluir?")) {
                    this.$http.delete('about/'+id, {
                        headers: {
                            Authorization: 'Bearer '+this.token
                        }
                    })
                    .then(res => {
                        if (res.status === 200) {
                            this.loading = false;

                            if (res.data.token_failure) {
                                this.countdown = 3;
                            }

                            this.$store.dispatch('about');
                            this.visibility = true;
                            
                        }
                    })
                }
            },

            resetModal() {
                this.item.nm_name = '';
                this.item.nm_office = '';
                this.item.nm_ddd = '';
                this.item.nm_phone = '';
            }
        }
        
    }
</script>