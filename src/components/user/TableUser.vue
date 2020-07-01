<template>
  <b-container fluid>
    <b-row class="header-title ml-1 mr-1">
      <b-col class="title">
        <h5 class="mt-2">
          <b-link class="navigation-link" :to="{name: 'table-user'}">Usuários</b-link>/ Painel
        </h5>
      </b-col>
    </b-row>

    <b-row class="mt-4 ml-1 mr-1">
      <b-col cols="11">
        <b-form inline>
          <b-input-group>
            <template v-slot:prepend>
              <b-input-group-text>
                <b-icon icon="search"></b-icon>
              </b-input-group-text>
            </template>
            <b-form-input v-model.lazy="search" type="text" />
          </b-input-group>
          <b-button class="ml-1" type="button" variant="primary" @click="searchUser()">Buscar</b-button>
        </b-form>
      </b-col>

      <b-col cols="1">
        <JsonCvs :data="users.data" :style="{float: 'right'}">
          <font-awesome-icon icon="file-csv" size="2x" class="icon alt" :style="{float: 'right'}" />
        </JsonCvs>
      </b-col>
    </b-row>

    <b-row class="mr-1 ml-1 mt-4">
      <b-col>
        <b-table
          :fields="fields"
          :items="users.data"
          striped
          hover
          :per-page="perPage"
          :current-page="currentPage"
          id="table-users"
        >
          <template v-slot:cell(show_details)="row">
            <b-button variant="info" size="sm" @click="row.toggleDetails">Permissão</b-button>
          </template>

          <template v-slot:row-details="row">
            <b-form inline>
              <span>Administrador</span>
              <b-form-radio-group v-model="selected" :options="options" class="ml-2"></b-form-radio-group>
              <b-button
                variant="success"
                size="sm"
                @click="changePermission(row.item.id_user)"
              >Alterar</b-button>
            </b-form>
          </template>

          <template v-slot:cell(created_at)="row">
            <span v-if="row.item.created_at">{{row.item.created_at | fullDate}}</span>
          </template>

          <template v-slot:cell(delete)="row">
            <b-button size="sm" class="mr-2" @click="deleteUser(row.item)" variant="danger">
              <b-icon icon="trash"></b-icon>
            </b-button>
          </template>

          <template v-slot:cell(administrator)="row">
            <b-icon v-if="row.item.administrator === 1" icon="check-square-fill" class="h5"></b-icon>
            <b-icon v-else icon="check-square" class="h5"></b-icon>
          </template>
        </b-table>
        <div class="overflow-auto">
          <b-pagination
            align="center"
            v-model="users.current_page"
            :total-rows="users.total"
            :per-page="users.per_page"
            aria-controls="table-users"
            @input="getUser()"
          ></b-pagination>
        </div>
      </b-col>
    </b-row>
    <SessionOff ref="session" />
    <ErroMessage ref="error" :errors="errors" />
  </b-container>
</template>

<script>
import SessionOff from "../session/Session";
import ErroMessage from "../error/ModalError";
import JsonCvs from "vue-json-csv";

export default {
  components: {
    JsonCvs,
    SessionOff,
    ErroMessage
  },

  created() {
    this.$store.dispatch("users", { token: this.token, page: 1 });
  },

  data() {
    return {
      perPage: 10,
      userSearch: [],
      currentPage: 1,
      fields: [
        { key: "name", label: "Nome", sortable: true },
        { key: "email", label: "Email" },
        { key: "created_at", label: "Data de registro" },
        { key: "administrator", label: "Administrador", sortable: true },
        { key: "show_details", label: "" },
        { key: "delete", label: "" }
      ],
      search: "",
      countdown: 0,
      selected: "",
      options: [
        { text: "Sim", value: 1 },
        { text: "Não", value: 0 }
      ],
      errors: []
    };
  },

  computed: {
    token: function() {
      return this.$session.get("jwt");
    },

    users: function() {
      if (this.userSearch.data) {
        return this.userSearch;
      }

      return this.$store.getters.getUsers;
    }
  },

  methods: {
    deleteUser(id) {
      if (confirm("Deseja realmente excluir?")) {
        this.$http
          .delete("users/" + id, {
            headers: {
              Authorization: "Bearer " + this.token
            }
          })
          .then(res => {
            if (res.status === 200) {
              if (res.data.token_failure) {
                this.$refs.session.$refs.session.show();
              }

              if (res.data.result.error) {
                this.errors = res.data.result;
                this.visibility = true;
              } else {
                this.$store.dispatch("users", { token: this.token, page: 1 });
              }
            }
          });
      }
    },

    getUser() {
      this.$store.dispatch("users", {
        token: this.token,
        page: this.users.current_page
      });
    },

    searchUser() {
      let formData = new FormData();
      formData.append("search", this.search);

      this.$http
        .post("user/search", formData)
        .then(res => {
          if (res.status === 200) {
            this.userSearch = res.data.result.users;
          }
        })
        .catch(err => {
          window.console.log(err);
        });
    },

    changePermission(id) {
      if (confirm("Deseja prosseguir?")) {
        this.$http
          .put(
            "users/permission/" + id,
            {
              administrator: this.selected
            },
            {
              headers: {
                Authorization: "bearer " + this.token
              }
            }
          )
          .then(res => {
            if (res.status === 200) {
              if (res.data.token_failure) {
                this.$refs.session.$refs.session.show();
              }

              if (res.data.result.error) {
                this.errors = res.data.result;
                this.visibility = true;
              } else {
                this.$store.dispatch("users", { token: this.token, page: 1 });
              }
            }
          });
      }
    }

  }
};
</script>

<style scoped>
.user-search {
  width: 80%;
  text-indent: 12px;
}

.search-icon {
  position: absolute;
  margin-top: -33px;
  margin-left: 2px;
}
</style>