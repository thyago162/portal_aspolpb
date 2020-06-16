<template>
  <b-container fluid>
    <b-row class="mt-3 ml-5 mr-5">
      <b-col>
        
        <form @submit.stop.prevent="formSubmited">
          <b-form-group label="Nome do arquivo">
            <b-form-input type="text" v-model="form.nm_name" />
          </b-form-group>

          <b-form-group label="Arquivo">
            <b-form-file accept="application/pdf" v-model="file" :state="Boolean(file)"></b-form-file>
          </b-form-group>

          <b-form-group label="Tipo de documento">
            <b-form-select :options="options" v-model="form.nm_type_doc"></b-form-select>
          </b-form-group>

          <b-form-group label="Ano do documento">
            <b-form-input type="date" placeholder="Ex: 2020" v-model="form.dt_date" />
          </b-form-group>
        </form>
      </b-col>
    </b-row>

    <b-row class="mt-2 ml-5 mr-5">
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
import SessionOff from "../session/Session";
import ModalError from "../error/ModalError";
export default {
  props: ['id'],

  mounted() {
    this.clearForm();
  },

  components: {
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
      form: {},
      errors: {},
      file: null,
      loading: false,
      options: [
        { value: "Contabilidade", text: "Contabilidade" },
        { value: "Certidão", text: "Certidão" },
        { value: "Financeiro", text: "Financeiro" },
        { value: "Outros", text: "Outros" }
      ]
    };
  },

  methods: {
    formSubmited() {
      this.loading = true;
      this.save();
    },

    save() {
      let form = new FormData();

      form.append("id_transparency_file", this.form.id_transparency_file);
      form.append("nm_name", this.form.nm_name);
      form.append("nm_file_path", this.form.nm_file_path);
      form.append("nm_type_doc", this.form.nm_type_doc);
      form.append("dt_date", this.form.dt_date);
      form.append("fk_transparency", this.id);
      form.append("file", this.file);

      this.$http
        .post("transparency-file", form, {
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
              this.errors = res.data.result;
              this.$refs.error.$refs["modal-error"].show();

            } else {
              this.$store.dispatch("transparency", this.token);
              this.clearForm();

              this.errors = {};
            }
          }
        });
    },

    clearForm() {
      this.form.id_transparency_file = "";
      this.form.nm_name = "";
      this.form.nm_file_path = "";
      this.form.nm_type_doc = "";
      this.form.dt_date = "";
      (this.form.fk_transparency = ""), (this.file = null);
    }
  }
};
</script>