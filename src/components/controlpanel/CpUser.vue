<template>
    <div>
        <b-modal size="xl" title="Usuários" id="cp-user" ref="cpuser" 
         hide-footer no-close-on-backdrop header-bg-variant="dark" header-text-variant="light">
         <b-container fluid>
             <b-row >
                 
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
                 <b-col lg="1">
                     <JsonCvs
                        :data="users">
                        <font-awesome-icon icon="file-csv" size="2x" class="icon alt" :style="{float: 'right'}"/>    
                     </JsonCvs>
                    
                 </b-col>
             </b-row>
             <b-row class="user-table">
                 <b-col>
                     <b-table :fields="fields" :items="users" striped hover 
                        :per-page="perPage" :current-page="currentPage">

                        <template v-slot:cell(created_at)="row">
                            <span v-if="row.item.created_at">{{row.item.created_at | fullDate}}</span>
                        </template>

                        <template v-slot:cell(delete)="row">
                            <b-button size="sm" class="mr-2" @click="deleteUser(row.item)" variant="danger">
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
         </b-container>
        </b-modal>
        
        
   </div>
</template>

<script>
    import JsonCvs from 'vue-json-csv'
    export default {

        components: {
            JsonCvs
        },

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
                users: [],
                search: ''
            }
        },

        computed: { 

            rows: function() {
                return this.users.length;
            },

            token: function() {
                return this.$store.getters.getToken;
            }

        },

        methods: {
            getUsers() {
                this.$http.get('users', {
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.token_failure) {
                                alert('Sessão expirada... Você será redirecionado!');
                                //this.$store.disptach('token', null);
                                this.$session.destroy();
                                //this.$store.disptach('logout');
                                this.$router.push('/');
                            }

                            if (res.data.result.error) {
                                this.errors.push(res.data.result.error);
                                this.visibility = true;

                            } else {
                                this.users = res.data.result.users;
                            }
                    }
                    
                })
            },

            deleteUser(id) {
                if(confirm('Deseja realmente excluir?')) {
                    this.$http.delete('user/'+id, {
                        headers: {
                            Authorization: 'Bearer '+this.token
                        }
                    })
                    .then(res => {
                        if (res.status === 200) {
                            if (res.data.token_failure) {
                                alert('Sessão expirada... Você será redirecionado!');
                                this.$store.disptach('token', null);
                                this.$session.destroy();
                                this.$store.disptach('logout');
                                this.$router.push('/');
                            }

                            if (res.data.result.error) {
                                this.errors.push(res.data.result.error);
                                this.visibility = true;

                            } else {
                                this.getUsers()
                            }


                        }
                    })
                }
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