<template>
  <b-container fluid class="mb-3">
    <b-row class="header-title">
      <b-col class="title" lg="11">
        <h5 class="mt-2">
          <b-link class="navigation-link" :to="{name: 'table-file'}">Arquivos</b-link>/ Formulário
        </h5>
      </b-col>
    </b-row>

    <b-row class="mt-3 ml-5 mr-5">
      <b-col>
        <b-form @submit.stop.prevent="formSubmited">
          <b-form-group label="Nome do arquivo">
            <b-form-input type="text" v-model="form.nm_name" />
          </b-form-group>
          <b-form-group label="Arquivo">
            <b-form-file v-model="file" :state="Boolean(file)"></b-form-file>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>

    <b-row class="ml-5 mr-5">
      <b-col>
        <hr />
      </b-col>
    </b-row>
    <b-row>
      <b-col class="buttons">
        <b-button class="mr-2" variant="info">Resetar</b-button>
        <b-button variant="success" @click="formSubmited()">Salvar</b-button>
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
  mounted() {
    this.clearForm();
    this.getFile();
  },
  components: {
    ModalError,
    SessionOff
  },

  data() {
    return {
      file: null,
      form: {},
      loading: false,
      countdown: 0,
      errors: {},
      value: ""
    };
  },

  computed: {
    token() {
      return this.$store.getters.getToken;
    }
  },

  methods: {
    getFile() {
      let id = this.$route.params.id;

      if (Number.isInteger(id)) {
        this.$http
          .get("file/show/" + id, {
            headers: {
              Authorization: "Bearer " + this.token
            }
          })
          .then(res => {
            if (res.status === 200) {
              this.form = res.data.result.file;
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
      let formData = new FormData();

      formData.append('id_file', this.form.id_file);
      formData.append("nm_name", this.form.nm_name);
      formData.append("nm_file_path", this.form.nm_file_path);

      this.$http
        .post("file", formData, {
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
              this.$store.disptach("file", this.token);
              this.$router.push({name: 'table-file'});
            }
          }
        });
    },

    clearForm() {
      this.form.nm_name = "";
      this.form.nm_file_path = "";
      this.file = null;
    }
  }
};
</script>

<style scoped>
</style>