<template>
    <b-card class="mt-3" img-left :style="{overflow: 'auto'}"  >
        <template v-slot:header  v-if="image">
            <b-img :src="image" width="150px" height="130px"></b-img>
        </template>
        <b-card-title class="ml-3">
            {{item.nm_title}}
        </b-card-title>
        <b-card-body>
            <b-container>
                <b-row>
                    <b-col>
                        <b-button @click="showOrHide" 
                            size="md"> {{!active ? '+ Detalhes' : '- Detalhes'}}</b-button>
                    </b-col>
                    <b-col >
                        <div class="icons">
                            <b-link  class="mr-2" :style="{color: 'red'}" v-if="administrator === 1" 
                                @click="openLink(item.nm_file_path)">
                                <font-awesome-icon size="2x" :icon="['fa','file-pdf']" 
                                    class="icont alt personal-icons " />
                            </b-link>

                            <b-link class="mr-2" @click="openLink(item.nm_link)">
                                <font-awesome-icon size="2x" :icon="['fa', 'globe']" 
                                    class="icont alt personal-icons" />
                            </b-link>

                            <b-link class="mr-2" :style="{color: '#00ACEE'}" @click="openLink(twitter)">
                                <font-awesome-icon :icon="['fab', 'twitter-square']" 
                                    size="2x" class="icon alt personal-icons" />
                            </b-link>

                            <b-link class="mr-2" @click="openLink(facebook)">
                                <font-awesome-icon size="2x" :icon="['fab', 'facebook-square']" 
                                    class="icon alt personal-icons" />
                            </b-link>

                            <b-link :style="{color: '#3f729b'}" @click="openLink(instagram)">
                                <font-awesome-icon :icon="['fab', 'instagram-square']" 
                                    size="2x" class="icon alt personal-icons" />
                            </b-link>
                        </div>

                    </b-col>
                </b-row>
                <b-row  class="mt-3" >
                    <b-col :class="active ? 'details-show' : 'details-hide'"  >
                        <b-card-text v-html="item.nm_content"></b-card-text>
                    </b-col>
                </b-row>
            </b-container>
        </b-card-body>
        <b-card-footer :class="active ? 'details-show' : 'details-hide'" >
            <b-container fluid>
                <b-row>
                    <b-col>
                        <b-card-text>
                           Rua {{item.nm_street}}, Nº {{item.nu_number}}, 
                            {{item.nm_neighbohood}}
                        </b-card-text>
                        <b-card-text>
                            {{item.nm_city}} / {{item.nm_uf}} - Cep: {{item.nm_cep}}
                        </b-card-text>
                    </b-col>
                </b-row>
            </b-container>
        </b-card-footer>
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
                    this.item.nm_image_path : 
                    ''
            },

            administrator: function() {
                let user = this.$session.get('user');
                return user ? user.administrator : 0
            }
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

            openLink(url) {
                window.open(url);
            }
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

    .icons {
        display: flex;
        flex-direction: row;
    }
</style>