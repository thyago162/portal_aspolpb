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
                    v-b-modal.campaign-form v-if="administrator === 1 && token" >+ Novo item</b-button>
            </b-col>
        </b-row>

        <b-row>
            <b-col lg="11">
                <div v-for="(campaign, index) in campaigns" :key="index">
                    <div v-show="checkFileExtension(campaign.nm_file_path)">
                        <b-img :src="campaign.nm_file_path"  ></b-img>
                        
                    </div>
                    
                </div>
            </b-col>
        </b-row>
        <CampaignForm />
    </b-container>
</template>

<script>
    import CampaignForm from '../components/campaign/CampaignForm';
    export default {

        mounted() {
            this.$store.dispatch('campaign');
        },

        components: {
            CampaignForm
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
            checkFileExtension(path) {
                let extension = path.split('.').pop();
                let teste = this.imageExtension.find(
                    extension  == 'png' || 
                    extension == 'jpg' || 
                    extension == 'jpeg' || 
                    extension == 'bpm' 
                );

                alert(teste)
            }
        },

        data() {
            return {
                imageExtension: [
                    'jpeg',
                    'png',
                    'bmp'
                ],
                extension: ''
            }
        }
        
    }
</script>

<style scoped>
    h5 {
        margin-top: 10px;
    }
</style>