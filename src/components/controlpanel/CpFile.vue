<template>
    <div>
        <b-modal id="cp-file" ref="cpfile"  header-bg-variant="success" 
            header-text-variant="light" title="Arquivos" 
                size="lg" hide-footer >
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
                
                    <b-button v-b-modal.form-file variant="primary" 
                        :style="{float: 'right'}">
                         <b-icon icon="plus" ></b-icon>
                         novo item
                    </b-button>

                 </b-col>
            </b-row>

            <Session :countdown="countdown"/>

            <b-row>
                <b-col>
                    <b-table  striped hover :fields="fields" :items="file"
                        :per-page="perPage" :current-page="currentPage" class="file-table"
                    >

                        <template v-slot:cell(created_at)="row">
                            <span>{{row.item.created_at | fullDate}}</span>
                        </template>

                        <template v-slot:cell(updated_at)="row">
                            <span>{{row.item.updated_at | fullDate}}</span>
                        </template>

                        <template v-slot:cell(edit)="row">
                            <b-button size="sm" class="ml-1" @click="editfiles(row.item)" 
                                variant="info" v-b-modal.form-file>
                                <b-icon icon="pen"></b-icon>
                            </b-button>
                        </template>

                        <template v-slot:cell(delete)="row">
                            <b-button size="sm"  @click="deletefiles(row.item)" variant="danger">
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

        <FormFile :item="file[0]" />
    </div>
</template>

<script>
    import FormFile from '../file/FormFile';
    import Session from '../session/Session'
    export default {

        components: {
            FormFile,
            Session
        },

        mounted() {
            this.$store.dispatch(
                'file',
                this.$store.getters.getToken
                );
        },

        data() {
            return {
                fields: [
                    {key: 'nm_name', label: 'Nome'},
                    {key: 'created_at', label: 'Data de criação'},
                    {key: 'updated_at', label: 'Última atualização'},
                    {key: 'edit', label: ''},
                    {key: 'delete', label: ''}
                ],
                perPage: 5,
                currentPage: 1,
                search: '',
                countdown: 0
            }
        },

        computed: {

            file() {

                if (this.search.length > 0 ) {

                   return this.searchItems(this.$store.getters.getfile);
                }else {
                    return this.$store.getters.getFile;
                }
                
            },

            rows() {
                return this.$store.getters.getfile;
            },

            token: function() {
                return this.$store.getters.getToken;
            }
        },

        methods: {

            editfiles(item){
                this.file = item;
            },

            deletefiles(item){
                if(confirm("Deseja realmente excluir?")) {
                    this.$http.delete('file/'+item.id_file, {
                        headers: {
                            Authorization: 'Bearer '+this.token
                        }
                    })
                    .then(res => {
                        if (res.status === 200) {
                            if (res.data.token_failure) {
                                this.countdown = 3;
                            }

                            this.$store.dispatch('file', this.token)
                        }
                    })
                    .catch(err => {
                        this.errors.push(err);
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
            },


        }
        
    }
</script>

<style scoped>

    .file-table {
        margin-top: 20px;
    }

    .file-search {
        width: 80%;
        text-indent: 12px;
    }

    .search-icon {
        position: absolute;
        margin-top: -33px;
        margin-left: 2px;
    }

</style>