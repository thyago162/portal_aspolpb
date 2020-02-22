<template>
    <div>
        <b-modal size="xl" title="Usuários" id="cp-user" ref="cpuser" 
         hide-footer no-close-on-backdrop header-bg-variant="dark" header-text-variant="light">
         <b-container fluid>
             <b-row >
                 <b-col lg="3">
                    <font-awesome-icon icon="print" size="2x" class="icon alt mr-3"/>
                    <font-awesome-icon icon="file-csv" size="2x" class="icon alt"/>
                 </b-col>
                 <b-col lg="7">
                    <b-form-input type="search" class="user-search" 
                        placeholder="Buscar por usuário" />
                    <b-icon icon="search" class="search-icon" font-scale="1.5"></b-icon>
                 </b-col>
                 <b-col lg="2">
                     <b-button variant="success" class="mr-3">
                         <b-icon icon="arrow-clockwise"></b-icon>
                     </b-button>

                     <b-button  variant="primary" >
                         <b-icon icon="plus" ></b-icon>
                     </b-button>
                 </b-col>
             </b-row>
             <b-row class="user-table">
                 <b-col>
                     <b-table :fields="fields" :items="users" striped hover 
                        :per-page="perPage" :current-page="currentPage">
                        <template v-slot:cell(edit)="row">
                            <b-button size="sm" class="mr-2" @click="editUser(row.item)" 
                                variant="info" >
                                 <b-icon icon="pen"></b-icon>
                             </b-button>
                        </template>

                        <template v-slot:cell(delete)="row">
                            <b-button size="sm" class="mr-2" @click="deleteUser(row.item)" variant="danger">
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
         </b-container>
        </b-modal>
        
        
   </div>
</template>

<script>
    export default {

        created() {
            this.getUsers();
        },

        data() {
            return {
                perPage: 5,
                currentPage: 1,
                fields: [
                    {key: 'name', label: 'Nome', sortable: true},
                    {key: 'email', label: 'Email'},
                    {key: 'created_at', label: 'Data de registro'},
                    {key: 'edit', label: ''},
                    {key: 'delete', label: ''}
                ],
                users: []
            }
        },

        computed: { 

            rows: function() {
                return ''
            },

        },

        methods: {
            getUsers() {
                this.$http.get('users', {
                    headers: {
                        Authorization: 'Bearer '+this.$session.get('jwt')
                    }
                })
                .then(res => {
                    this.users = res.data.result.users;
                })
            },

            editUsers() {

            },

            deleteUser() {

            },

        }

        
    }
</script>

<style scoped>

    .user-table {
        margin-top: 20px;
    }

    .user-search {
        width: 80%;
        text-indent: 12px;
    }

    .search-icon {
        position: absolute;
        margin-top: -33px;
        margin-left: 2px;
    }
  
</style>