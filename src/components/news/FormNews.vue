<template>
  <b-overlay :show="loading">
    <b-container fluid class="mb-3">
      <b-row class="header-title ml-1 mr-1">
        <b-col class="title">
          <h5 class="mt-2">
            <b-link class="navigation-link" :to="{name: 'table-news'}">Notícias</b-link>/ Formulário
          </h5>
        </b-col>
      </b-row>
      <b-row class="mt-4 ml-1 mr-1">
        <b-col v-show="!preview">
          <b-alert
            variant="warning"
            dismissible
            :show="true"
          >Os campos com asteriscos são obrigatórios</b-alert>

          <form @submit.stop.prevent="formSubmited()" enctype="multipart/form-data" class="mt-3">
            <b-form-group label="Título *">
              <b-form-input
                type="text"
                v-model="form.nm_title"
                required
                name="nm_title"
                :state="state.title"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Subtítulo">
              <b-form-input type="text" v-model="form.nm_subtitle" />
            </b-form-group>

            <b-form-group label="Data *">
              <b-form-datepicker
                id="form-news-data"
                v-model="form.dt_date"
                :state="state.date"
                class="mb-2"
              ></b-form-datepicker>
            </b-form-group>

            <b-form-group label="Destacar *" class="ml-4">
              <b-form-radio-group v-model="form.st_highlights" :state="state.highlight">
                <b-form-radio :value="0" default name="no-highlights">Não</b-form-radio>
                <b-form-radio :value="1" name="yes-highlights">Sim</b-form-radio>
              </b-form-radio-group>
            </b-form-group>

            <b-form-group label="Conteúdo *">
              <vue-editor id="editor" v-model="form.nm_content"></vue-editor>
            </b-form-group>

            <ImageUpload :id="form.id_news" folder :path="form.nm_image_path" size="800x600" />

            <b-form-group>
              <span v-if="form.nm_image_path">
                {{form.nm_image_path | fileName }}
                <b-button size="sm" variant="default" @click="deleteImage()">
                  <b-icon icon="trash" variant="danger" />
                </b-button>
              </span>
            </b-form-group>

            <b-img
              v-if="form.nm_image_path"
              :src="form.nm_image_path"
              width="150"
              height="150"
              class="mt-3"
            ></b-img>
          </form>
        </b-col>
        <b-col v-show="preview">
          <h5>Prévia</h5>
          <PreviewNews
            :title="form.nm_title"
            :subtitle="form.nm_subtitle"
            :date="form.dt_date"
            :content="form.nm_content"
            :image="file"
            :path="form.nm_image_path"
          />
        </b-col>
      </b-row>
      <hr class="mt-3 mb-4" />
      <b-row class="mt-2 ml-5">
        <b-col class="buttons">
          <b-button variant="warning" class="mr-2" @click="clearForm()">Limpar</b-button>
          <b-button variant="primary" size="md" @click="save" class="mr-2">
            <span :style="{fontWeight: 'bolder'}">Salvar</span>
          </b-button>

          <div v-if="form.id_news" class="mr-2">
            <b-button
              variant="secondary"
              size="md"
              @click="disableOrEnable(0)"
              v-show="isPublishing"
            >
              <span :style="{fontWeight: 'bolder'}">Desativar</span>
            </b-button>

            <b-button
              variant="outline-primary"
              size="md"
              @click="disableOrEnable(1)"
              v-show="!isPublishing"
            >
              <span :style="{fontWeight: 'bolder'}">Publicar</span>
            </b-button>
          </div>

          <b-button
            class="mr-2"
            variant="info"
            @click="preview = !preview"
          >{{preview ? 'Fechar pre-visualização': 'Exibir pré-visualização'}}</b-button>

          <b-button @click="handleOk" variant="success" size="md">
            <span :style="{fontWeight: 'bolder'}">Salvar e Publicar</span>
          </b-button>
        </b-col>
      </b-row>
      <SessionOff ref="session" />
      <ModalError :errors="errors" ref="error" />
    </b-container>
  </b-overlay>
</template>

<script>
import { VueEditor } from "vue2-editor";
import ImageUpload from "../image/ImageUpload";
import ModalError from "../error/ModalError";
import SessionOff from "../session/Session";
import PreviewNews from "./PreviewNews";
import { validate } from "../../config";

