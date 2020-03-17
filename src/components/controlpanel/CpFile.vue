<template>
    <div>
        <b-modal id="cp-file" ref="cpfile"  header-bg-variant="success" header-text-variant="light"
            title="Arquivos" size="lg" hide-footer @hidden="resetModal">
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
                        @click="resetModal" :style="{float: 'right'}">
                         <b-icon icon="plus" ></b-icon>
                         novo item
                    </b-button>

                 </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-table  striped hover 
                        :per-page="perPage" :current-page="currentPage" class="file-table">

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
        <FormFile />
    </div>
</template>

<script>
    import FormFile from '../file/FormFile';
    export default {

        components: {
            FormFile
        },

        mounted() {
            this.$store.dispatch('files');
        },

        data() {
            return {
                fields: [
                   
                ],
                perPage: 5,
                currentPage: 1,
                file: [],
                search: ''
            }
        },

        computed: {

            files() {

                if (this.search.length > 0 ) {

                   return this.searchItems(this.$store.getters.getfile);
               }else {

                    return this.$store.getters.getfile;
               }
                
            },

            rows() {
                return this.$store.getters.getfile;
            },

            token: function() {
                return this.$session.get('jwt');
            }
        },

        methods: {

            resetModal(){
                this.file.nm_name = '';
                this.file.nm_file_path = '';
            },

            editfiles(item){
                this.file = item;

            },

            deletefiles(item){
                this.$http.delete('file/'+item.id_file, {
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                })
                .then(res => {
                    
                    if (res.status === 200) {
                        this.$store.dispatch('files')
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