<template>

  <b-container fluid class="mb-3">

    <b-row class="header-title ml-1 mr-1">
      <b-col class="title">
        <h5>IDENTIDADE VISUAL</h5>
      </b-col>
    </b-row>

    <b-row class="mt-3 ml-1 mr-1">
      <b-col>
        <b-button
          class="mt-2 float-right"
          variant="primary"
          v-b-modal.visual-identity-form
          v-if="administrator === 1 && token"
        >+ Novo item</b-button>
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="11" class="ml-5">
        <div class="block-size-image" v-for="(value,index) in visualIdentity" :key="index" >
          <b-card  class="card-image mt-3" img-left>
            <b-card-header>
              <b-img  :src="value.nm_image_path" class="image"></b-img>
            </b-card-header>
            <b-card-body>
              <b-row>
                <b-col>
                  <h6>{{value.nm_name}}.{{value.nm_image_path.split('.').pop()}}</h6>
                </b-col>
                <b-col cols="2">
                  <a :href="value.nm_image_path" target="_blank">
                    <b-icon icon="download"></b-icon>
                  </a>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
        </div>
      </b-col>
    </b-row>
    <VisualIdentityForm />
  </b-container>
</template>

<script>
import VisualIdentityForm from "../components/institucional/visual-identity/VisualIdentityForm";

export default {

  components: {

    VisualIdentityForm

  },

  created() {
    this.$store.dispatch('visualIdentity')
  },

  computed: {

    token: function() {
        return this.$store.getters.getToken;
    },

    administrator: function() {
        let user = this.$session.get('user');
        return user ? user.administrator : 0
    },

    visualIdentity: function() {
        return this.$store.getters.getVisualIdentity;
    }
  }

};
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