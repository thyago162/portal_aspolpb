<template>
  <b-container fluid class="mb-3">
    <b-row class="header-title mt-3 ml-2 mr-2">
      <b-col class="title">
        <h5>ASLPOL NA MÍDIA</h5>
      </b-col>
    </b-row>
    <b-row class="mt-4 mb-3 align-body ml-2 mr-2">
      <b-col class="background">
        <h4 class="mt-2 ml-2">Aspol no jornal</h4>
        <MediaSlide :medias="newspapers" />
      </b-col>
    </b-row>
    <b-row class="mt-3 mb-3 align-body ml-2 mr-2">
      <b-col>
        <h4 class="mt-2 ml-2">Aspol na rádio</h4>
        <MediaSlide :medias="audios" />
      </b-col>
    </b-row>
    <b-row class="align-body mt-3 ml-2 mr-2">
      <b-col class="background">
        <h4 class="mt-2 ml-2">Aspol na TV</h4>
        <MediaSlide :medias="videos" />
      </b-col>
    </b-row>

    <b-row class="align-body mt-3 ml-2 mr-2">
      <b-col>
        <h4 class="mt-2">Aspol nas redes sociais</h4>
        <MediaSlide :medias="socialNetwork" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import MediaSlide from "../components/media/MediaSlide";
export default {
  components: {
    MediaSlide
  },

  created() {
    this.$store.dispatch("media");
  },
  
  computed: {
    media: function() {
      return this.$store.getters.getMedia.data;
    },

    newspapers: function() {
      if (this.media) {
        let newspaper = this.media.filter(param => {
          return param.nu_type === 1;
        });

        return newspaper;
      }

      return [];
    },

    audios: function() {
      if (this.media) {
        let audio = this.media.filter(param => {
          return param.nu_type === 3;
        });

        return audio;
      }

      return [];
    },

    videos: function() {
      if (this.media) {
        let video = this.media.filter(param => {
          return param.nu_type === 2;
        });

        return video;
      }

      return [];
    },

    socialNetwork: function() {
      if (this.media) {
        let socialNt = this.media.filter(param => {
          return param.nu_type === 4;
        });

        return socialNt;
      }

      return [];
    }
  }
};
</script>

<style scoped>
h5 {
  margin-top: 10px;
  font-weight: bolder;
}

.background {
  background-color: lightgray;
}

@media screen and (max-width: 999px) {
  .media-title {
    width: 120px;
    height: 25px;
  }

  h5 {
    font-size: 14px;
  }

  .personal-link {
    font-size: 16px;
  }
}

@media screen and (max-width: 416px) {
  h5 {
    font-size: 13px;
  }

  h4 {
    font-size: 16px;
    font-weight: bolder;
  }

  .personal-link {
    font-size: 14px;
  }
}

@media screen and (max-width: 375px) {
  .personal-link {
    font-size: 14px;
  }

  h4 {
    font-size: 15px;
    font-weight: bolder;
  }
}
</style>