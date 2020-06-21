<template>
  <b-container fluid class="mb-3">
     <b-row class="header-title ml-1 mr-1">
      <b-col class="title">
        <h5 class="mt-2">Associados</h5>
      </b-col>
    </b-row>
    <b-row class="mt-4 ml-1 mr-1">
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
    <b-row class="mt-3 ml-1 mr-1">
      <b-col>
        <b-table :fields="fields" :items="associated">
          <template v-slot:cell(show_details)="row" hover striped >
            <b-button
              size="sm"
              @click="row.toggleDetails"
              class="mr-2"
            >{{ row.detailsShowing ? 'Menos' : 'Mais'}} Detalhes</b-button>
      
            <b-button  size="sm" @click="row.item" variant="info" class="mr-2">
              Solicitar correção
            </b-button>

            <b-button size="sm" class="mr-2 ml-2" @click="refer(row.item.id_associated)" variant="success">
              Deferir
            </b-button>
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
        { key: "nm_name", label: "Nome" },
        { key: "show_details", label: "" },
        { key: 'registration_status', label: ""},
        {key: 'correct_data', label: ""}
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
  button {
    float: right;
  }
</style>