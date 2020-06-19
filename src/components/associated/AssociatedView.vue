<template>
  <b-container fluid class="mb-3">

    <b-row class="mt-3 ml-3 mr-3">
      <b-col>
        <b-list-group >
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
      return this.$store.getters.getToken;
    }
  },

  data() {
    return {
      errors: [],
      visibility: true,
      loading: false
    };
  },

  methods: {
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
</style>