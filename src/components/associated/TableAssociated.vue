<template>
  <b-container fluid class="mb-3">
     <b-row class="header-title">
      <b-col class="title" lg="11">
        <h5 class="mt-2">Associados</h5>
      </b-col>
    </b-row>
    <b-row class="mt-4 ml-5 mr-5">
      <b-col lg="5">
        <b-input-group>
          <template v-slot:prepend>
            <b-input-group-text>
              <b-icon icon="search"></b-icon>
            </b-input-group-text>
          </template>
          <b-form-input v-model="search" />
        </b-input-group>
      </b-col>
    </b-row>
    <b-row class="mt-3 ml-5 mr-5">
      <b-col>
        <b-table :fields="fields" :items="associated">
          <template v-slot:cell(show_details)="row" hover striped>
            <b-button
              size="sm"
              @click="row.toggleDetails"
              class="mr-2"
            >{{ row.detailsShowing ? 'Menos' : 'Mais'}} Detalhes</b-button>
          </template>

          <template v-slot:row-details="row">
            <b-card>
              <AssociatedView :item="row.item" />
            </b-card>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AssociatedView from "../associated/AssociatedView";
export default {
  components: {
    AssociatedView
  },

  mounted() {
    this.$store.dispatch("associated", this.token);
  },

  data() {
    return {
      search: "",
      fields: [
        { key: "nu_registration", label: "Registro" },
        { key: "nm_name", label: "Nome" },
        { key: "nm_cpf", label: "Cpf" },
        { key: "nm_email", label: "Email" },
        { key: "nm_phone", label: "Telefone" },
        { key: "show_details", label: "" }
      ]
    };
  },

  computed: {
    associated: function() {
      return this.$store.getters.getAssociated;
    },

    token: function() {
      return this.$session.get("jwt");
    }
  }
};
</script>