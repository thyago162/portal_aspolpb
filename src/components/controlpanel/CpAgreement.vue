<template>
   <div>
       <b-modal id="cp-agreement" ref="agreement" title="CONVÊNIOS" size="xl" 
        hide-footer header-bg-variant="dark" header-text-variant="light">
           <b-container>
               <b-row>
                   <b-col >   
                        <b-input-group>
                            <template v-slot:prepend>
                                <b-input-group-text>
                                    <b-icon icon="search"></b-icon>
                                </b-input-group-text>
                            </template>
                        <b-form-input v-model="search" />
                    </b-input-group>
                   </b-col>

                   <b-col>
                       <b-button variant="primary" v-b-modal.form-agreement 
                            :style="{float: 'right'}" 
                        >
                           + Novo item
                       </b-button>
                   </b-col>
               </b-row>

               <b-row class="mt-4">
                   <b-col>
                       <b-table :fields="fields" :items="agreement">
                           <template v-slot:cell(edit)="row">
                               <b-button variant="info" @click="editItem(row.item)" v-b-modal.form-agreement>
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
            FormAgreement,
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
            },

        },
        data() {
            return {
                fields: [
                    {key: 'nm_title', label: 'Nome'},
                    {key: 'nm_category', label: 'Categoria'},
                    {key: 'edit', label: ''},
                    {key: 'remove', label: ''}
                ],
                item: [],
                search: '',
                countdown: 0,
                errors: [],
                visibility: false
            }
        },

        methods: {
            editItem(item) {
                this.item = item
            },

            removeItem(id) {
                if (confirm('Dejesa realmente remover?')) {
                    this.$http.delete('agreement/'+id, {
                        headers: {
                            Authorization: 'Bearer '+this.token
                        }
                    })
                    .then(res => {
                        if (res.status === 200) {
                            if (res.data.token_failure) {
                                this.countdown = 3;
                            }

                            if (res.data.result.error) {
                                this.errors.push(res.data.result.error)
                                this.visibility = true;
                            }

                            this.$store.dispatch('agreement')
                        }

                    })
                    .catch(err => {
                        this.errors.push(err);
                    })
                }
            }
        }
    }
</script>