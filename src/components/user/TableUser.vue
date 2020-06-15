<template>
  <b-container fluid>
    <b-row class="header-title">
      <b-col class="title" lg="11">
        <h5 class="mt-2">
          <b-link class="navigation-link" :to="{name: 'table-user'}">Usuários</b-link>/ Painel
        </h5>
      </b-col>
    </b-row>

    <b-row class="mt-5 ml-5 mr-5">
      <b-col lg="8">
        <b-input-group>
          <template v-slot:prepend>
            <b-input-group-text>
              <b-icon icon="search"></b-icon>
            </b-input-group-text>
          </template>
          <b-form-input v-model="search" />
        </b-input-group>
      </b-col>
      <b-col lg="1">
        <JsonCvs :data="users">
          <font-awesome-icon icon="file-csv" size="2x" class="icon alt" :style="{float: 'right'}" />
        </JsonCvs>
      </b-col>
    </b-row>

    <b-row class="ml-5 mr-5 mt-4">
      <b-col>
        <b-table
          :fields="fields"
          :items="users"
          striped
          hover
          :per-page="perPage"
          :current-page="currentPage"
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
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
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
    this.$store.dispatch("users", this.token);
  },

  data() {
    return {
      perPage: 5,
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
    rows: function() {
      return this.user ? this.user.lenght : 0;
    },

    token: function() {
      return this.$session.get("jwt");
    },

    users: function() {
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
                this.$store.dispatch("users");
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