export default {
  components: {
    VueEditor,
    ImageUpload,
    ModalError,
    SessionOff,
    PreviewNews
  },

  created() {
    this.clearForm();
    this.getNews();
    this.changeTitle();
  },

  mounted() {
    this.form.st_active == 1
      ? (this.isPublishing = true)
      : (this.isPublishing = false);
  },

  data() {
    return {
      form: {},
      loading: false,
      hasImage: false,
      isPublishing: null,
      preview: false,
      title: "",
      errors: {},
      state: {}
    };
  },

  computed: {
    token: function() {
      return this.$session.get("jwt");
    },

    file: function() {
      return this.$store.getters.getImage;
    }
  },

  methods: {
    getNews() {
      let id = this.$route.params.id;

      if (Number.isInteger(id)) {
        this.loading = true;
        this.$http
          .get("news/" + id, {
            headers: {
              Authorization: "Bearer " + this.token
            }
          })
          .then(res => {
            this.loading = false;
            if (res.status === 200) {
              this.form = res.data.result.news;
            }
          })
          .catch(err => {
            window.console.log(err);
          });
      }
    },

    changeTitle() {
      Number.isInteger(this.$route.params.id)
        ? (this.title = "Editar notícia")
        : (this.title = "Nova notícia");
    },

    clearForm() {
      this.form.id_news = "";
      this.form.nm_title = "";
      this.form.nm_subtitle = "";
      this.form.dt_date = "";
      this.form.st_highlights = "";
      this.form.nm_content = "";
      this.form.st_active = "";
      this.form.nm_image_path = "";
    },

    formSubmited() {
      this.loading = true;
      this.requiredFields();
      this.saveNews();
    },

    handleOk: function() {
      this.form.st_active = 1;
      this.formSubmited();
    },
    saveNews() {
      let image = null;
      let formData = new FormData();
      let cropImage = this.$store.getters.getCropImage;

      if (cropImage) {
        image = cropImage;
      } else {
        image = this.file;
      }

      if (this.form.nm_image_path == undefined) {
        this.form.nm_image_path = "";
      }

      formData.append("id_news", this.form.id_news);
      formData.append("nm_title", this.form.nm_title);
      formData.append("nm_subtitle", this.form.nm_subtitle);
      formData.append("nm_content", this.form.nm_content);
      formData.append("dt_date", this.form.dt_date);
      formData.append("st_highlights", this.form.st_highlights);
      formData.append("nm_image_path", this.form.nm_image_path);
      formData.append("st_active", this.form.st_active);
      formData.append("file", image),
        this.$http
          .post("news", formData, {
            headers: {
              Authorization: "Bearer " + this.token
            }
          })
          .then(res => {
            this.loading = false;
            if (res.status === 200) {
              if (res.data.token_failure) {
                this.$refs.session.$refs.session.show();
              }

              if (res.data.result.error) {
                this.errors = res.data.result;
                this.$refs.error.$refs["modal-error"].show();
              } else {
                this.$store.dispatch("news", 1);
                this.$router.push({ name: "table-news" });
                this.$store.dispatch("images", null);

                this.errors = {};
              }
            }
          });
    },

    deleteImage() {
      this.loading = true;
      let formData = new FormData();

      formData.append("table", "news");
      formData.append("update_field", "nm_image_path");
      formData.append("where_field", "id_news");
      formData.append("id", this.form.id_news);
      formData.append("image_path", this.form.nm_image_path);
      formData.append("folder", "public/news");

      this.$http
        .post("storage/delete", formData, {
          headers: {
            Authorization: "Bearer " + this.token
          }
        })
        .then(res => {
          this.loading = false;
          if (res.status === 200) {
            this.form.nm_image_path = "";
            this.$store.dispatch("images", null);
          }
        });
    },

    disableOrEnable(param) {
      this.visibility = false;
      param === 1 ? (this.isPublishing = true) : (this.isPublishing = false);
      this.loading = true;

      this.$http
        .put(
          "news/disable-news/" + this.form.id_news,
          {
            st_active: param
          },
          {
            headers: {
              Authorization: "Bearer " + this.token
            }
          }
        )
        .then(res => {
          this.loading = false;
          if (res.status === 200) {
            if (res.data.token_failure) {
              this.$refs.session.$refs.session.show();
            }

            if (res.data.result.error) {
              this.errors = res.data.result;
              this.$refs.error.$refs["modal-error"].show();
            } else {
              if (res.data.result.st_active == 1) {
                alert("Notícia publicada!");
              } else {
                alert("Notícia retirada!");
              }

              this.$store.dispatch("news");
            }
          }
        });
    },

    pre() {
      this.preview = !this.preview;
    },

    save() {
      this.form.st_active = 0;
      this.loading = true;
      this.saveNews();
    },

    requiredFields() {
      this.state.title = validate(this.form.nm_title);
      this.state.date = validate(this.form.dt_date);
      this.state.highlight = validate(this.form.st_highlights);
    }
  }
};
</script>