<template>
  <div>
    <carousel :perPageCustom="customSlide" class="ml-2 mt-4 mb-3">
      <slide v-for="(media, index) in medias" :key="index" class="mr-2 box">
        <div v-if="media.nu_type === 1">
          <div class="image">
            <b-img fluid :src="media.nm_image_path"></b-img>
          </div>
          <div>
            <b-link @click="redirectTo(media.nm_link)">
              <p>{{media.nm_title | title}}</p>
            </b-link>
          </div>
        </div>

        <div v-if="media.nu_type === 2">
          <b-embed type="iframe" :src="media.nm_link"></b-embed>
        </div>

        <div v-if="media.nu_type === 3">
          <b-link v-b-modal.play-sound @click="playSound(media.nm_audio_path)">
            <b-icon icon="headphones" class="h1 icon"></b-icon>
          </b-link>
          <b-img class="image" fluid :src="media.nm_image_path"></b-img>
        </div>

        <div v-if="media.nu_type === 4">
          <b-img-lazy class="image" fluid :src="media.nm_image_path"></b-img-lazy>
          <b-link @click="redirectTo(media.nm_link)">
            <p>{{media.nm_title | title }}</p>
          </b-link>
        </div>
      </slide>
    </carousel>
    <AudioPlay :item="item" />
  </div>
</template>

<script>
import AudioPlay from "./AudioPlay";
export default {
  props: ["medias"],

  components: {
    AudioPlay
  },

  data() {
    return {
      item: "",
      customSlide: [
        [1360, 4],
        [1000, 3],
        [800, 2],
        [500, 1],
        [300, 1]
      ]
    };
  },

  methods: {
    redirectTo(link) {
      link.search("http") > 0
        ? window.open(link)
        : window.open("http://" + link);
    },

    playSound(media) {
      this.item = media.replace("public", "storage");
    }
  }
};
</script>

<style scoped>
.image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  object-position: center;
  border: 2px solid #333;
}

span {
  font-size: 16px;
  font-weight: bolder;
}
h5 {
  font-weight: bolder;
  font-size: 17px;
}

.audio-play:hover {
  color: green;
}

.box p {
  text-align: justify;
  color: #333;
  text-decoration: none;
  width: 100%;
  font-size: 14px;
}

.box p:hover {
  color: black;
  font-weight: bolder;
  text-decoration: none;
}


.icon {
  position: absolute;
  z-index: 1000;
  margin-top: 80px;
  margin-left: 150px;
  color: #ffffff;
  background-color: rgba(51, 51, 51, 0.342);
  border-radius: 5px;
}

.icon:hover {
  background-color: rgb(48, 163, 48);
}
</style>