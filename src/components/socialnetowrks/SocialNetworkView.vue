<template>
    <b-container>
        <b-row class="mt-2">
            <b-col>
                <b-button variant="primary" v-b-modal.form-social-network>+ novo</b-button>
            </b-col>
        </b-row>
        <b-row class="mt-3">
            <b-col>
                <b-table :fields="fields" hover :items="item">

                    <template v-slot:cell(edit)="row" > 
                        <b-button size="sm"  @click="editItem(row.item)" 
                            variant="info" v-b-modal.form-social-network class="ml-1">
                            <b-icon icon="pen"></b-icon>
                        </b-button>
                    </template>

                    <template v-slot:cell(delete)="row" >
                        <b-button size="sm"  @click="deleteItem(row.item.id_social_network)" variant="danger">
                            <b-icon icon="trash"></b-icon>
                        </b-button>
                    </template>

                    <template v-slot:cell(dt_date)="row" >
                        {{row.item.dt_date | date }}
                    </template>
                </b-table>
            </b-col>
        </b-row>
        <FormSocialNetwork :item="socialNetwork" />
    </b-container>
</template>

<script>
    import FormSocialNetwork from './FormSocialNetwork';
    export default {

        components: {
            FormSocialNetwork
        },

        mounted() {
            this.$store.dispatch('socialNetwork');
        },

        data() {
            return {
                fields: [
                    {key: 'nm_title', label: 'Título'},
                    {key: 'nm_link', label: 'Link'},
                    {key: 'dt_date', label: 'Data'},
                    {key: 'edit', label: ''},
                    {key: 'delete', label: ''}
                ],
                socialNetwork: []
            }
        },

        computed: {
            item: function() {
                return this.$store.getters.getSocialNetwork
            }
        },

        methods: {
            editItem(item){
                this.socialNetwork = item
            },
            deleteItem(){}
        }
        
    }
</script>