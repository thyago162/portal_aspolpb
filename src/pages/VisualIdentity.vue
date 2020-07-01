<template>
  <b-container fluid class="mb-3">
    <b-row class="header-title ml-1 mr-1">
      <b-col class="title">
        <h5>IDENTIDADE VISUAL</h5>
      </b-col>
    </b-row>

    <b-row class="mt-3 ml-1 mr-1">
      <b-col>
        <b-button
          class="mt-2 float-right"
          variant="primary"
          v-b-modal.visual-identity-form
          v-if="administrator === 1 && token"
        >+ Novo item</b-button>
      </b-col>
    </b-row>

    <b-row>
      <b-col  class="ml-5">
        <div class="block-size-image" v-for="(value,index) in visualIdentity" :key="index">
          <b-card class="mt-3">
            <b-card-body>
              <b-row>
                <b-col cols="8" :style="{borderRight: '1px solid #000'}">
                  <h6>{{value.nm_name}}.{{value.nm_image_path.split('.').pop()}}</h6>
                </b-col>
                <b-col >
                  <a :href="value.nm_image_path" target="_blank">
                    <b-icon icon="download"></b-icon>
                  </a>
                  <b-button
                    size="sm"
                    variant="default"
                    @click="remove(value.id_visual_identity)"
                    v-if="administrator === 1"
                  >
                    <b-icon class="ml-2" variant="danger" icon="trash"></b-icon>
                  </b-button>
                </b-col>
              </b-row>
            </b-card-body>
          </b-card>
        </div>
      </b-col>
    </b-row>
    <VisualIdentityForm />
    <ErroMessage ref="error" :errors="errors" />
    <Session ref="session" />
  </b-container>
</template>

<script>
import ErroMessage from "../components/error/ModalError";
import VisualIdentityForm from "../components/institucional/visual-identity/VisualIdentityForm";
import Session from "../components/session/Session";

export default {
  components: {
    VisualIdentityForm,
    ErroMessage,
    Session
  },

  data() {
    return {
      errors: []
    }
  },

  created() {
    this.$store.dispatch("visualIdentity");
  },

  computed: {
    token: function() {
      return this.$store.getters.getToken;
    },

    administrator: function() {
      let user = this.$session.get("user");
      return user ? user.administrator : 0;
    },

    visualIdentity: function() {
      return this.$store.getters.getVisualIdentity;
    }
  },
  methods: {
    remove(id) {
      if (confirm("Deseja remover?")) {
        this.$http
          .delete("visual-identity/" + id, {
            headers: {
              authorization: "Bearer " + this.token
            }
          })
          .then(res => {
            if (res.status === 200) {
              if (res.data.token_failure) {
                this.$refs.session.$refs.session.show();
              }

              if (res.data.result.error) {
                this.$refs.error.$refs["modal-error"].show();
                this.errors = res.data.result;
              } else {
                this.$store.dispatch("visualIdentity");
              }
            }
          });
      }
    }
  }
};
</script>

<style scoped>
h5 {
  margin-top: 10px;
}

.block-size {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.card {
  width: 350px;
  display: flex;
  justify-content: center;
}

.file-name {
  border-right: 1px solid gray;
}

.file-name h6 {
  text-indent: 10px;
}
</style>