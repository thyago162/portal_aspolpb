<template>
    <b-container fluid class="mb-3">
        <b-row class="header-title mt-3" >
           <b-col class="title" lg="11">
                <h5>ARQUIVOS</h5>
           </b-col>
        </b-row>
        <b-row class="mt-4 mb-4 align-body">
            <b-col lg="11">
                <b-table :items="items" :fields="fields" striped hover>
                    <template v-slot:cell(file)="row">
                        <b-button variant="default" @click="downloadFile(row.item.nm_file_path)">
                            <b-icon icon="download"></b-icon>
                        </b-button>
                    </template>

                    <template v-slot:cell(created_at)="row">
                        <span>{{row.item.created_at | fullDate}}</span>
                    </template>

                    <template v-slot:cell(updated_at)="row">
                        <span>{{row.item.updated_at | fullDate}}</span>
                    </template>
                </b-table>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    export default {

        mounted() {
            this.$store.dispatch('file', this.token);
        },

        computed: {
            items: function() {
                return this.$store.getters.getFile;
            },

            token: function() {
                return this.$store.getters.getToken;
            }
        },

        methods: {
            downloadFile(url) {
                window.open(url.replace('public','storage'))
            }
        },

        data() {
            return {
                fields: [
                    {key: 'nm_name', label: 'Nome'},
                    {key: 'created_at', label: 'Data de criação'},
                    {key: 'updated_at', label: 'Última atualização'},
                    {key: 'file', label: 'Download'}
                ]
            }
        }
    }
</script>

<style scoped>
    .files {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
    }

    h5 {
        margin-top: 10px;
    }
</style>