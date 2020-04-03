<template>
    <b-container fluid>
        <b-row class="file-row">
           <b-col class="file-head ml-4">
                <div class="file-title">
                    <h5>ARQUIVOS</h5>
                </div>
           </b-col>
        </b-row>
        <b-row class="mt-4 mb-4">
            <b-col >
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

    .file-row {
        width: 99%;
    }

    .file-head {
        border-bottom: 3px solid red;
        margin-top: 20px;
    }

    .file-title {
        background: rgba(138,21,0,1);
        background: -moz-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -webkit-gradient(left top, right top, color-stop(0%, rgba(138,21,0,1)), color-stop(25%, rgba(186,35,15,1)), color-stop(71%, rgba(201,27,8,1)), color-stop(100%, rgba(240,31,12,1)));
        background: -webkit-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -o-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: -ms-linear-gradient(left, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        background: linear-gradient(to right, rgba(138,21,0,1) 0%, rgba(186,35,15,1) 25%, rgba(201,27,8,1) 71%, rgba(240,31,12,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8a1500', endColorstr='#f01f0c', GradientType=1 );
        width: 200px;
        height: 40px;
        color: white;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-left: -15px;
        margin-top: 10px;
    }

    h5 {
        margin-top: 10px;
    }
</style>