<template>
  <b-container fluid class="mb-3">
    <b-row class="header-title">
      <b-col class="title" lg="11">
        <h5 class="mt-2">
          Meus dados
        </h5>
      </b-col>
    </b-row>

    <form class="mt-3 ml-5 mr-5">
      <b-form-group label="Nome">
        <b-form-input v-model="form.name" :readonly="lock" />
      </b-form-group>

      <b-form-group label="Email">
        <b-form-input v-model="form.email" :readonly="lock" />
      </b-form-group>

      <b-form-group label="Cpf">
        <b-form-input v-model="form.cpf" readonly/>
      </b-form-group>

      <b-form-group label="Matrícula">
        <b-form-input v-model="form.registration_number" readonly />
      </b-form-group>

      <b-form-group label="Password">
        <b-form-input v-model="form.password" :readonly="lock" placeholder="*************" />
      </b-form-group>
    </form>

    <b-row class="mt-3 ml-5 mr-5">
      <b-col>
        <hr />
      </b-col>
    </b-row>

    <b-row>
      <b-col class="buttons">
        <b-button variant="warning" @click="lock = !lock" class="mr-2">Editar</b-button>
        <b-button v-if="!lock" variant="success">Salvar</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  computed: {
    form: function() {
      let user = this.$session.get("user");
      if (!user) {
        return {};
      } else {
        return user;
      }
    }
  },

  data() {
    return {
      lock: true
    };
  }
};
</script>