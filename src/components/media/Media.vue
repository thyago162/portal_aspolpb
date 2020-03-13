<template>
    <b-container>
         <b-row class="mt-2">
            <b-col>
                <b-button variant="primary" v-b-modal.form-media >+ novo</b-button>
            </b-col>
        </b-row>

        <b-row class="mt-4">
            <b-col>
                <b-table :fields="fields" :items="media" hover>

                     <template v-slot:cell(edit)="row" > 
                        <b-button size="sm"  @click="editItem(row.item)" 
                            variant="info" v-b-modal.form-media class="ml-1">
                            <b-icon icon="pen"></b-icon>
                        </b-button>
                    </template>

                    <template v-slot:cell(delete)="row" >
                        <b-button size="sm"  @click="deleteItem(row.item.id_media)" variant="danger">
                            <b-icon icon="trash"></b-icon>
                        </b-button>
                    </template>
                </b-table>
            </b-col>
        </b-row>
        <FormMedia :media="item"/>
    </b-container>
</template>

<script>
    import FormMedia from '../media/FormMedia';
    export default {

        components: {
            FormMedia
        },

        mounted() {
            this.$store.dispatch('media');
        },

        data() {
            return {
                fields: [
                    {key: 'nm_title', label: 'Título', sortable: true},
                    {key: 'nm_subtitle', label: 'Subtitulo'},
                    {key: 'dt_date', label: 'Data'},
                    {key: 'edit', label: ''},
                    {key: 'delete', label: ''}
                ],
                item: [],
                errors: []
            }
        },

        computed: {
            media: function() {
                return this.$store.getters.getMedia;
            },
            token: function() {
                return this.$session.get('jwt');
            }
        },

        methods: {
            editItem(item) {
                this.item = item;
            },

            deleteItem(id) {
                this.$http.delete('media/' + id, {
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        this.$store.dispatch('media')
                    }
                })
                .then(err => {
                    err
                })
            }
        }
        
    }
</script>

<style scoped>

</style>