<template>
    <b-container>
        <b-row>
            <b-col lg="12">
                <b-button size="sm" variant="primary" 
                    v-b-modal.about-form style="float: right">+ Novo membro</b-button>
            </b-col>
        </b-row>

        <b-row>
            <b-col class="mt-3">
                <b-table :fields="fields" :items="about">
                    <template v-slot:cell(edit)="row">
                        <b-button @click="edit(row.item)" size="sm" v-b-modal.about-form>
                            <b-icon icon="pen"></b-icon>
                        </b-button>

                    </template>

                    <template v-slot:cell(delete)="row">
                        <b-button @click="edit(row.item)" size="sm" variant="danger">
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

        mounted() {
            this.$store.dispatch('about');
        },

        components: {
            AboutForm
        },

        computed: {
            about: function() {
                return this.$store.getters.getAbout;
            }
        },

        data() {
            return {
                fields: [
                    {key: 'nm_name', label: 'Nome', sortable: true},
                    {key: 'nm_office', label: 'Cargo'},
                    {key: 'nm_phone', label: 'Telefone'},
                    {key: 'fk_about', label: 'Departamento'},
                    {key: 'edit', label: ''},
                    {key: 'delete', label: ''}

                ],
                item: [],
            }
        },

        methods: {
            edit(item) {
                this.item = item;
            }
        }
        
    }
</script>