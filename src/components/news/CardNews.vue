<template>
  <div class="card-news ml-1">
    <b-card
      no-body
      img-right
      v-for="(news,index) in cardnews "
      :key="index"
      :style="{border: 'none', borderBottom: '1px solid gray'}"
    >
      <b-card-header
        :style="{width: '25%'}"
        class="card-header"
      ><b-img-lazy class='card-news-image' v-bind="mainProps" :src="news.nm_image_path" height: auto /></b-card-header>

      <b-card-body :style="{width: '75%'}">
        <b-row>
          <b-col>
            <span class="card-news-date">{{news.dt_date | date}}</span>
          </b-col>
        </b-row>

        <b-link
          class="card-news-title"
          :to="{name: 'visualizar-noticias', params: {title: news.nm_title}}"
        >
          <h6 class="mt-1">{{news.nm_title}}</h6>
        </b-link>

        <b-card-text
          class="mt-2 card-news-subtitle"
          v-if="news.nm_subtitle != 'null'"
        >{{news.nm_subtitle}}</b-card-text>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  props: ["cardnews"],

  data() {
    return {
      mainProps: {
        center: true,
        fluidGrow: true,
        blank: true,
        blankColor: "#bbb"
      }
    };
  },

  computed: {
    image() {
      return this.cardnews.nm_image_path;
    }
  },

  methods: {
    seeNews() {
      this.$router.push({
        name: "visualizar-noticias",
        params: { title: this.news.nm_title }
      });
    }
  }
};
</script>

<style scoped>
.card-news {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 412px;
}

.card-news-date {
  float: right;
  color: red;
  font-weight: bold;
}

.card-news-image {
  object-fit: cover;
  object-position: center;
  max-height: 100px;
}

.card-news-icon {
  width: 20px;
  height: 20px;
}

.card-news-title {
  font-weight: bolder;
  font-size: 16px;
  color: black;
  text-decoration: none;
}

.card-news-subtitle {
  font-weight: bolder;
  color: red;
}

@media screen and (max-width: 1024px) {
  .card-news {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 200px;
  }
  .card-header {
    display: none;
  }

  h6 {
    font-size: 15px;
  }
}

@media screen and (max-width: 768px) {
    .card-news {
        height: 390px;
    }
  .card-header {
      display: block;
  }
}

@media screen and (max-width: 500px) {
  .card-header {
    display: none;
  }

  .card {
    width: 101%;
    margin-left: -5px;
    margin-bottom: 10px;
  }
}
</style>