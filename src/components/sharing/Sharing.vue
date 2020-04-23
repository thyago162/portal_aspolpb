<template>
     <social-sharing :url="share"
        title="Associação da Policia Civil da Paraíba"
        hashtags="aspol, aspolpb"
        inline-template>

        <div class="icons">
            <font-awesome-icon size="lg" :icon="['fa', 'share-alt']" 
                class="icon alt personal-icons  ml-5" />

            <network network="email">
                <font-awesome-icon size="lg" :icon="['fa', 'envelope']" 
                    class="icon alt personal-icons ml-3" />
            </network>
            <network network="facebook">
                <font-awesome-icon size="lg" :icon="['fab', 'facebook']" 
                    class="icon alt personal-icons ml-2"  />
            </network>
            <network network="twitter">
                <font-awesome-icon :icon="['fab', 'twitter']" 
                    size="lg" class="icon alt ml-2"   />
            </network>
            <network network="whatsapp">
                <font-awesome-icon size="lg" :icon="['fab', 'whatsapp']" 
                    class="icont alt ml-2"  />
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

<style scoped>

  .icons {
      display: flex;
      color: #333333;
      
  }

  @media screen and (max-width: 416px) {
      .icons {
          font-size: 9px;
          justify-content: flex-end;
          margin-top: 0px;
      }
      
  }

</style>