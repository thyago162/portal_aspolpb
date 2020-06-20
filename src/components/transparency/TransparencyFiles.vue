<template>
  <div class="mt-3" v-if="files.length > 0">
    <b-table :items="files" :fields="fields" hover striped>
      <template v-slot:cell(download)="row">
        <a :href="row.item.nm_file_path">
          <b-icon icon="arrow-bar-down"></b-icon>
        </a>
      </template>
      <template v-slot:cell(dt_date)="row">
        <span>{{row.item.dt_date | date}}</span>
      </template>

      <template v-slot:cell(delete)="row" v-if="token != null && user.administrator === 1">
        <b-button size="sm" variant="danger" @click="deleteFile(row.item.id_transparency_file)">
          <b-icon icon="trash"></b-icon>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: ["files"],

  data() {
    return {
      fields: [
        { key: "nm_name", label: "Nome do arquivo" },
        { key: "dt_date", label: "Data", sortable: true },
        { key: "download", label: "" },
        { key: "delete", label: "" }
      ]
    };
  },

  computed: {
    token: function() {
      return this.$session.get("jwt");
    },

    user: function() {
      return this.$session.get("user");
    }
  },

  methods: {
    deleteFile(id) {
      if (confirm("Deseja remover?")) {
        this.$http
          .delete("transparency-file/" + id, {
            headers: {
              Authorization: "Bearer " + this.token
            }
          })
          .then(res => {
            if (res.status === 200) {
              this.$router.push({ name: "transparencia" });
            }
          });
      }
    }
  }
};
</script>