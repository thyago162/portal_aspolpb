<template>
  <b-overlay :show="loading">
    <b-container fluid class="mb-3">
      <b-row class="header-title ml-1 mr-1">
        <b-col class="title">
          <h5 class="mt-2">Midias Sociais</h5>
        </b-col>
      </b-row>
      <b-row class="mt-3 ml-1 mr-1">
        <b-col>
          <b-button
            variant="primary"
            @click="$router.push({name: 'form-media', params: {id: 'novo'}})"
            :style="{float: 'right'}"
          >Novo Item</b-button>
        </b-col>
      </b-row>

      <b-row class="mt-3 ml-1 mr-1">
        <b-col>
          <b-table
            :fields="fields"
            :items="medias.data"
            striped
            hover
            :per-page="perPage"
            :current-page="currentPage"
            id="table-media"
          >
            <template v-slot:cell(edit)="row">
              <b-button
                size="sm"
                @click="$router.push({name: 'form-media', params: {id: row.item.id_media}})"
                variant="info"
                v-b-modal.form-news
                class="ml-1"
              >
                <b-icon icon="pen"></b-icon>
              </b-button>
            </template>

            <template v-slot:cell(delete)="row">
              <b-button size="sm" @click="deleteMedia(row.item.id_media)" variant="danger">
                <b-icon icon="trash"></b-icon>
              </b-button>
            </template>

            <template v-slot:cell(dt_date)="row">
              <span>{{row.item.dt_date | date}}</span>
            </template>

            <template v-slot:cell(type)="row">
              <span>{{nuType[row.item.nu_type -1]}}</span>
            </template>
          </b-table>

          <b-pagination
            align="center"
            v-model="medias.current_page"
            :total-rows="medias.total"
            :per-page="medias.per_page"
            aria-controls="table-media"
            @input="getMedia()"
          ></b-pagination>
        </b-col>
      </b-row>
      <SessionOff ref="session" />
      <ModalError ref="error" :errors="errors" />
    </b-container>
  </b-overlay>
</template>

<script>
import ModalError from "../error/ModalError";
import SessionOff from "../session/Session";
export default {
  created() {
    this.$store.dispatch("media");
  },

  components: {
    ModalError,
    SessionOff
  },

  computed: {
    medias: function() {
      return this.$store.getters.getMedia;
    },

    token: function() {
      return this.$session.get("jwt");
    }
  },

  data() {
    return {
      perPage: 10,
      loading: false,
      errors: {},
      currentPage: 1,
      nuType: ["Noticias", "Vídeos", "Audíos", "Redes Sociais"],
      fields: [
        { key: "nm_title", label: "Título", sortable: true },
        { key: "dt_date", label: "Data de publicação", sortable: true },
        { key: "type", label: "Categoria", sortable: true },
        { key: "edit", label: "" },
        { key: "delete", label: "" }
      ]
    };
  },

  methods: {
    getMedia() {
      this.$store.dispatch("media", this.medias.current_page);
    },

    deleteMedia(id) {
      if (confirm("Deseja realmente exluir?")) {
        this.loading = true;
        this.$http
          .delete("media/" + id, {
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

              if (res.data.result.error) {
                this.$refs.error.$refs["modal-error"].show();
                this.errors = res.data.result;
              } else {
                this.$store.dispatch("media");
                this.$router.push({ name: "table-media" });
              }
            }
          });
      }
    }
  }
};
</script>