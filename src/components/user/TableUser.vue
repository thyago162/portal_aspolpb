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
      <b-col lg="6">
        <b-form inline>
          <b-input-group>
            <template v-slot:prepend>
              <b-input-group-text>
                <b-icon icon="search"></b-icon>
              </b-input-group-text>
            </template>
            <b-form-input v-model="search" type="text" />
          </b-input-group>
          <b-button class="ml-1" type="button" variant="primary" @click="searchUser()">Buscar</b-button>
        </b-form>
      </b-col>

      <b-col lg="5">
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
          <template v-slot:cell(created_at)="row">
            <span v-if="row.item.created_at">{{row.item.created_at | fullDate}}</span>
          </template>

          <template v-slot:cell(delete)="row">
            <b-button size="sm" class="mr-2" @click="deleteUser(row.item)" variant="danger">
              <b-icon icon="trash"></b-icon>
            </b-button>
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
  </b-container>
</template>

<script>
import SessionOff from "../session/Session";
import JsonCvs from "vue-json-csv";

export default {
  components: {
    JsonCvs,
    SessionOff
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
        { key: "edit", label: "" },
        { key: "delete", label: "" }
      ],
      search: "",
      countdown: 0
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
          .delete("user/" + id, {
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
                this.errors.push(res.data.result.error);
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