<template>
  <b-container fluid>
    <b-row class="header-title ml-1 mr-1">
      <b-col class="title" >
        <h5 class="mt-2">
           Quem somos
        </h5>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col class="mr-2">
        <b-button
          size="sm"
          variant="primary"
          @click="$router.push({name: 'form-about', params: {id: 'novo'}})"
          style="float: right"
        >
            + Novo item
        </b-button>
      </b-col>
    </b-row>

    <b-row class="ml-1 mr-1">
      <b-col class="mt-3">
        <b-table
          :fields="fields"
          :items="about.data"
          id="about-table"
          :per-page="perPage"
          :current-page="currentPage"
        >
          <template v-slot:cell(edit)="row">
            <b-button @click="$router.push({name: 'form-about', params: {id: row.item.id_about}})" size="sm"  variant="info">
              <b-icon icon="pen"></b-icon>
            </b-button>
          </template>

          <template v-slot:cell(remove)="row">
            <b-button @click="remove(row.item.id_about)" size="sm" variant="danger">
              <b-icon icon="trash"></b-icon>
            </b-button>
          </template>
        </b-table>
        <b-pagination
          v-model="about.current_page"
          :total-rows="about.total"
          :per-page="about.per_page"
          aria-controls="about-table"
          align="center"
          @input="getAbout()"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("about", 1);
  },

  computed: {
    about: function() {
      return this.$store.getters.getAbout;
    },

    rows: function() {
      return this.about ? this.about.length : 0;
    },

    token: function() {
      return this.$store.getters.getToken;
    }
  },

  data() {
    return {
      fields: [
        { key: "nm_name", label: "Nome", sortable: true },
        { key: "nm_office", label: "Cargo" },
        { key: "nm_ddd", label: "DDD" },
        { key: "nm_phone", label: "Telefone" },
        { key: "nm_advice", label: "Departamento" },
        { key: "edit", label: "" },
        { key: "remove", label: "" }
      ],
      item: [],
      errors: [],
      currentPage: 1,
      perPage: 10,
      loading: false
    };
  },

  methods: {
    edit(item) {
      this.item = item;
    },

    remove(id) {
      this.loading = true;

      if (confirm("Deseja realmente exluir?")) {
        this.$http
          .delete("about/" + id, {
            headers: {
              Authorization: "Bearer " + this.token
            }
          })
          .then(res => {
            if (res.status === 200) {
              this.loading = false;

              if (res.data.token_failure) {
                this.countdown = 3;
              }

              this.$store.dispatch("about");
              this.visibility = true;
            }
          });
      }
    },

    resetModal() {
      this.item.nm_name = "";
      this.item.nm_office = "";
      this.item.nm_ddd = "";
      this.item.nm_phone = "";
    },

    getAbout() {
      this.$store.dispatch("about", this.about.current_page);
    }
  }
};
</script>