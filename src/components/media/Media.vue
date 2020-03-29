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
                <b-button variant="primary" v-b-modal.form-media :style="{float: 'right'}" @click="resetModal()">
                    + novo item
                </b-button>
            </b-col>
        </b-row>

        <b-row class="mt-4">
            <b-col>
                
                <ErroMessage :errors="errors" :visibility="visibility" />

                <b-table :fields="fields" :items="media" hover id="media-table" 
                    :per-page="perPage" :current-page="currentPage">

                     <template v-slot:cell(edit)="row" > 
                        <b-button size="sm"  @click="editItem(row.item)" 
                            variant="info" v-b-modal.form-media class="ml-1">
                            <b-icon icon="pen"></b-icon>
                        </b-button>
                    </template>

                    <template v-slot:cell(delete)="row" >
                        <b-button size="sm"  @click="deleteItem(row.item.id_media)" variant="danger">
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
                        aria-controls="media-table"
                    ></b-pagination>
                </div>
            </b-col>
        </b-row>
        <FormMedia :media="item"/>
    </b-container>
</template>

<script>
    import FormMedia from '../media/FormMedia';
    import ErroMessage from '../error/ErrorMessage';
    export default {

        components: {
            FormMedia,
            ErroMessage
        },

        mounted() {
            this.$store.dispatch('media');
        },

        data() {
            return {
                fields: [
                    {key: 'nm_title', label: 'Título', sortable: true},
                    {key: 'nm_subtitle', label: 'Subtitulo'},
                    {key: 'dt_date', label: 'Data', sortable: true},
                    {key: 'edit', label: ''},
                    {key: 'delete', label: ''}
                ],
                item: [],
                search: '',
                errors: [],
                currentPage: 1,
                perPage: 5,
                visibility: false
            }
        },

        computed: {
            media: function() {
                if (this.search.length > 0) {
                   
                   return this.searchItem(this.$store.getters.getMedia);

                }else {
                    return this.$store.getters.getMedia;
                }
                
            },

            token: function() {
                return this.$session.get('jwt');
            },

            rows: function() {
                return this.$store.getters.getMedia.length;
            }
        },

        methods: {
            editItem(item) {
                this.item = item;
            },

            deleteItem(id) {
                if(confirm('Deseja realmente remover?')) {

                    this.$http.delete('media/' + id, {
                        headers: {
                            Authorization: 'Bearer '+this.token
                        }
                    })
                    .then(res => {
                        if (res.status === 200) {
                            this.$store.dispatch('media')
                        }
                    })
                    .then(err => {
                        this.errors.push(err);
                        this.visibility = true
                    })
                }
                
            },

            searchItem(arraySearch) {
               let result = new Array();

                for(var i=0; i < arraySearch.length; i++) {
                    if(
                        !arraySearch[i].nm_title.search(this.search) || 
                        !arraySearch[i].nm_subtitle.search(this.search)
                    ) {
                        result.push(arraySearch[i])
                    }
                }

                return result
            },

            resetModal() {
                this.item.id_midia = '';
                this.item.nm_title = '';
                this.item.nm_subtitle = '';
                this.item.nm_link = '';
                this.item.nm_image_path = '';
                this.item.nm_audio_path = '';
                this.item.dt_date = '';
                this.item.nu_type = '';
            }
        }
        
    }
</script>

<style scoped>

</style>