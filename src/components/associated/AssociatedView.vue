<template>
  <b-container fluid class="mb-3">
    <b-row class="mt-3 ml-3 mr-3">
      <b-col>
        <b-tabs>
          <b-tab title="Associado">
            <b-list-group class="mt-3">
              <b-list-group-item>Número de registro: {{item.nu_registration}}</b-list-group-item>
              <b-list-group-item>Cpf: {{item.nm_cpf}}</b-list-group-item>
              <b-list-group-item>Email: {{item.nm_email}}</b-list-group-item>
              <b-list-group-item>Telefone: {{item.nm_phone}}</b-list-group-item>
              <b-list-group-item>Rg: {{item.nu_rg}}</b-list-group-item>
              <b-list-group-item>Data de nascimento: {{item.dt_birthday | date}}</b-list-group-item>
              <b-list-group-item>Estado civíl: {{item.nm_civil_state}}</b-list-group-item>
              <b-list-group-item>Sexo: {{item.ch_sex == 'M' ? 'Masculino' : 'Feminino'}}</b-list-group-item>
              <b-list-group-item>Nível de Escolaridade: {{item.nm_education_level}}</b-list-group-item>
              <b-list-group-item>Profissão: {{item.nm_office}}</b-list-group-item>
              <b-list-group-item>Classe: {{item.nm_office_class}}</b-list-group-item>
              <b-list-group-item>Lotação (Superintendência): {{item.nm_super_stocking}}</b-list-group-item>
              <b-list-group-item>Lotação (Seccional): {{item.nm_sectional_stocking}}</b-list-group-item>
              <b-list-group-item>Unidade de trabalho: {{item.nm_work_unit}}</b-list-group-item>
              <b-list-group-item>Município em que trabalha: {{item.nm_municipality_work_unit}}</b-list-group-item>
              <b-list-group-item>Cep: {{item.nm_cep}}</b-list-group-item>
              <b-list-group-item>Rua: {{item.nm_street}}, Nº {{item.nu_number}}</b-list-group-item>
              <b-list-group-item>Complemento: {{item.nm_complement}}</b-list-group-item>
              <b-list-group-item>Bairro: {{item.nm_neighbohood}}</b-list-group-item>
              <b-list-group-item>Cidade: {{item.nm_city}}, {{item.nm_uf}}</b-list-group-item>
            </b-list-group>
          </b-tab>

          <b-tab title="Dependentes" @click="getDependents(item.id_associated)">
            <b-list-group>
              <b-list-group-item v-for="(dependent, index) in dependents" :key="index">
                <div class="dependents">
                  <span>Nome:</span>
                  {{dependent.nm_dependent_name}}
                  <span
                    class="ml-5"
                  >Data de nascimento:</span>
                  <span>Data de nascimento</span>
                  {{dependent.dt_dependent_birthday}}
                  <b-icon icon="trash"></b-icon>
                </div>
              </b-list-group-item>
            </b-list-group>
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
    <CorrectData :item="item" />
  </b-container>
</template>

<script>
import CorrectData from "./CorrectData";
export default {
  props: ["item"],

  components: {
    CorrectData
  },

  computed: {
    items: function() {
      return [this.item];
    },

    token: function() {
      return this.$session.get("jwt");
    }
  },

  data() {
    return {
      errors: [],
      dependents: [],
      name: "",
      birthday: "",
      visibility: true,
      loading: false
    };
  },

  methods: {
    setDependent(param) {
      let id = param.id_associated_dependent;
      let name = this.name.length > 0 ? this.name : param.nm_dependent_name;

      let birthday =
        this.birthday.length > 0 ? this.birthday : param.dt_dependent_birthday;

      this.$http
        .put(
          "associated-dependent/" + id,
          {
            nm_dependent_name: name,
            dt_dependent_birthday: birthday
          },
          {
            headers: {
              Authorization: "Bearer " + this.token
            }
          }
        )
        .then(res => {
          if (res.status === 200) {
            this.dependents = res.data.result.associatedDependent;
          }
        })
        .catch(err => {
          window.console.log(err);
        });
    },

    getDependents(id) {
      this.loading = true;
      this.$http("associated-dependent/" + id, {
        headers: {
          Authorization: "Bearer " + this.token
        }
      })
        .then(res => {
          if (res.status === 200) {
            this.dependents = res.data.result.associatedDependent;
          }
        })
        .catch(err => {
          window.console.log(err);
        });
    },

    defer(id) {
      this.loading = true;
      this.$http
        .put("associated/defer/" + id, {
          headers: {
            Authoriazation: "Bearer " + this.token
          }
        })
        .then(res => {
          if (res.status === 200) {
            this.loading = false;
            alert("Cadastro deferido.");
          }
        })
        .catch(err => {
          this.errors.push(err);
          this.visibility = true;
        });
    }
  }
};
</script>

<style scoped>
.list-group div:nth-child(2n) {
  background-color: rgb(182, 179, 179);
}

.dependents {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
</style>