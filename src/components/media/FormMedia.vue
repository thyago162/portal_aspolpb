<template>
  <b-overlay :show="loading">
    <b-container fluid class="mb-3">
      <b-row class="header-title ml-1 mr-1">
        <b-col class="title">
          <h5 class="mt-2">
            <b-link class="navigation-link" :to="{name: 'table-media'}">Midias</b-link>/ Formulário
          </h5>
        </b-col>
      </b-row>
      <b-row class="mt-3 ml-1 mr-1">
        <b-col>
          <form @submit.stop.prevent="formSubmited" class="mb-2">
            <b-form-group label="Tipo da notícia">
              <b-form-radio-group
                @input="selectedOption(form.nu_type)"
                v-model="form.nu_type"
                :state="state.type"
              >
                <b-form-radio :value="1">Notícias</b-form-radio>
                <b-form-radio :value="2">Vídeos</b-form-radio>
                <b-form-radio :value="3">Audíos</b-form-radio>
                <b-form-radio :value="4">Redes Sociais</b-form-radio>
              </b-form-radio-group>
            </b-form-group>

            <b-form-group label="Título">
              <b-form-input type="text" :state="state.title" v-model="form.nm_title" required />
            </b-form-group>

            <b-form-group label="Link" v-if="selected != 3">
              <b-form-input type="text" required v-model="form.nm_link" />
            </b-form-group>

            <b-form-group label="Data">
              <b-form-input type="date" :state="state.date" v-model="form.dt_date"></b-form-input>
            </b-form-group>

            <b-form-group label="Audio" v-if="selected == 3">
              <b-form-file accept=".mp3, .wma" v-model="audio" :state="Boolean(audio)"></b-form-file>
            </b-form-group>

            <ImageUpload
              :id="form.id_media"
              folder="public/media"
              :path="form.nm_image_path"
              size="250x250"
              v-if=" selected != 2"
            />

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
      </b-row>
      <hr />
      <b-row>
        <b-col class="buttons">
          <b-button variant="success" @click="formSubmited()">
            Salvar
            <b-spinner class="ml-1" label="Spinning" small v-show="loading"></b-spinner>
          </b-button>
        </b-col>
      </b-row>
      <SessionOff ref="session" />
      <ModalError ref="error" :errors="errors" />
    </b-container>
  </b-overlay>
</template>

<script>
import ImageUpload from "../image/ImageUpload";
import SessionOff from "../session/Session";
import ModalError from "../error/ModalError";
import { validate } from "../../config";

export default {
  created() {
    this.clearForm();
    this.getMedia();
  },

  components: {
    ImageUpload,
    SessionOff,
    ModalError
  },

  computed: {
    token: function() {
      return this.$session.get("jwt");
    },

    file: function() {
      return this.$store.getters.getImage;
    }
  },

  data() {
    return {
      errors: {},
      selected: 1,
      form: {},
      countdown: 0,
      loading: false,
      audio: null,
      state: {}
    };
  },

  methods: {
    getMedia() {
      let id = this.$route.params.id;

      if (Number.isInteger(id)) {
        this.loading = true;
        this.$http("media/show/" + id)
          .then(res => {
            this.loading = false;
            if (res.status === 200) {
              this.form = res.data.result.media;
            }
          })
          .catch(err => {
            window.console.log(err);
          });
      }
    },

    formSubmited() {
      this.loading = true;
      this.requiredFields();
      this.saveNetwork();
    },

    saveNetwork() {
      let formData = new FormData();

      formData.append("id_media", this.form.id_media);
      formData.append("nm_title", this.form.nm_title);
      formData.append("nm_link", this.form.nm_link);
      formData.append("dt_date", this.form.dt_date);
      formData.append("nm_image_path", this.form.nm_image_path);
      formData.append("nm_audio_path", this.form.nm_audio_path);
      formData.append("nu_type", this.form.nu_type);
      formData.append("audio", this.audio);
      formData.append("file", this.file);

      this.$http
        .post("media", formData, {
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
              this.$refs.error.$refs["modal-error"].show();
              this.errors = res.data.result;
            } else {
              this.$store.dispatch("media");
              this.$router.push({ name: "table-media" });
            }
          }
        });
    },

    deleteImage() {
      this.loading = true;
      let formData = new FormData();

      formData.append("table", "media");
      formData.append("update_field", "nm_image_path");
      formData.append("where_field", "id_media");
      formData.append("id", this.form.id_media);
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
          }
        });
    },

    selectedOption(opt) {
      this.selected = opt;
    },

    clearForm() {
      this.form.nm_title = "";
      this.form.nm_link = "";
      this.form.dt_date = "";
      this.form.nm_image_path = "";
      this.form.nm_audio_path = "";
      this.form.nu_type = "";
    },

    requiredFields() {
      this.state.title = validate(this.form.nm_title);
      this.state.date = validate(this.form.dt_date);
      this.state.type = validate(this.form.nu_type);
    }
  }
};
</script>