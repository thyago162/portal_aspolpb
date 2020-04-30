<template>
    <b-container fluid class="mb-3">
        <b-row class="header-title">
            <b-col lg="11" class="title">
                <h5>CAMPANHAS</h5>
            </b-col>
        </b-row>

        <b-row>
            <b-col lg="11">
                <b-button class="mt-2 float-right" variant="primary" 
                    v-b-modal.campaign-form v-if="administrator === 1 && token" >
                    + Novo item
                </b-button>
            </b-col>
        </b-row>

        <b-row>
            <b-col lg="11" class="ml-5">
                <b-tabs>
                    <b-tab title="Arquivos" >
                        <div v-for="(value,index) in campaigns" :key="index" class="block-size">
                            <b-card v-if="isDoc(value.nm_file_path)" no-body class="card mt-3">
                                <b-row no-gutters>
                                    <b-col class="file-name">
                                        <h6 class="mt-1">
                                            {{value.nm_name}}.{{value.nm_file_path.split('.').pop()}}
                                        </h6>
                                    </b-col>
                                    <b-col lg="2" class="file-icon">
                                        <a :href="value.nm_file_path" target="_blank">
                                            <b-icon icon="download" class="ml-2 mt-1"></b-icon>
                                        </a>
                                        
                                    </b-col>

                                </b-row>
                            </b-card>
                        </div>
                    </b-tab>

                    <b-tab title="Imagens">
                        <div v-for="(value,index) in campaigns" :key="index" class="block-size-image">
                            <b-card v-if="isImage(value.nm_file_path)" class="card-image mt-3" img-left>
                                <b-card-header>
                                    <b-img :src="value.nm_file_path" fluid class="image"></b-img>
                                </b-card-header>
                                <b-card-body>
                                    <b-row>
                                        <b-col>
                                        <h6>{{value.nm_name}}.{{value.nm_file_path.split('.').pop()}}</h6>
                                    </b-col>
                                    <b-col cols="2">
                                        <a :href="value.nm_file_path" target="_blank">
                                            <b-icon icon="download"></b-icon>
                                        </a>
                                    </b-col>
                                    </b-row>
                                </b-card-body>
                            </b-card>
                        </div>

                    </b-tab>
                </b-tabs>
            </b-col>
        </b-row>
        <CampaignForm />
    </b-container>
</template>

<script>
    import CampaignForm from '../components/campaign/CampaignForm';
    export default {

        created() {
            this.$store.dispatch('campaign');
        },

        components: {
            CampaignForm
        },

        data() {
            return {
                imageExtension: ['png','jpeg','jpg','bpm'],
                docExtension: ['odt', 'pdf', 'docx','doc']
            }
        },

        computed: {
            administrator: function() {
                let user = this.$session.get('user');
                return user ? user.administrator : 0
            },

            token: function() {
                return this.$store.getters.getToken;
            },

            campaigns: function() {
                return this.$store.getters.getCampaign;
            },

        },

        methods: {
           isImage(file) {
                let fileExtension = file.split('.').pop();

                return this.imageExtension.indexOf(fileExtension) > -1 ? true : false

           },

           isDoc(file) {
               let fileExtension = file.split('.').pop();

               return this.docExtension.indexOf(fileExtension) > -1 ? true : false
           }
        },   
    }
</script>

<style scoped>
    h5 {
        margin-top: 10px;
    }

    .block-size {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }

    .card {
        width: 250px;
        height: 50px;
        display: flex;
        justify-content: center;
    }

    .card-image {
        height: 310px;
        width: 350px;
    }

    .image {
        width: 270px;
        height: 200px;
    }

    .file-name {
        border-right: 1px solid gray;
    }

    .file-name h6 {
        text-indent: 10px;
    }

</style>