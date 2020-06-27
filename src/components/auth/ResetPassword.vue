<template>
  <b-modal
    hide-header
    @ok="handleOk"
    id="reset-password"
    header-bg-variant="danger"
    cancel-title="Fechar"
    :ok-title="btnTitle[step]"
    header-text-variant="light"
  >
    <b-container fluid>
      <b-row>
        <b-col class="logo">
          <b-img :src="image" width="250px" height="120px"></b-img>
        </b-col>
      </b-row>

      <b-row v-show="loading">
        <b-col
          :style="{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}"
        >
          <b-spinner></b-spinner>
        </b-col>
      </b-row>

      <b-row class="mt-3">
        <b-col>
          <div>
            <b-form @submit.stop.prevent="formSubmited">
              <transition name="slide-fade">
                <div v-if="step === 0">
                  <b-form-group label="Entre com o seu e-mail">
                    <b-form-input type="email" v-model="email" placeholder="Ex: exemplo@email.com" />
                  </b-form-group>
                </div>

                <div v-if="step === 1">
                  <b-form-group label="Informe o código de 4 digitos enviado para o seu e-mail">
                    <b-form-input type="text" v-model="code" />
                  </b-form-group>
                </div>

                <div v-if="step === 2">
                  <b-form-group label="Nova senha">
                    <b-form-input type="password" id="password-reset" v-model="password" />
                  </b-form-group>

                  <b-popover target="password-reset" triggers="hover" placement="top">
                    <template v-slot:title>A senha deve conter</template>

                    <p>Pelo menos 1 caractere especial</p>
                    <p>Pelo menos 1 letra maiscula</p>
                    <p>Pelo menos 1 letra minuscula</p>
                    <p>Pelo menos 1 número</p>
                  </b-popover>

                  <b-form-group label="Confirmar senha">
                    <b-form-input type="password" v-model="confirmation" />
                  </b-form-group>
                </div>
              </transition>
            </b-form>
          </div>
        </b-col>
      </b-row>
      <ModalErro :errors="error" ref="error" />
    </b-container>
  </b-modal>
</template>

<script>
import ModalErro from "../error/ModalError";
export default {
  components: { ModalErro },
  data() {
    return {
      step: 2,
      btnTitle: ["Enviar", "Confirmar", "Resetar"],
      email: "",
      password: "",
      confirmation: "",
      loading: false,
      code: "",
      user: [],
      error: [],
      image: require("../../assets/images/logo_aspol_02.png")
    };
  },

  methods: {
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.formSubmited();
    },

    formSubmited() {
      this.loading = true;

      if (this.step === 0) {
        this.stepOne();
      } else if (this.step === 1) {
        this.stepTwo();
      } else {
        this.stepThree();
      }
    },

    stepOne() {
      let form = new FormData();
      form.append("email", this.email);

      this.$http.post("reset-password-email", form).then(res => {
        this.loading = false;
        if (res.status === 200) {
          alert("Email enviado com successo.");
          this.step = 1;
          this.user = res.data.result.user;
        } 
      }).catch(err => {
        this.loading = false;
        window.console.log(err);
        alert('Falha ao enviar o e-mail');
      });
    },

    stepTwo() {
      let form = new FormData();
      form.append("token", this.code);
      form.append("id", this.user.id_user);

      this.$http.post("reset-password-code", form).then(res => {
        if (res.status === 200) {
          this.loading = false;
          if (res.data.result.error) {
            this.error = res.data.result;
            this.$refs.error.$refs["modal-error"].show();
          } else {
            alert("Token verificado!");
            this.step = 2;
          }
        }
      });
    },

    stepThree() {
      let form = new FormData();
      form.append("id", this.user.id_user);
      form.append("step", this.step);
      form.append("password", this.password);
      form.append("password_confirmation", this.confirmation);

      this.$http
        .post("reset-password", form)
        .then(res => {
          if (res.status === 200) {
            this.loading = false;
            if (res.data.result.error) {
              this.error = res.data.result;
              this.$refs.error.$refs["modal-error"].show();
            } else {
              alert("A senha foi resetada.");
              this.step = 0;
            }
          }
        })
        .catch(err => {
          window.console.log(err);
        });
    }
  }
};
</script>

<style scoped>
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

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active em versões anteriores a 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>