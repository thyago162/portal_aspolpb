<template>
  <b-container fluid>
    <b-row class="header-title ml-1 mr-1">
      <b-col class="title">
        <h5 class="mt-2">
          Convênios
        </h5>
      </b-col>
    </b-row>
    <b-row class="mt-5 ml-1 mr-1">
      <b-col>
        <b-input-group>
          <template v-slot:prepend>
            <b-input-group-text>
              <b-icon icon="search"></b-icon>
            </b-input-group-text>
          </template>
          <b-form-input v-model="search" />
        </b-input-group>
      </b-col>

      <b-col>
        <b-button
          variant="primary"
          v-b-modal.form-agreement
          :style="{float: 'right'}"
          @click="$router.push({name: 'form-agreement', params: {id: 'novo'}})"
        >+ Novo item</b-button>
      </b-col>
    </b-row>

    <b-row class="mt-4 ml-1 mr-1">
      <b-col>
        <b-table :fields="fields" :items="agreement">
          <template v-slot:cell(edit)="row">
            <b-button variant="info" @click="$router.push({name: 'form-agreement', params: {id: row.item.id_agreement}})" >
              <b-icon icon="pencil"></b-icon>
            </b-button>
          </template>

          <template v-slot:cell(remove)="row">
            <b-button variant="danger" @click="removeItem(row.item.id_agreement)">
              <b-icon icon="trash"></b-icon>
            </b-button>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("agreement");
  },

  computed: {
    agreement: function() {
      return this.$store.getters.getAgreement;
    },

    token: function() {
      return this.$session.get("jwt");
    }
  },
  data() {
    return {
      fields: [
        { key: "nm_title", label: "Nome", sortable: true },
        { key: "nm_category", label: "Categoria", sortable: true },
        {key : 'nm_city', label: 'Cidade', sortable:  true},
        { key: "edit", label: "" },
        { key: "remove", label: "" }
      ],
      item: [],
      search: "",
      countdown: 0,
      errors: [],
      visibility: false
    };
  },

  methods: {
    editItem(item) {
      this.item = item;
    },

    removeItem(id) {
      if (confirm("Dejesa realmente remover?")) {
        this.$http
          .delete("agreement/"+ id, {
            headers: {
              Authorization: "Bearer " + this.token
            }
          })
          .then(res => {
            if (res.status === 200) {
              if (res.data.token_failure) {
                this.countdown = 3;
              }

              if (res.data.result.error) {
                this.errors.push(res.data.result.error);
                this.visibility = true;
              }

              this.$store.dispatch("agreement");
            }
          })
          .catch(err => {
            this.errors.push(err);
          });
      }
    },

    resetModal() {
      this.item.nm_title = "";
      this.item.nm_content = "";
      this.item.nm_image_path = "";
      this.item.nm_file_path = "";
      this.item.nm_link = "";
      this.item.nm_social_network_link = "";
      this.item.nm_category = "";
      this.item.nm_city = "";
      this.item.nm_cep = "";
      this.item.nm_street = "";
      this.item.nu_number = "";
      this.item.nm_neighbohood = "";
      this.item.nm_complement = "";
      this.item.nm_uf = "";
    }
  }
};
</script>