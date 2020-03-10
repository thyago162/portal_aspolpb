<template>
   <div>
       <b-modal id="cp-agreement" ref="agreement" title="CONVÊNIOS" size="xl" 
        hide-footer header-bg-variant="dark" header-text-variant="light">
           <b-container>
               <b-row>
                   <b-col >   
                        <b-form-input type="search" placeholder="Buscar..."/>
                   </b-col>

                   <b-col>
                       <b-button variant="primary" v-b-modal.form-agreement>
                           + Novo item
                       </b-button>
                   </b-col>
               </b-row>
               <b-row class="mt-4">
                   <b-col>
                       <b-table :fields="fields" :items="agreement">
                           <template v-slot:cell(edit)="row">
                               <b-button variant="warning" @click="editItem(row.item)" v-b-modal.form-agreement>
                                   <b-icon icon="pencil" ></b-icon>
                               </b-button>
                           </template>

                           <template v-slot:cell(remove)="row">
                               <b-button variant="danger" @click="removeItem(row.item.id_agreement)">
                                   <b-icon icon="trash" ></b-icon>
                               </b-button>

                           </template>
                       </b-table>
                   </b-col>
               </b-row>
           </b-container>
       </b-modal>

       <FormAgreement :item="item"  />
   </div>
</template>

<script>
    import FormAgreement from '../agreement/FormAgreement';
    export default {

        components: {
            FormAgreement
        },

        mounted() {
            this.$store.dispatch('agreement');
        },

        computed: {
            agreement: function() {
                return this.$store.getters.getAgreement;
            },

            token: function() {
                return this.$session.get('jwt');
            }
        },
        data() {
            return {
                fields: [
                    {key: 'nm_title', label: 'Nome'},
                    {key: 'nm_category', label: 'Categoria'},
                    {key: 'edit', label: ''},
                    {key: 'remove', label: ''}
                ],
                item: []
            }
        },

        methods: {
            editItem(item) {
                this.item = item
            },

            removeItem(id) {
                this.$http.delete('agreement/'+id, {
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {
                    alert(res.status)
                    if (res.status === 200) {
                        this.$store.dispatch('agreement')
                    }

                })
                .catch(err => {
                    alert(err)
                })
            }
        }
    }
</script>