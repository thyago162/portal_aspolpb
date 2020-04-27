<template>
    <b-container>
        <b-row class="mt-2">
            <b-col>
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
                <b-button variant="primary" v-b-modal.form-social-network 
                    @click="resetModal" :style="{float: 'right'}">+ novo item</b-button>
            </b-col>
        </b-row>

        <b-row class="mt-3">
            <b-col>
                <b-table :fields="fields" hover :items="item" id="social-network-table" 
                    :current-page="currentPage" :per-page="perPage">

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

                <div class="overflow-auto">
                    <b-pagination
                        align="center"
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        aria-controls="social-network-table"
                    ></b-pagination>
                </div>
            </b-col>
        </b-row>
        <FormSocialNetwork :item="socialNetwork" />
    </b-container>
</template>

<script>
    import FormSocialNetwork from './FormSocialNetwork';


    export default {

        components: {
            FormSocialNetwork,

        },

        mounted() {
            this.$store.dispatch('socialNetwork');
        },

        data() {
            return {
                fields: [
                    {key: 'nm_title', label: 'Título', sortable: true},
                    {key: 'nm_link', label: 'Link'},
                    {key: 'dt_date', label: 'Data', sortable: true},
                    {key: 'edit', label: ''},
                    {key: 'delete', label: ''}
                ],
                socialNetwork: [],
                search: '',
                perPage: 5,
                currentPage: 1,
            }
        },

        computed: {

            item: function() {
                if (this.search.length > 0) {
                    return this.searchItem(this.$store.getters.getSocialNetwork);

                }else {
                    return this.$store.getters.getSocialNetwork;
                }
            },

            rows: function() {
                return this.item.length;
            }
        },

        methods: {
            editItem(item){
                this.socialNetwork = item
            },

            deleteItem (id){                
                if(confirm('Deseja realmente excluir?')) {
                    this.$http.delete('social-network/'+id, {
                        headers: {
                            Authorization: 'Bearer '+this.token
                        }
                    })
                    .then(res => {
                        if (res.status === 200) {

                             if (res.data.token_failure) {
                               this.countdown = 3;
                            }

                            this.$store.dispatch('socialNetwork')
                            this.$refs['socialnetwork'].hide()
                            
                        }
                    })
                    .catch(err => {
                        this.errors.push(err);
                    })
                }
            },

            resetModal() {
                this.socialNetwork.nm_title = '';
                this.socialNetwork.nm_link = '';
                this.socialNetwork.nm_image_path = '';
                this.socialNetwork.dt_date = '';
            },

            searchItem(arraySearch) {
               let result = new Array();

                for(var i=0; i < arraySearch.length; i++) {
                    if(
                        !arraySearch[i].nm_title.search(this.search)
                    ) {
                        result.push(arraySearch[i])
                    }
                }

                return result
            },
        }
        
    }
</script>