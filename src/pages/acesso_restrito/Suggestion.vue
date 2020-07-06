<template>
  <b-overlay :show="loading">
    <b-container fluid class="mb-3">
      <b-row class="header-title mt-3 ml-1 mr-1">
        <b-col class="title">
          <h5 class="mt-2">SUGESTÕES</h5>
        </b-col>
      </b-row>

      <b-row class="mb-4 mt-4 ml-1 mr-1">
        <b-col>
          <form class="form" @submit.stop.prevent="sendForm">
            <b-form-group label="Nome completo">
              <b-form-input readonly v-model="user.name" />
            </b-form-group>

            <b-form-group label="E-mail">
              <b-form-input readonly v-model="user.email" />
            </b-form-group>

            <b-form-group label="Assunto">
              <b-form-input v-model="subject" required type="text"></b-form-input>
            </b-form-group>

            <b-form-group label="Conteúdo">
              <b-form-textarea required rows="10" v-model="content"></b-form-textarea>
            </b-form-group>

            <b-button variant="danger" :style="{width: '250px'}" type="submit">
              Enviar
            </b-button>
          </form>
        </b-col>
      </b-row>
      <Session ref="session" />
    </b-container>
  </b-overlay>
</template>

<script>
import Session from "../../components/session/Session";

export default {
  components: {
    Session
  },

  computed: {
    user: function() {
      return this.$session.get("user");
    },

    token: function() {
      return this.$store.getters.getToken;
    }
  },

  data() {
    return {
      subject: "",
      content: "",
      countdown: 0,
      loading: false
    };
  },

  methods: {
    sendForm() {
      this.loading = true;

      let form = new FormData();
      form.append("name", this.user.name);
      form.append("email", this.user.email);
      form.append("subject", this.subject);
      form.append("content", this.content);

      this.$http
        .post("suggestion", form, {
          headers: {
            Authorization: "Bearer " + "token"
          }
        })
        .then(res => {
          this.loading = false;
          if (res.status === 200) {
            if (res.data.token_failure) {
              this.$refs.session.$refs.session.show();
            }
            alert("E-mail enviado com sucesso!");
            location.reload();
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  }
};
</script>

<style scoped>
h5 {
  margin-top: 10px;
}

.suggestion-form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.suggestion-form form {
  width: 60%;
}

@media screen and (max-width: 414px) {
  .suggestion-form {
    justify-content: center;
    align-items: center;
  }

  .suggestion-form form {
    width: 100%;
  }
}
</style>