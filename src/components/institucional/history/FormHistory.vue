<template>
  <b-overlay :show="loading">
    <b-modal
      id="form-history"
      ref="form-history"
      header-bg-variant="success"
      header-text-variant="light"
      title="Nossa história"
      size="xl"
      @ok="handleOk"
      ok-only
    >
      <template v-slot:modal-footer="{ok}">
        <b-button variant="danger" size="md" @click="ok()">
          <span :style="{fontWeight: 'bolder'}">Salvar</span>
        </b-button>
      </template>

      <b-alert variant="warning" dismissible :show="true">Os campos com asteriscos são obrigatórios</b-alert>

      <form @submit.stop.prevent="formSubmited">
        <b-form-group label="Conteúdo *">
          <vue-editor v-model="form.nm_content"></vue-editor>
        </b-form-group>
      </form>
      <SessionOff ref="session" />
      <ModalError ref="error" :errors="errors" />
    </b-modal>
  </b-overlay>
</template>

<script>
import { VueEditor } from "vue2-editor";
import SessionOff from "../../session/Session";
import ModalError from "../../error/ModalError";

export default {
  props: ["item"],

  data() {
    return {
      errors: {},
      loading: false
    };
  },

  components: {
    VueEditor,
    ModalError,
    SessionOff
  },

  computed: {
    token: function() {
      return this.$session.get("jwt");
    },

    form: function() {
      return this.item;
    }
  },

  methods: {
    handleOk(bvEvtModal) {
        this.loading = true;
      bvEvtModal.preventDefault();
      this.formSubmited();
    },

    formSubmited() {
      if (!this.form.id_our_history) {
        this.save();
      } else {
        this.update();
      }
    },

    save() {
      let form = new FormData();
      form.append("nm_content", this.form.nm_content);

      this.$http
        .post("our-history", form, {
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
              this.$store.dispatch("ourHistory");
              this.$refs["form-history"].hide();
            }
          }
        });
    },

    update() {
        this.loading = true;
      this.$http
        .put(
          "our-history/" + this.form.id_our_history,
          {
            nm_content: this.form.nm_content
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
              this.$refs.error.$refs["modal-error"].show();
              this.errors = res.data.result;
            } else {
              this.$store.dispatch("ourHistory");
              this.$refs["form-history"].hide();
            }
          }
        });
    }
  }
};
</script>