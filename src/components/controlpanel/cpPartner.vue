<template>
    <div>
        <b-modal id="cp-partner" ref="cppartner"  header-bg-variant="danger" header-text-variant="light"
            title="Parceiros e convênios" size="lg" hide-footer @hidden="resetModal">
            <b-row>
                 <b-col lg="8">
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
                
                    <b-button v-b-modal.form-partner variant="primary" 
                        @click="resetModal" :style="{float: 'right'}">
                         <b-icon icon="plus" ></b-icon>
                         novo item
                    </b-button>

                 </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-table :fields="fields" :items="partners" striped hover 
                        :per-page="perPage" :current-page="currentPage" class="partner-table">

                        <template v-slot:cell(edit)="row">
                            <b-button size="sm" class="ml-1" @click="editPartners(row.item)" 
                                variant="info" v-b-modal.form-partner>
                                <b-icon icon="pen"></b-icon>
                            </b-button>
                        </template>

                        <template v-slot:cell(delete)="row">
                            <b-button size="sm"  @click="deletePartners(row.item)" variant="danger">
                                <b-icon icon="trash"></b-icon>
                            </b-button>
                        </template>

                    </b-table>
                    <div class="overflow-auto">
                        <b-pagination
                            align="center"
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
                    {key: 'nm_link', label: 'Site'},
                    {key: 'edit', label: ''},
                    {key: 'delete', label: ''}
                ],
                perPage: 5,
                currentPage: 1,
                partner: [],
                search: ''
            }
        },

        computed: {

            partners() {

                if (this.search.length > 0 ) {

                   return this.searchItems(this.$store.getters.getPartners);
               }else {

                    return this.$store.getters.getPartners;
               }
                
            },

            rows() {
                return this.partners.length;
            },

            token: function() {
                return this.$session.get('jwt');
            }
        },

        methods: {

            resetModal(){
                this.partner.nm_title = '';
                this.partner.nm_link = '';
            },

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
                    
                    if (res.status === 200) {
                        this.$store.dispatch('partners')
                    }
                })
                .catch(err => {
                    err
                })
            },

            searchItems(arraySearch) {
                let result = new Array();

                for(var i=0; i < arraySearch.length; i++) {
                    if(
                        !arraySearch[i].nm_title.search(this.search) 
                    ) {
                        result.push(arraySearch[i])
                    }
                }

                return result
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