<template>
  <b-container fluid class="mb-3">
    <b-row class="header-title">
      <b-col class="title" lg="11">
        <h5 class="mt-2">
          <b-link class="navigation-link" :to="{name: 'transparencia'}">Transparência</b-link>/ Formulário
        </h5>
      </b-col>
    </b-row>
    <b-row class="mt-3 ml-5 mr-5">
      <b-col>
        <form @submit.stop.prevent="formSubmited">
          <b-form-group label="Título">
            <b-form-input type="text" v-model="form.nm_management_name" />
          </b-form-group>

          <b-row>
            <b-col>
              <b-form-group label="Início do mandato">
                <b-form-input type="date" v-model="form.nu_start" />
              </b-form-group>
            </b-col>

            <b-col>
              <b-form-group label="Fim do mandato">
                <b-form-input type="date" v-model="form.nu_end" />
              </b-form-group>
            </b-col>
          </b-row>

          <b-form-group>
            <VueEditor v-model="form.nm_content" />
          </b-form-group>
        </form>
      </b-col>
    </b-row>

    <b-row class="mt-3 ml-5 mr-5">
      <b-col>
        <hr />
      </b-col>
    </b-row>

    <b-row>
      <b-col class="buttons">
        <b-button variant="info" class="mr-2">Resetar</b-button>
        <b-button variant="success" @click="formSubmited()">Salvar</b-button>
      </b-col>
    </b-row>
    <SessionOff ref="session" />
    <ModalError ref="error" :errors="errors" />
  </b-container>
</template>

<script>
import { VueEditor } from "vue2-editor";
import SessionOff from "../session/Session";
import ModalError from "../error/ModalError";

export default {
  created() {
    this.getManagement();
  },
  components: {
    VueEditor,
    SessionOff,
    ModalError
  },

  computed: {
    token: function() {
      return this.$session.get("jwt");
    }
  },

  data() {
    return {
      form: {
        nm_management_name: "",
        nu_start: "",
        nu_end: "",
        nm_content: ""
      },
      loading: false,
      errors: {},
      visibility: false
    };
  },

  methods: {
    getManagement() {
      let id = this.$route.params.id;

      if (Number.isInteger(id)) {
        this.$http
          .get("transparency/show/" + id, {
            headers: {
              Authorization: "Bearer " + this.token
            }
          })
          .then(res => {
            if (res.status === 200) {
              this.form = res.data.result.transparency;
            }
          })
          .catch(err => {
            window.console.log(err);
          });
      }
    },
    formSubmited() {
      this.loading = true;
      this.save();
    },

    save() {
      let form = new FormData();

      form.append("nm_management_name", this.form.nm_management_name);
      form.append("nm_content", this.form.nm_content);
      form.append("nu_start", this.form.nu_start);
      form.append("nu_end", this.form.nu_end);

      this.$http
        .post("transparency", form, {
          headers: {
            Authorization: "Bearer " + this.token
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
              this.$store.dispatch("transparency", this.token);
            }
          }
        });
    }
  }
};
</script>

<style scoped>
</style>