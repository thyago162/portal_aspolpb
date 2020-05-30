<template>
  <div>
    <b-modal
      id="about-form"
      ref="about"
      title="NOVO MEMBRO"
      header-bg-variant="success"
      header-text-variant="light"
      size="lg"
      ok-title="Salvar"
      cancel-title="Fechar"
      @ok="preventDefault"
      ok-only
    >
      <template v-slot:modal-footer="{ok}">
        <b-button @click="preview()" v-if="formControl > 1" variant="primary">Anterior</b-button>
        <b-button @click="next()" v-if="formControl < 2" variant="primary">Próximo</b-button>
        <div v-if="formControl === 2">
          <b-button variant="danger" size="md" @click="ok()">
            <span :style="{fontWeight: 'bolder'}">Salvar</span>
            <b-spinner small label="Small Spinner" class="ml-1" v-show="loading"></b-spinner>
          </b-button>
        </div>
      </template>

      <b-form @submit.stop.prevent="sendForm">
        <b-container>
          <b-row>
            <b-col v-if="formControl == 1">
              <b-form-group label="Nome">
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

              <b-form-radio-group
                class="mt-4"
                required
                v-model="form.fk_advice"
                @input="selectedOption"
              >
                <b-form-radio :value="1">Presidência</b-form-radio>
                <b-form-radio :value="2">Diretoria</b-form-radio>
                <b-form-radio :value="3">Conselho Fiscal</b-form-radio>
                <b-form-radio :value="4">Diretoria Regional</b-form-radio>
              </b-form-radio-group>
            </b-col>
            <b-col v-if="formControl == 2">
                <ImageUpload
                    :id="about.id_about"
                    folder="public/institucional/about"
                    :path="about.nm_image_path"
                    size="150x150"
                />
            </b-col>
          </b-row>
        </b-container>

      </b-form>
    </b-modal>

    <SessionOff ref="session" />
    <ModalError ref="error" :errors="errors" />
  </div>
</template>

<script>
import ImageUpload from "../../image/ImageUpload";
import ModalError from "../../error/ModalError";
import SessionOff from "../../session/Session";
export default {
  props: ["about"],

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
      formControl: 1
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
      return this.$store.getters.getImage
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
        let form = new FormData();
        form.append('id_about', this.form.id_about);
        form.append("nm_name", this.form.nm_name);
        form.append("nm_office", this.form.nm_office);
        form.append("nm_ddd", this.form.nm_ddd);
        form.append("nm_phone", this.form.nm_phone);
        form.append("fk_advice", this.form.fk_advice);
        form.append("nm_image_path", this.form.nm_image_path);
        form.append('file', this.file);

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

    next() {
      if (this.formControl <= 4) {
        parseInt((this.formControl += 1));
      }
    },

    preview() {
      if (this.formControl > 1) {
        parseInt((this.formControl -= 1));
      }
    }
  }
};
</script>