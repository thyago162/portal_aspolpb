<template>
  <div class="ml-1 mr-1 image-highlights">
    <b-img-lazy class="image mt-2" :src="image" v-bind="mainProps"></b-img-lazy>
    <b-link :to="{name: 'visualizar-noticias', params: {title: title}}" class="block-title">
      <figcaption class="image-title">{{highlights.nm_title}}</figcaption>
    </b-link>
  </div>
</template>

<script>
export default {
  props: ["highlights"],
  data() {
    return {
      mainProps: {
        fluidGrow: false,
        blank: true,
        blankColor: "#bbb"
      }
    };
  },

  computed: {
    image() {
      return this.highlights.nm_image_path == undefined
        ? ""
        : this.highlights.nm_image_path;
    },
    title: function() {
      return this.highlights ? this.highlights.nm_title : "";
    }
  }
};
</script>

<style  scoped>
.highlights-title {
  background-color: rgba(24, 23, 23, 0.719);
  position: absolute;
  width: 100%;
  bottom: 0%;
}

.image {
  max-height: 412px;
  width: 637.5px;
  object-fit: cover;
  object-position: center;
}

.image-title {
  position: absolute;
  max-width: 637.5px;
  background-color: rgba(51, 51, 51, 0.726);
  color: #ffffff;
  bottom: 0px;
  font-weight: bolder;
  text-align: center;
}

@media screen and (max-width: 1024px) {
  h5 {
    font-size: 18px;
  }

  h6 {
    font-size: 16px;
  }
}

@media screen and (max-width: 768px) {
  .image-highlights {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }

  .block-title {
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: center;
    margin-top: -10px;
  }


}

@media screen and (max-width: 500px) {
  .image {
    max-height: 250px;
    width: 100%;
  }

  .block-title {
    display: none;
  }

  h5 {
    font-size: 12px;
  }

  h6 {
    display: none;
  }
}

@media screen and (max-width: 375px) {
  .highlights {
    margin-top: 10px;
  }

  .image {
    width: 100%;
    height: 180px;
  }

}
</style>