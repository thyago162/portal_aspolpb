<template>
  <b-overlay :show="loading">
    <b-container fluid class="mb-3">
      <b-row class="header-title ml-1 mr-1">
        <b-col class="title">
          <h5 class="mt-2">Associados</h5>
        </b-col>
      </b-row>
      <b-row class="mt-4 ml-1 mr-1">
        <b-col lg="5">
          <b-form inline>
            <b-input-group>
              <template v-slot:prepend>
                <b-input-group-text>
                  <b-icon icon="search"></b-icon>
                </b-input-group-text>
              </template>
              <b-form-input v-model="search" type="search" />
            </b-input-group>

            <b-button variant="primary" class="ml-1" @click="searchMembership()">Buscar</b-button>
          </b-form>
        </b-col>
      </b-row>
      <b-row class="mt-3 ml-1 mr-1">
        <b-col>
          <b-table
            :fields="fields"
            :items="associated.data"
            :current-page="currentPage"
            :per-page="perPage"
            id="table-associated"
          >
          <template v-slot:cell(nm_cpf)="row">
            <span>{{row.item.nm_cpf | cpf }}</span>
          </template>
            <template v-slot:cell(st_active)="row">
              <b-icon variant="success" icon="check-square-fill" v-if="row.item.st_active == 1" />
              <b-icon icon="check-square" v-else />
            </template>

            <template v-slot:cell(correct_data)="row">
              <b-button
                size="sm"
                @click="correctData(row.item)"
                v-b-modal.correct-data
                variant="info"
                class="mr-2"
              >Solicitar correção</b-button>
            </template>

            <template v-slot:cell(deactivate)="row">
              <b-button
                @click="deactivate(row.item.id_associated)"
                class="mr-2"
                variant="warning"
                size="sm"
                v-if="row.item.st_active === 1"
              >Desativar conta</b-button>
              <b-button
                size="sm"
                class="mr-2 ml-2"
                @click="defer(row.item.id_associated)"
                variant="success"
                v-if="row.item.st_active === 0"
              >Deferir</b-button>
            </template>

            <template v-slot:cell(show_details)="row" hover striped>
              <b-button
                size="sm"
                @click="row.toggleDetails"
                class="mr-2"
              >{{ row.detailsShowing ? 'Menos' : 'Mais'}} Detalhes</b-button>
            </template>

            <template v-slot:cell(remove)="row">
              <b-button variant="danger" @click="remove(row.item.id_associated)" size="sm">
                <b-icon icon="trash"></b-icon>
              </b-button>
            </template>

            <template v-slot:row-details="row">
              <b-card>
                <AssociatedView :item="row.item" />
              </b-card>
            </template>

            <b-pagination
              align="center"
              v-model="associated.current_page"
              :total-rows="associated.total"
              :per-page="associated.per_page"
              aria-controls="table-associated"
              @input="getAssociated()"
            ></b-pagination>
          </b-table>
        </b-col>
      </b-row>
      <CorrectData :item="this.associated" />
      <SessionOff ref="session" />
      <ErroMessage ref="error" :errors="errors" />
    </b-container>
  </b-overlay>
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
    this.$store.dispatch("associated", { id: 1, token: this.token });
  },

  data() {
    return {
      search: "",
      errors: [],
      perPage: 10,
      membership: [],
      currentPage: 1,
      currentAssociated: [],
      loading: false,
      fields: [
        { key: "nm_name", label: "Nome" },
        { key: "nm_cpf", label: "CPF" },
        { key: "nm_email", label: "Email" },
        { key: "created_at", label: "Filiação" },
        { key: "st_active", label: "Ativo", sortable: true },
        { key: "show_details", label: "" },
        { key: "registration_status", label: "" },
        { key: "correct_data", label: "" },
        { key: "deactivate", label: "" },
        { key: "remove", label: "" }
      ]
    };
  },

  computed: {
    associated: function() {
      if (this.membership.data) {
        return this.membership;
      }
      return this.$store.getters.getAssociated;
    },

    token: function() {
      return this.$session.get("jwt");
    }
  },

  methods: {
    correctData(associated) {
      associated.length > 0 ? (this.currentAssociated = associated) : {};
    },

    getAssociated() {},

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
            this.$store.dispatch("associated", { id: 1, token: this.token });
          }
        })
        .catch(err => {
          this.loading = false;
          window.console.log(err);
        });
    },

    deactivate(id) {
      this.loading = true;
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
          this.loading = false;
          if (res.status === 200) {
            if (res.data.token_failure) {
              this.$refs.session.$refs.session.show();
            }

            if (res.data.result.error) {
              this.$refs.error.$refs["modal-error"].show();
              this.errors = res.data.result;
            } else {
              alert("Ação bem sucedida, associado desativado");
              this.$store.dispatch("associated", { id: 1, token: this.token });
            }
          }
        })
        .catch(err => {
          this.loading = false;
          window.console.log(err);
        });
    },

    remove(id) {
      if (confirm("Deseja remover?")) {
        this.$http
          .delete("associated/" + id, {
            headers: {
              Authorization: "Bearer " + this.token
            }
          })
          .then(res => {
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
          });
      }
    },

    searchMembership() {
       this.loading = true;
      let formData = new FormData();
      formData.append("search", this.search);

      this.$http
        .post("associated/search", formData, {
          headers: {
            Authorization: 'Bearer '+this.token
          }
        })
        .then(res => {
          this.loading = false;
          if (res.status === 200) {
            this.membership = res.data.result.associated;
          }
        })
        .catch(err => {
          window.console.log(err);
          this.loading = false;
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