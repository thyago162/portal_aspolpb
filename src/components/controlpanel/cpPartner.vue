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
            <ErroMessage :errors="errors" :visibility="visibility" />

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
        <SessionOff ref="session" />
    </div>
</template>

<script>

    import FormPartner from '../partner/FormPartner';
    import ErroMessage from '../error/ErrorMessage';
    import SessionOff from '../session/Session';

    export default {

        components: {
            FormPartner,
            ErroMessage,
            SessionOff
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
                search: '',
                errors: [],
                visibility: false,
                countdown: 0
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
                this.partner.nm_image_path = '';
            },

            editPartners(item){
                this.partner = item;

            },

            deletePartners(item){
                if (confirm("Deseja realmente excluir?")) {
                    this.$http.delete('partner/'+item.id_partner, {
                        headers: {
                            Authorization: 'Bearer '+this.token
                        }
                    })
                    .then(res => {
                        
                        if (res.status === 200) {
                            if (res.data.token_failure) {
                                this.$refs.session.$refs.session.show()
                            }

                            if(res.data.result.error) {
                                this.errors.push(res.data.result.error);
                                this.visibility = true;

                            }else {
                                this.$store.dispatch('partners')
                            }
                        }
                    })
                    .catch(err => {
                        this.errors.push(err);
                        this.visibility = true;
                    })
                }
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