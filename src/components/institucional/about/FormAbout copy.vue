<template>
  <div>
    <b-form @submit.stop.prevent="sendForm">
      <b-container fluid>
        <b-row class="header-title">
          <b-col class="title" lg="11">
            <h5 class="mt-2">Painel de Controle / Quem somos</h5>
          </b-col>
        </b-row>
        <b-row class="mt-4 ml-5 mr-5">
          <b-col>
            <b-form-group label="Cargo">
              <b-form-radio-group
                class="mt-1"
                required
                v-model="form.fk_advice"
                @input="selectedOption"
              >
                <b-form-radio :value="1">Presidência</b-form-radio>
                <b-form-radio :value="2">Diretoria</b-form-radio>
                <b-form-radio :value="3">Conselho Fiscal</b-form-radio>
                <b-form-radio :value="4">Diretoria Regional</b-form-radio>
              </b-form-radio-group>
            </b-form-group>

            <b-form-group label="Nome" class="mt-1">
              <b-form-input
                placeholder="Nome completo"
                type="text"
                required
                v-model="form.nm_name"
              />
            </b-form-group>

            <b-form-group label="Cargo">
              <b-form-input required v-model="form.nm_office" />
            </b-form-group>

            <b-form-group label="Telefone" v-if="selected == 1">
              <b-form inline>
                <b-input
                  placeholder="ddd"
                  style="width: 100px;"
                  required
                  v-model="form.nm_ddd"
                  type="tel"
                />
                <b-input
                  placeholder="Apenas números"
                  class="ml-3"
                  required
                  v-model="form.nm_phone"
                  type="tel"
                />
              </b-form>
            </b-form-group>
          </b-col>
          <b-col v-if="selected == 1">
            <ImageUpload
              :id="about.id_about"
              folder="public/institucional/about"
              :path="about.nm_image_path"
              size="150x150"
            />

            <span v-if="form.nm_image_path">
              {{form.nm_image_path | fileName }}
              <b-button size="sm" variant="default" @click="deleteImage()">
                <b-icon icon="trash" variant="danger" />
              </b-button>
            </span>
            <b-row>
              <b-col>
                <b-img v-if="form.nm_image_path" :src="form.nm_image_path" width="150" height="150"></b-img>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </b-form>
    <SessionOff ref="session" />
    <ModalError ref="error" :errors="errors" />
  </div>
</template>

<script>
import ImageUpload from "../../image/ImageUpload";
import ModalError from "../../error/ModalError";
import SessionOff from "../../session/Session";
export default {
  created() {},

  components: {
    ModalError,
    SessionOff,
    ImageUpload
  },

  data() {
    return {
      errors: {},
      loading: false,
      countdown: 0,
      selected: 1,
      about: {}
    };
  },

  computed: {
    token: function() {
      return this.$session.get("jwt");
    },

    form: function() {
      return this.about;
    },

    file: function() {
      return this.$store.getters.getImage;
    }
  },

  methods: {
    preventDefault(evBvModal) {
      evBvModal.preventDefault();
      this.sendForm();
    },

    sendForm() {
      this.loading = true;
      this.save();
    },

    save() {
      let cropImage = this.$store.getters.getCropImage;
      let image = null;

      if (cropImage) {
        image = cropImage;
      } else {
        image = this.file;
      }

      let form = new FormData();
      form.append("id_about", this.form.id_about);
      form.append("nm_name", this.form.nm_name);
      form.append("nm_office", this.form.nm_office);
      form.append("nm_ddd", this.form.nm_ddd);
      form.append("nm_phone", this.form.nm_phone);
      form.append("fk_advice", this.form.fk_advice);
      form.append("nm_image_path", this.form.nm_image_path);
      form.append("file", image);

      this.$http
        .post("about", form, {
          headers: {
            Authorization: "Bearer " + this.token,
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          if (res.status === 200) {
            this.loading = false;

            if (res.data.token_failure) {
              this.$refs.session.$refs.session.show();
            }

            if (res.data.result.error) {
              this.$refs.error.$refs["modal-error"].show();
              this.errors = res.data.result;
            } else {
              this.$refs["about"].hide();
              this.$store.dispatch("about");
            }
          }
        })
        .catch(err => {
          this.errors.push(err.data.result.error);
          this.visibility = true;
        });
    },

    selectedOption(opt) {
      this.selected = opt;
    },

    deleteImage() {
      let formData = new FormData();

      formData.append("table", "abouts");
      formData.append("update_field", "nm_image_path");
      formData.append("where_field", "id_about");
      formData.append("id", this.form.id_about);
      formData.append("image_path", this.form.nm_image_path);
      formData.append("folder", "public/about");

      this.$http
        .post("storage/delete", formData, {
          headers: {
            Authorization: "Bearer " + this.token
          }
        })
        .then(res => {
          if (res.status === 200) {
            this.form.nm_image_path = "";
          }
        });
    },

    getAbout() {
      let id = this.$route.params.id;

      if (Number.isInteger(id)) {
        this.$http("about" + id, {
          headers: {
            Authorization: "Bearer " + this.token
          }
        })
          .then(res => {
            if (res.status === 200) {
              this.about = res.data.result.about;
            }
          })
          .catch(err => {
            window.console.log(err);
          });
      }
    }
  }
};
</script>