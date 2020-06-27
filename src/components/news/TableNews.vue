<template>
  <b-container fluid>
    <b-row class="header-title ml-1 mr-1">
      <b-col class="title">
        <h5 class="mt-2">Notícias</h5>
      </b-col>
    </b-row>
    <b-row class="mt-5 ml-1 mr-1">
      <b-col>
        <b-row>
          <b-col>
            <b-form inline>
              <b-input-group>
                <template v-slot:prepend>
                  <b-input-group-text>
                    <b-icon icon="search"></b-icon>
                  </b-input-group-text>
                </template>
                <b-form-input v-model="search" />
              </b-input-group>
              <b-button variant="primary" type="button" class="ml-1" @click="searchNews()">Buscar</b-button>
            </b-form>
          </b-col>
          <b-col>
            <b-button
              @click="$router.push({name: 'form-news', params: {id: 'novo'}})"
              variant="primary"
              :style="{float: 'right'}"
            >
              <b-icon icon="plus"></b-icon>novo item
            </b-button>
          </b-col>
        </b-row>

        <b-row class="mt-3">
          <b-col>
            <b-table
              :fields="fields"
              :items="news.data"
              striped
              hover
              :per-page="perPage"
              :current-page="currentPage"
              id="table-news"
            >
              <template v-slot:cell(edit)="row">
                <b-button
                  size="sm"
                  @click="$router.push({name: 'form-news', params: {id: row.item.id_news}})"
                  variant="info"
                  v-b-modal.form-news
                  class="ml-1"
                >
                  <b-icon icon="pen"></b-icon>
                </b-button>
              </template>

              <template v-slot:cell(delete)="row">
                <b-button size="sm" @click="deleteNews(row.item.id_news)" variant="danger">
                  <b-icon icon="trash"></b-icon>
                </b-button>
              </template>

              <template v-slot:cell(dt_date)="row">{{row.item.dt_date | date }}</template>

              <template v-slot:cell(st_active)="row">
                <b-icon icon="circle-fill" v-if="row.item.st_active === 1" variant="success"></b-icon>
                <b-icon icon="circle-fill" v-else variant="warning"></b-icon>
              </template>
            </b-table>

            <div class="mt-3">
              <b-pagination
                align="center"
                v-model="news.current_page"
                :total-rows="news.total"
                :per-page="news.per_page"
                aria-controls="table-news"
                @input="getNews()"
              ></b-pagination>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <SessionOff ref="session" />
    <ModalError ref="error" :errors="errors" />
  </b-container>
</template>

<script>
import ModalError from "../error/ModalError";
import SessionOff from "../session/Session";

export default {
  components: {
    ModalError,
    SessionOff
  },

  created() {
    this.$store.dispatch("news", 1);
  },

  data() {
    return {
      fields: [
        { key: "nm_title", label: "Título", sortable: true },
        { key: "dt_date", label: "Data", sortable: true },
        { key: "st_active", label: "Publicado", sortable: true },
        { key: "edit", label: "" },
        { key: "delete", label: "" }
      ],
      perPage: 10,
      currentPage: 1,
      search: "",
      visibility: false,
      errors: [],
      newsSearched: []
    };
  },

  computed: {
    news() {
      if (this.newsSearched.data) {

        return this.newsSearched;
      } else {
        return this.$store.getters.getNews;
      }
    },

    token: function() {
      return this.$session.get("jwt");
    }
  },

  methods: {
    deleteNews(id) {
      if (confirm("Deseja realmente exluir?")) {
        this.$http
          .delete("news/" + id, {
            headers: {
              Authorization: "Bearer " + this.token
            }
          })
          .then(res => {
            if (res.status === 200) {
              if (res.data.token_failure) {
                this.$refs.session.$refs.session.show();
              }

              if (res.data.length == 0) {
                this.$store.dispatch("news", 1);
                alert("Notícia removida");
              }

              if (res.data.result.error) {
                this.$refs.error.$refs["modal-error"].show();
                this.errors = res.data.result;
              }
            }
          });
      }
    },

    searchItems(arraySearch) {
      var vm = this;

      return arraySearch.filter(function(item) {
        return item.nm_title.toLowerCase().indexOf(vm.search.indexOf()) !== -1;
      });
    },

    resetModal() {
      this.newsItem.id_news = "";
      this.newsItem.nm_title = "";
      this.newsItem.nm_subtitle = "";
      this.newsItem.dt_date = "";
      this.newsItem.nm_content = "";
      this.newsItem.st_highlights = "";
      this.newsItem.st_active = 1;
    },

    update(event) {
      this.newsItem = event;
    },

    getNews() {
      this.$store.dispatch("news", this.news.current_page);
    },

    searchNews() {
      let formData = new FormData();
      formData.append("search", this.search);

      this.$http
        .post("news/search", formData)
        .then(res => {
          if (res.status === 200) {
            this.newsSearched = res.data.result.news;
          }
        })
        .catch(err => {
          window.console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.news-table {
  margin-top: 20px;
}

.news-search {
  width: 80%;
  text-indent: 15px;
}

.search-icon {
  position: absolute;
  margin-top: -33px;
  margin-left: 2px;
}
</style>