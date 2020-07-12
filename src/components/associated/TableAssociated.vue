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
          <template v-slot:cell(st_active)="row">
            <b-icon variant="success" icon="check-square-fill" v-if="row.item.st_active == 1" />
            <b-icon  icon="check-square" v-else />
          </template>
          <template v-slot:cell(show_details)="row" hover striped>
            <b-button
              size="sm"
              @click="row.toggleDetails"
              class="mr-2"
            >{{ row.detailsShowing ? 'Menos' : 'Mais'}} Detalhes</b-button>
            <b-button
              @click="deactivate(row.item.id_associated)"
              class="mr-2"
              variant="warning"
              size="sm"
              v-if="row.item.st_active === 1"
            >Desativar conta</b-button>

            <b-button
              size="sm"
              @click="row.item"
              v-b-modal.correct-data
              variant="info"
              class="mr-2"
            >Solicitar correção</b-button>

            <b-button
              size="sm"
              class="mr-2 ml-2"
              @click="defer(row.item.id_associated)"
              variant="success"
              v-if="row.item.st_active === 0"
            >Deferir</b-button>
          </template>

          <template v-slot:row-details="row">
            <b-card>
              <AssociatedView :item="row.item" />
            </b-card>
          </template>
        </b-table>
      </b-col>
    </b-row>
    <CorrectData />
    <SessionOff ref="session" />
    <ErroMessage ref="error" :errors="errors" />
  </b-container>
</template>

<script>
import AssociatedView from "../associated/AssociatedView";
import CorrectData from "./CorrectData";
import SessionOff from "../session/Session";
import ErroMessage from "../error/ModalError";
export default {
  components: {
    AssociatedView,
    CorrectData,
    SessionOff,
    ErroMessage
  },

  created() {
    this.$store.dispatch("associated", this.token);
  },

  data() {
    return {
      search: "",
      errors: [],
      fields: [
        { key: "nm_name", label: "Nome" },
        {key: 'st_active', label: "Ativo", sortable: true},
        { key: "show_details", label: "" },
        { key: "registration_status", label: "" },
        { key: "correct_data", label: "" }
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
            this.$store.dispatch("associated", this.token);
          }
        })
        .catch(err => {
          window.console.log(err);
        });
    },

    deactivate(id) {
      this.$http
        .put(
          "associated/deactivate/" + id,
          {
            st_active: 0
          },
          {
            headers: {
              Authorization: "Bearer " + this.token
            }
          }
        )
        .then(res => {
          if (res.status === 200) {
            if (res.data.token_failure) {
              this.$refs.session.$refs.session.show();
            }

            if (res.data.result.error) {
              this.$refs.error.$refs["modal-error"].show();
              this.errors = res.data.result;
            } else {
              alert("Ação bem sucedida, associado desativado");
              this.$store.dispatch("associated", this.token);
            }
          }
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