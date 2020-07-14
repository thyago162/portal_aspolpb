<template>
  <b-card class="mt-3" img-left :style="{overflow: 'auto'}">
    <template v-slot:header v-if="image">
      <b-img :src="image" class="card-image" v-show="!active"></b-img>
    </template>
    <b-card-title class="ml-3 card-title">{{item.nm_title}}</b-card-title>
    <b-card-body>
      <b-container>
        <b-row>
          <b-col>
            <b-button @click="getContent(item.id_agreement)" class="card-button" size="md" variant="primary">
              <span class="card-button-text">{{!active ? '+ Detalhes' : '- Detalhes'}}</span>
            </b-button>
          </b-col>
          <b-col>
            <div class="icons">
              <b-link
                class="mr-2"
                :style="{color: 'red'}"
                v-if="administrator === 1"
                @click="openLink(item.nm_file_path)"
              >
                <font-awesome-icon
                  size="2x"
                  :icon="['fa','file-pdf']"
                  class="icont alt personal-icons"
                />
              </b-link>

              <b-link class="mr-2" @click="openLink(item.nm_link)">
                <font-awesome-icon
                  size="2x"
                  :icon="['fa', 'globe']"
                  class="icont alt personal-icons"
                />
              </b-link>

              <b-link class="mr-2" :style="{color: '#00ACEE'}" @click="openLink(twitter)">
                <font-awesome-icon
                  :icon="['fab', 'twitter-square']"
                  size="2x"
                  class="icon alt personal-icons"
                />
              </b-link>

              <b-link class="mr-2" @click="openLink(facebook)">
                <font-awesome-icon
                  size="2x"
                  :icon="['fab', 'facebook-square']"
                  class="icon alt personal-icons"
                />
              </b-link>

              <b-link :style="{color: '#3f729b'}" @click="openLink(instagram)">
                <font-awesome-icon
                  :icon="['fab', 'instagram-square']"
                  size="2x"
                  class="icon alt personal-icons"
                />
              </b-link>
            </div>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col :class="active ? 'details-show' : 'details-hide'">
            <b-card-text v-html="content" class="content"></b-card-text>
          </b-col>
        </b-row>
      </b-container>
    </b-card-body>
    <b-card-footer :class="active ? 'details-show' : 'details-hide'">
      <b-container fluid>
        <b-row v-if="item.nm_street">
          <b-col>
            <b-card-text>
              <span v-if="item.nm_street != null">Rua {{item.nm_street}},</span>
              <span v-if="item.nm_number">Nº {{item.nm_number}}, </span> 
              <span v-if="item.nm_complement"> - {{item.nm_complement}}</span>
              {{item.nm_neighbohood}}
            </b-card-text>
            <b-card-text>
              <span v-if="item.nm_city != null">{{item.nm_city}} /</span>
              <span v-if="item.nm_uf != null">{{item.nm_uf}} -</span>
              <span v-if="item.nm_cep != null">Cep: {{item.nm_cep}}</span>
            </b-card-text>
          </b-col>
        </b-row>
      </b-container>
    </b-card-footer>
  </b-card>
</template>

<script>
export default {
  props: ["item"],

  mounted() {
    this.splitSocialNetwork();
  },

  computed: {
    image: function() {
      return this.item.nm_image_path ? this.item.nm_image_path : "";
    },

    administrator: function() {
      let user = this.$session.get("user");
      return user ? user.administrator : 0;
    }
  },

  data() {
    return {
      active: false,
      content: '',
      socialNetworks: "",
      instagram: "",
      facebook: "",
      twitter: ""
    };
  },

  methods: {
    splitSocialNetwork() {
      if (this.item.nm_social_network_link) {
        this.socialNetworks = this.item.nm_social_network_link.split(",");
        this.instagram = this.socialNetworks[0];
        this.facebook = this.socialNetworks[1];
        this.twitter = this.socialNetworks[2];
      }
    },

    openLink(url) {
      window.open(url);
    },

    getContent(id) {
        this.active = !this.active
        this.$http('agreement/content/'+id)
        .then(res => {
            if (res.status === 200) {
                this.content = res.data.result.agreement.nm_content;
            }
        })
    }
  }
};
</script>

<style scoped>
.details-hide {
  display: none;
}

.icons {
  display: flex;
  flex-direction: row;
}

.card-image {
  width: 150px;
  height: 130px;
}

.card-icon {
  display: none;
}

.content >>> p {
  text-align: justify;
}
.content >>> img {
  width: 100%;
  height: 700px;
  object-fit: contain;
  object-position: center;
}

@media screen and (max-width: 500px) {
  .card-image {
    max-width: 150px;
    max-height: 150px;
  }

  .card-title {
    font-size: 16px;
    font-weight: bolder;
    position: relative;
  }

  .card-button {
    float: right;
    margin-top: -50px;
    margin-bottom: 15px;
    width: 47px;
    height: 25px;
    margin-left: 20px;
  }

  .card-button-text {
    display: none;
  }

  .card-icon {
    font-size: 12px;
    margin-top: -3px;
    margin-left: 3px;
    display: block;
  }

  .icons {
    font-size: 12px;
  }
}

@media screen and (max-width: 375px) {
  .card-image {
    width: 80px;
    height: 70px;
  }

  .card-title {
    font-size: 14px;
    font-weight: bolder;
  }

  .card-button {
    float: right;
    margin-top: -45px;
    margin-bottom: 15px;
    width: 27px;
    height: 25px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .card-button-text {
    display: none;
  }

  .card-icon {
    font-size: 10px;
    margin-top: -3px;
    margin-left: 3px;
    display: block;
  }

  .icons {
    font-size: 12px;
  }
}

@media screen and (max-width: 320px) {
  .card-image {
    width: 50px;
    height: 40px;
  }

  .card-title {
    font-size: 14px;
    font-weight: bolder;
  }

  .card-button {
    float: right;
    margin-top: -45px;
    margin-bottom: 15px;
    width: 27px;
    height: 25px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .card-button-text {
    display: none;
  }

  .card-icon {
    display: block;
    font-size: 8px;
    margin-top: -3px;
    margin-left: 3px;
  }

  .icons {
    font-size: 12px;
  }
}
</style>