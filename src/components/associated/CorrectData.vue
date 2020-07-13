<template>
  <b-modal
    id="correct-data"
    ref="correct-data"
    title="Corrigir dados"
    size="lg"
    header-bg-variant="info"
    header-text-variant="light"
    ok-only
    ok-title="Enviar"
    ok-variant="danger"
    @ok="handleOk"
  >
    <b-overlay :show="loading">
      <form @submit.stop.prevent="formSubmited">
        <b-form-group label="Selecione os dados a serem corrigidos.">
          <b-form-checkbox-group :options="options" v-model="selected"></b-form-checkbox-group>
        </b-form-group>
        <div>
          <h6 :style="{fontWeight: 'bolder'}">Dados escolhidos</h6>
          <div class="selected-data">
            <p v-for="(value, index) in selected" :key="index">{{ value }},</p>
          </div>
        </div>
      </form>
    </b-overlay>
  </b-modal>
</template>

<script>
export default {
  props: ["item"],

  computed: {
    token: function() {
      return this.$store.getters.getToken;
    }
  },

  data() {
    return {
      loading: false,
      options: [
        { text: "Registro", value: "Registro" },
        { text: "Nome", value: "Nome" },
        { text: "Cpf", value: "Cpf" },
        { text: "Email", value: "Email" },
        { text: "Telefone", value: "Telefone" },
        { text: "Rg", value: "Rg" },
        { text: "Sexo", value: "Sexo" },
        { text: "Data de nascimento", value: "Data de nascimento" },
        { text: "EStado civil", value: "Estado civil" },
        { text: "Escolaridade", value: "Escolaridade" },
        { text: "Profissão", value: "Profissão" },
        { text: "Classe", value: "Classe" },
        {
          text: "Lotação (Superintendência)",
          value: "Lotação (Superintendência)"
        },
        { text: "Lotação (Seccional)", value: "Lotação (Seccional)" },
        { text: "Unidade em que trabalha", value: "Unidade em que trabalha" },
        {
          text: "Município em que trabalha",
          value: "Município em que trabalha"
        },
        { text: "Cep", value: "Cep" },
        { text: "Rua", value: "Rua" },
        { text: "Número", value: "Número" },
        { text: "Complemento", value: "Complemento" },
        { text: "Bairro", value: "Bairro" },
        { text: "Cidade", value: "Cidade" },
        { text: "Estado", value: "Estado" }
      ],
      selected: []
    };
  },

  methods: {
    handleOk(event) {
      this.loading = true;

      event.preventDefault();
      this.formSubmited();
    },

    formSubmited() {
      let form = new FormData();

      form.append("selected", this.selected);
      form.append("name", this.item[0].nm_name);
      form.append("email", this.item[0].nm_email);

      this.$http
        .post("associated/correct-data", form, {
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
              this.$refs['correct-data'].hide();
              alert("E-mail enviado com sucesso");
             
            }
          }
        })
        .catch(err => {
          this.loading = false;
          window.console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.selected-data {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  background-color: lightgray;
  font-weight: bolder;
}

.selected-data p {
  margin: 5px;
}
</style>