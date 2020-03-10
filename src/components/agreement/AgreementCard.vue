<template>
    <b-card class="mt-3" img-left :style="{overflow: 'auto'}" >
        <template v-slot:header  v-if="image">
            <b-img :src="image" width="150px" height="130px"></b-img>
        </template>
        <b-card-title class="ml-3">
            {{item.nm_title}}
        </b-card-title>
    
        <b-container>
            <b-row>
                <b-col lg="9">
                    <b-button @click="showOrHide" :style="{width: '150px'}"> {{!active ? '+ Detalhes' : '- Detalhes'}}</b-button>
                </b-col>
                <b-col lg="3"> 
                    <b-link  class="mr-2" :style="{color: 'red'}">
                        <font-awesome-icon size="2x" :icon="['fa','file-pdf']" 
                            class="icont alt personal-icons " />
                    </b-link>

                    <b-link class="mr-2" :to="item.nm_link">
                        <font-awesome-icon size="2x" :icon="['fa', 'globe']" 
                            class="icont alt personal-icons" />
                    </b-link>

                    <b-link class="mr-2" :style="{color: '#00ACEE'}" :to="twitter">
                        <font-awesome-icon :icon="['fab', 'twitter-square']" 
                            size="2x" class="icon alt personal-icons" />
                    </b-link>

                    <b-link class="mr-2" :to="facebook">
                        <font-awesome-icon size="2x" :icon="['fab', 'facebook-square']" 
                            class="icon alt personal-icons" />
                    </b-link>

                    <b-link :style="{color: '#3f729b'}" :to="instagram">
                        <font-awesome-icon :icon="['fab', 'instagram-square']" 
                            size="2x" class="icon alt personal-icons" />
                    </b-link>

                </b-col>
            </b-row>
            <b-row  class="mt-3" >
                <b-col :class="active ? 'details-show' : 'details-hide'"  >
                    <b-card-text v-html="item.nm_content"></b-card-text>
                </b-col>
            </b-row>
        </b-container>
    </b-card>
</template>

<script>
    export default {

        props: ['item'],

        mounted() {
            this.splitSocialNetwork()
        },

        computed: {
            image: function() {
                return this.item.nm_image_path ? 
                    this.item.nm_image_path.replace('public','storage') : 
                    ''
            },
        },

        data() {
            return {
                active: false,
                socialNetworks: '',
                instagram: '',
                facebook: '',
                twitter: ''
            }
        },

        methods: {
            showOrHide() {
                this.active = !this.active;
            },

            splitSocialNetwork() {
                if (this.item.nm_social_network_link) {
                    this.socialNetworks = this.item.nm_social_network_link.split(',');
                    this.instagram = this.socialNetworks[0]
                    this.facebook = this.socialNetworks[1]
                    this.twitter = this.socialNetworks[2]
                }
            },
        }
        
    }
</script>

<style scoped>
    .details-show {
        display: '';
    }

    .details-hide {
        display: none;
    }
</style>