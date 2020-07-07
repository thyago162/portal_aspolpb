<template>
  <div class="image-highlights mb-3">
    <b-img-lazy class="image mt-2" :src="image" v-bind="mainProps"></b-img-lazy>
    <b-link :to="{name: 'visualizar-noticias', params: {title: title}}">
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
  background-color: rgba(24, 23, 23, 0.774);
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
  width: 637.5px;
  background-color: rgba(51, 51, 51, 0.726);
  color: #ffffff;
  font-weight: bolder;
  text-align: center;
  margin-top: -60px;
  max-height: 100px;
  font-size: 20px;
}
@media screen and (max-width: 1024px) {
  .image {
    max-height: 396px;
    width: 570.5px;
    object-fit: cover;
    object-position: center;
  }

  .image-title {
    width: 570.5px;
    font-size: 16px;
    margin-top: -50px;
  }
  
}

@media screen and (max-width: 768px) {
  
  .image {
    height: 450px;
    width: 100%;
  }

  .image-title {
    width: 738px;
    margin-top: -26px;
    font-size: 18px;
  }
}

@media screen and (max-width: 414px) {
  .image {
    height: 270px;
  }

  .image-title {
    width: 383.5px;
    margin-top: -70px;
  }

}

@media screen and (max-width: 411px) {
  .image {
    height: 250px;
    width: 100%;
  }

  .image-title {
    width: 380.5px;
    margin-top: -70px;
  }

  h5 {
    font-size: 12px;
  }

  h6 {
    display: none;
  }
}
@media screen and (max-width: 375px) {
  .image {
    height: 250px;
  }

  .image-title {
   width: calc(100% - 30px);
  }

}

@media screen and (max-width: 320px) {
  .image-title {
    margin-top: -95px;
  }

  .image {
    height: 230px;
  }

   .image-title {
    margin-top: -72px;
  }


}
</style>