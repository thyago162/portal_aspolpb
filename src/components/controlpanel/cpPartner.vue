<template>
    <div>
        <b-modal id="cp-partner" ref="cppartner"  header-bg-variant="danger" header-text-variant="light"
            title="Parceiros e convênios" size="lg" footer-hide>
            <b-row>
                <b-col lg="2">
                    <font-awesome-icon icon="print" size="2x" class="icon alt mr-3"/>
                    <font-awesome-icon icon="file-csv" size="2x" class="icon alt"/>
                 </b-col>
                 <b-col lg="7">
                    <b-form-input type="search" class="partner-search" 
                        placeholder="Buscar por parceiro" />
                    <b-icon icon="search" class="search-icon" font-scale="1.5"></b-icon>
                 </b-col>
                 <b-col lg="3">
                     <b-button variant="success" @click="reload"  class="mr-3">
                         <b-icon icon="arrow-clockwise"></b-icon>
                     </b-button>

                     <b-button v-b-modal.form-partner variant="primary" @click="closeModal">
                         <b-icon icon="plus" ></b-icon>
                     </b-button>
                 </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-table :fields="fields" :items="partners" striped hover 
                        :per-page="perPage" :current-page="currentPage" class="partner-table">

                        <template v-slot:cell(edit)="row">
                            <b-button size="sm" class="mr-2" @click="editPartners(row.item)" 
                                variant="info" v-b-modal.form-news>
                                <b-icon icon="pen"></b-icon>
                            </b-button>
                        </template>

                        <template v-slot:cell(delete)="row">
                            <b-button size="sm" class="mr-2" @click="deletePartners(row.item)" variant="danger">
                                <b-icon icon="trash"></b-icon>
                            </b-button>
                        </template>
                    </b-table>
                    <div class="overflow-auto">
                        <b-pagination
                            v-model="currentPage"
                            :total-rows="rows"
                            :per-page="perPage"
                            aria-controls="my-table"
                        ></b-pagination>
                        </div>
                </b-col>
            </b-row>

        </b-modal>
        <FormPartner :partner="partner"/>
    </div>
</template>

<script>
    import FormPartner from '../partner/FormPartner';
    export default {

        components: {
            FormPartner
        },

        mounted() {
            this.$store.dispatch('partners');
        },

        data() {
            return {
                fields: [
                    {key: 'nm_title', label: 'Parceiro'},
                    {key: 'edit', label: ''},
                    {key: 'delete', label: ''}
                ],
                perPage: 5,
                currentPage: 1,
                partner: []
            }
        },

        computed: {
            partners() {
                return this.$store.getters.getPartners;
            },
            rows() {
                return ''
            },
            token: function() {
                return this.$session.get('jwt');
            }
        },

        methods: {
            reload(){},
            closeModal(){},
            editPartners(item){
                this.partner = item;

            },
            deletePartners(item){
                this.$http.delete('partner/'+item.id_partner, {
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {
                    res
                })
                .catch(err => {
                    err
                })
            }
        }
        
    }
</script>

<style scoped>

    .partner-table {
        margin-top: 20px;
    }

    .partner-search {
        width: 80%;
        text-indent: 12px;
    }

    .search-icon {
        position: absolute;
        margin-top: -33px;
        margin-left: 2px;
    }

</style>