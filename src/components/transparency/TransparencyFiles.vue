<template>
    <div class="mt-3" v-if="files.length > 0">
        <b-table :items="files" :fields="fields"  hover  striped>
            <template v-slot:cell(download)="row">
                <a :href="row.item.nm_file_path">
                    <b-icon icon="arrow-bar-down"></b-icon>
                </a>
            </template>
            <template v-slot:cell(dt_date)="row">
                <span>{{row.item.dt_date | date}}</span>
            </template>
        </b-table>
    </div>
</template>

<script>
    export default {
        props: ['files'],

        data() {
            return {
                fields: [
                    {key: 'nm_name', label: 'Nome do arquivo'},
                    {key: 'dt_date', label: 'Data', sortable: true},
                    {key: 'download', label: ''}
                ]
            }
        }
        
    }
</script>