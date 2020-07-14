<template>
  <b-modal
    id="auth"
    :title="title"
    @ok="handleOk"
    @reset="resetModal"
    no-close-on-backdrop
    @cancel="resetModal"
    :ok-title="btnTitle"
    ref="auth"
    hide-header
    size="lg"
    cancel-title="Fechar"
    ok-variant="danger"
    cancel-variant="dark"
    @hide="resetModal"
  >
    <b-overlay :show="loading">
      <template v-slot:modal-footer="{ok, cancel}">
        <b-button @click="cancel()" size="md" variant="dark">
          <span :style="{fontWeight: 'bolder'}">Fechar</span>
        </b-button>

        <b-button variant="danger" size="md" @click="ok()">
          <span :style="{fontWeight: 'bolder'}">{{btnTitle}}</span>
        </b-button>
      </template>
      <b-container fluid>
        <b-row>
          <b-col class="logo">
            <b-img :src="image" width="250px" height="120px"></b-img>
          </b-col>
        </b-row>

        <b-row v-if="!auth">
          <b-col>
            <b-alert
              :show="true"
              variant="warning"
              dismissible
            >Aviso! Para poder se registrar, é necessário ser associado.</b-alert>
          </b-col>
        </b-row>

        <b-row class="mt-4">
          <b-col class="body">
            <div class="form">
              <form @submit.stop.prevent="sendForm" :style="{width: '80%'}">
                <b-form-group label="Nome completo *" v-show="!auth">
                  <b-form-input type="text" autocomplete v-model="formData.name" required min="10" />
                </b-form-group>

                <b-form-group label="Cpf *" v-show="!auth">
                  <b-form-input type="text" trim autocomplete v-model="formData.cpf" />
                </b-form-group>

                <b-form-group label="Email">
                  <b-form-input type="email" autocomplete v-model="formData.email" required trim />
                </b-form-group>

                <b-link
                  @click="closeModal"
                  v-show="auth"
                  class="reset"
                  v-b-modal.reset-password
                >Esqueceu a senha?</b-link>

                <b-form-group label="Senha">
                  <b-input-group>
                    <b-form-input
                      trim
                      placeholder="Minimo de 6 caracteres"
                      v-model="formData.password"
                      min="6"
                      id="password"
                      :type="type"
                      autocomplete
                    />
                    <b-input-group-append>
                      <b-button variant="danger" @click="showPasswordValue">
                        <b-icon icon="eye" v-show="showPassword"></b-icon>
                        <b-icon icon="eye-slash" v-show="!showPassword"></b-icon>
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>

                <b-popover target="password" triggers="hover" placement="top">
                  <template v-slot:title>A senha deve conter</template>

                  <p>Pelo menos 1 caractere especial</p>
                  <p>Pelo menos 1 letra maiscula</p>
                  <p>Pelo menos 1 letra minuscula</p>
                  <p>Pelo menos 1 número</p>
                </b-popover>

                <b-form-group v-show="!auth" label="Confirmar senha">
                  <b-input-group>
                    <b-form-input
                      trim
                      placeholder="Minimo de 6 caracteres"
                      v-model="formData.confirmation"
                      min="6"
                      id="password-confirmation"
                      :type="type"
                      autocomplete
                    />
                    <b-input-group-append>
                      <b-button variant="danger" @click="showPasswordValue">
                        <b-icon icon="eye" v-show="showPassword"></b-icon>
                        <b-icon icon="eye-slash" v-show="!showPassword"></b-icon>
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>

                <p v-show="!auth">
                  Possui uma conta? Clique aqui para
                  <a
                    href="#registrar"
                    @click="loginOrRegister"
                  >entrar</a>
                </p>
                <p v-show="auth">
                  Não tem uma conta? Clique aqui para se
                  <a
                    href="#login"
                    @click="loginOrRegister"
                  >registrar</a>
                </p>
              </form>
            </div>
          </b-col>
        </b-row>
      </b-container>

      <ModalError ref="error" :errors="errors" />
    </b-overlay>
  </b-modal>
</template>

<script>
import ModalError from "../error/ModalError";

export default {
  components: {
    ModalError
  },
  data() {
    return {
      auth: true,
      visibility: false,
      formData: {
        name: "",
        email: "",
        cpf: "",
        password: "",
        confirmation: ""
      },
      showPassword: false,
      type: "password",
      image: require("../../assets/images/logo_aspol_02.png"),
      loading: false,
      errors: {}
    };
  },
  computed: {
    title() {
      return this.auth ? "Fazer login" : "Criar uma conta";
    },
    btnTitle() {
      return this.auth ? "Login" : "Registrar";
    }
  },
  methods: {
    showPasswordValue() {
      this.showPassword = !this.showPassword;
      this.showPassword == true
        ? (this.type = "text")
        : (this.type = "password");
    },
    loginOrRegister() {
      this.auth = !this.auth;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.sendForm();
    },
    sendForm() {
      !this.auth ? this.register() : this.authenticate();
    },
    register() {
      if (this.passwordsMatch()) {
        this.loading = true;
        this.visibility = false;
        let form = new FormData();
        form.append("name", this.formData.name);
        form.append("email", this.formData.email);
        form.append("cpf", this.formData.cpf);
        form.append("password", this.formData.password);
        form.append("password_confirmation", this.formData.confirmation);
        this.$http.post("register", form).then(res => {
          if (res.status === 200 && res.data.response.token) {
            this.loading = false;
            this.$refs["auth"].hide();
            this.resetModal();
            this.auth = true;
            alert(
              "Solicitação de cadastro enviada, estamos analisado os dados e um e-mail ser-a enviado com a confirmação do registro!"
            );
          } else {
            this.loading = false;
            this.$refs.error.$refs["modal-error"].show();
            this.errors = res.data.response;
          }
        });
      }
    },
    authenticate() {
      this.loading = true;
      this.visibility = false;

      let form = new FormData();
      form.append("email", this.formData.email);
      form.append("password", this.formData.password);
      this.$http.post("login", form).then(res => {
        if (res.status === 200) {
          this.loading = false;
          if ("token" in res.data.response) {
            this.$session.start();
            this.$session.set("jwt", res.data.response.token);
            this.$session.set("user", res.data.response.user);
            this.$store.dispatch("token", res.data.response.token);
            this.$store.dispatch("loggedIn", res.data.response.user);
            this.$refs["auth"].hide();
          } else {
            this.$refs.error.$refs["modal-error"].show();
            this.errors = res.data.response;
          }
        }
      });
    },
    resetModal() {
      this.formData.name = "";
      this.formData.email = "";
      this.formData.password = "";
      this.formData.confirmation = "";
      this.errors = {};
    },
    passwordsMatch() {
      if (this.formData.password != this.formData.confirmation) {
        alert("As senhas não coincidem");
      } else {
        return true;
      }
    },
    closeModal() {
      this.$refs["auth"].hide();
    }
  }
};
</script>

<style scoped>
.loading {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.logo {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.body {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.form {
  border: 1px solid lightgrey;
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 30px;
}
.reset {
  position: absolute;
  margin-left: 50%;
}
@media screen and (max-width: 990px) {
  .reset {
    position: absolute;
    margin-left: 40%;
  }
}
@media screen and (max-width: 500px) {
  .reset {
    font-size: 10px;
  }
  .form {
    width: 100%;
  }
}
</style>