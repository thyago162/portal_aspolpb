<template>
<b-overlay :show="loading">
  <b-container fluid>
    <b-row class="header-title ml-1 mr-1">
      <b-col class="title" >
        <h5 class="mt-2">
          <b-link class="navigation-link" :to="{name: 'table-news'}">Arquivos</b-link>/ Painel
        </h5>
      </b-col>
    </b-row>

    <b-row class="mt-5 ml-1 mr-1">
      <b-col>
        <b-button
          v-b-modal.form-file
          variant="primary"
          :style="{float: 'right'}"
          @click="$router.push({name: 'form-file', params: {id: 'novo'}})"
        >
          <b-icon icon="plus"></b-icon>novo item
        </b-button>
      </b-col>
    </b-row>

    <b-row class="mt-3 ml-1 mr-1">
      <b-col>
        <b-table
          striped
          hover
          :fields="fields"
          :items="file"
          :per-page="perPage"
          :current-page="currentPage"
          class="file-table"
        >
          <template v-slot:cell(created_at)="row">
            <span>{{row.item.created_at | fullDate}}</span>
          </template>

          <template v-slot:cell(updated_at)="row">
            <span>{{row.item.updated_at | fullDate}}</span>
          </template>

          <template v-slot:cell(edit)="row">
            <b-button
              size="sm"
              class="ml-1"
              @click="$router.push({name: 'form-file', params: {id: row.item.id_file}})"
              variant="info"
              v-b-modal.form-file
            >
              <b-icon icon="pen"></b-icon>
            </b-button>
          </template>

          <template v-slot:cell(delete)="row">
            <b-button size="sm" @click="deletefiles(row.item)" variant="danger">
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
  </b-overlay>
</template>

<script>
import SessionOff from "../session/Session";

export default {
  components: {
    SessionOff
  },

  mounted() {
    this.$store.dispatch("file", this.$store.getters.getToken);
  },

  data() {
    return {
      fields: [
        { key: "nm_name", label: "Nome" },
        { key: "created_at", label: "Data de criação" },
        { key: "updated_at", label: "Última atualização" },
        { key: "edit", label: "" },
        { key: "delete", label: "" }
      ],
      perPage: 5,
      currentPage: 1,
      search: "",
      countdown: 0,
      item: [],
      loading: false
    };
  },

  computed: {
    file() {
      if (this.search.length > 0) {
        return this.searchItems(this.$store.getters.getfile);
      } else {
        return this.$store.getters.getFile;
      }
    },

    rows() {
      return this.$store.getters.getfile;
    },

    token: function() {
      return this.$store.getters.getToken;
    }
  },

  methods: {

    deletefiles(item) {
      if (confirm("Deseja realmente excluir?")) {
        this.loading = true;
        this.$http
          .delete("file/" + item.id_file, {
            headers: {
              Authorization: "Bearer " + this.token
            }
          })
          .then(res => {
            this.loading = false;
            if (res.status === 200) {
              if (res.data.token_failure) {
                this.$refs.session.$refs.session.show();
              }

              this.$store.dispatch("file", this.token);
            }
          })
          .catch(err => {
            this.errors.push(err);
          });
      }
    },

    searchItems(arraySearch) {
      let result = new Array();

      for (var i = 0; i < arraySearch.length; i++) {
        if (!arraySearch[i].nm_title.search(this.search)) {
          result.push(arraySearch[i]);
        }
      }

      return result;
    },

    resetModal() {
      this.item.nm_name = "";
    }
  }
};
</script>

<style scoped>
.file-table {
  margin-top: 20px;
}

.file-search {
  width: 80%;
  text-indent: 12px;
}

.search-icon {
  position: absolute;
  margin-top: -33px;
  margin-left: 2px;
}
</style>