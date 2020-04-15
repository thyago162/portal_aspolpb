<template>
     <social-sharing :url="share"
        title="Associação da Policia Civil da Paraíba"
        hashtags="aspol, aspolpb"
        inline-template>

        <div class="icons">
            <font-awesome-icon size="lg" :icon="['fa', 'share-alt']" 
                class="icon alt personal-icons  ml-5" />

            <span class="ml-3">Compartilhar</span>

            <network network="email">
                <font-awesome-icon size="lg" :icon="['fa', 'envelope']" 
                    class="icon alt personal-icons ml-3" :style="{color: 'red'}"/>
            </network>
            <network network="facebook">
                <font-awesome-icon size="lg" :icon="['fab', 'facebook']" 
                    class="icon alt personal-icons ml-2" :style="{color: 'blue'}" />
            </network>
            <network network="twitter">
                <font-awesome-icon :icon="['fab', 'twitter']" 
                    size="lg" class="icon alt ml-2" :style="{color: 'blue'}"  />
            </network>
            <network network="whatsapp">
                <font-awesome-icon size="lg" :icon="['fab', 'whatsapp']" 
                    class="icont alt ml-2"  :style="{color: 'green'}"/>
            </network>
        </div>
    </social-sharing>
    
</template>

<script>
    export default {
        props: ['url'],

        data() {
            return {
                link: 'http://www.mettawebmobile.tech/noticias'
            }
        },

        computed: {
            share: function() {
                return `${this.link}/${this.url}`
            }
        }

        
    }
</script>