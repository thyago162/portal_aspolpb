<template>
  <b-container fluid class="mb-3">
    <b-row class="header-title ml-1 mr-1">
      <b-col  class="title">
        <h5>CAMPANHAS</h5>
      </b-col>
    </b-row>

    <b-row class="ml-1 mr-1">
      <b-col >
        <b-button
          class="mt-2 float-right"
          variant="primary"
          v-b-modal.campaign-form
          v-if="administrator === 1 && token"
        >+ Novo item</b-button>
      </b-col>
    </b-row>

    <b-row class="mt-3 ml-1 mr-1">
      <b-col>
        <div class="block-size ml-5">
          <b-card v-for="(value,index) in campaigns" :key="index">
            <b-row no-gutters>
              <b-col class="file-name">
                <h6 class="mt-1">{{value.nm_name}}.{{value.nm_file_path.split('.').pop()}}</h6>
              </b-col>
              <b-col lg="2" class="file-icon">
                <a :href="value.nm_file_path" target="_blank">
                  <b-icon icon="download" class="ml-2 mt-1"></b-icon>
                </a>
              </b-col>
            </b-row>
          </b-card>
        </div>
      </b-col>
    </b-row>
    <CampaignForm />
  </b-container>
</template>

<script>
import CampaignForm from "../components/campaign/CampaignForm";
export default {
  created() {
    this.$store.dispatch("campaign");
  },

  components: {
    CampaignForm
  },

  data() {
    return {
      imageExtension: ["png", "jpeg", "jpg", "bpm"],
      docExtension: ["odt", "pdf", "docx", "doc"]
    };
  },

  computed: {
    administrator: function() {
      let user = this.$session.get("user");
      return user ? user.administrator : 0;
    },

    token: function() {
      return this.$store.getters.getToken;
    },

    campaigns: function() {
      return this.$store.getters.getCampaign;
    }
  },

  methods: {
    isImage(file) {
      let fileExtension = file.split(".").pop();

      return this.imageExtension.indexOf(fileExtension) > -1 ? true : false;
    },

    isDoc(file) {
      let fileExtension = file.split(".").pop();

      return this.docExtension.indexOf(fileExtension) > -1 ? true : false;
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
  justify-content: space-around;
  align-items: center;
}

.card {
  width: 450px;
  height: 70px;
  display: flex;
  justify-content: center;
  margin: 10px;
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