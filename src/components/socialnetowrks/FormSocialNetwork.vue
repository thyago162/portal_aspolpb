<template>
  <b-modal
    id="form-social-network"
    ref="socialnetwork"
    title="Novo item"
    header-bg-variant="success"
    header-text-variant="light"
    @ok="handleOk"
    ok-title="Salvar"
    ok-only
    @hide="resetErrors"
    size="lg"
  >
    <template v-slot:modal-footer="{ok}">
      <b-button variant="danger" size="md" @click="ok()">
        <span :style="{fontWeight: 'bolder'}">Salvar</span>
        <b-spinner small label="Small Spinner" class="ml-1" v-show="loading"></b-spinner>
      </b-button>
    </template>

    <form @submit.stop.prevent="formSubmited">
      <b-form-group label="Titulo">
        <b-form-input type="text" v-model="form.nm_title" placeholder="Informe o título" />
      </b-form-group>

      <b-form-group label="Link">
        <b-form-input type="text" v-model="form.nm_link" placeholder="http://exemplo.com.br" />
      </b-form-group>

      <b-form-group label="Data">
        <b-form-input type="date" v-model="form.dt_date"></b-form-input>
      </b-form-group>

      <ImageUpload
        :id="item.id_social_network"
        :folder="folder"
        :path="form.nm_image_path"
        size="250x250"
      />

      <span v-if="form.nm_image_path">
        {{form.nm_image_path | fileName }}
        <b-button size="sm" variant="default" @click="deleteImage()">
          <b-icon icon="trash" variant="danger" />
        </b-button>
      </span>
      <b-row>
        <b-col>
          <b-img v-if="form.nm_image_path" :src="form.nm_image_path" width="150" height="150"></b-img>
        </b-col>
      </b-row>
    </form>

    <SessionOff ref="session" />
    <ModalError ref="error" :errors="errors" />
  </b-modal>
</template>

<script>
import ImageUpload from "../image/ImageUpload";
import SessionOff from "../session/Session";
import ModalError from "../error/ModalError";

export default {
  props: ["item"],

  components: {
    ModalError,
    SessionOff,
    ImageUpload
  },

  data() {
    return {
      errors: {},
      loading: false,
      folder: 'public/socialnetwork'
    };
  },

  computed: {
    form: function() {
      return this.item;
    },

    token: function() {
      return this.$session.get("jwt");
    },

    file: function() {
      return this.$store.getters.getImage;
    }
  },

  methods: {
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.formSubmited();
    },

    formSubmited() {
      this.loading = true;
      this.save();
    },

    save() {
      let image = null;
      let cropImage = this.$store.getters.getCropImage;

      if (cropImage) {
        image = cropImage;
      } else {
        image = this.file;
      }

      let form = new FormData();

      form.append("id_social_network", this.form.id_social_network);
      form.append("nm_title", this.form.nm_title);
      form.append("nm_link", this.form.nm_link);
      form.append("nm_image_path", this.form.nm_image_path);
      form.append("dt_date", this.form.dt_date);
      form.append("file", image);

      this.$http
        .post("social-network", form, {
          headers: {
            Authorization: "Bearer " + this.token
          }
        })
        .then(res => {
          if (res.status === 200) {
            this.loading = false;

            if (res.data.token_failure) {
              this.$refs.session.$refs.session.show();
            }

            if (res.data.result.error) {
              this.$refs.error.$refs["modal-error"].show();
              this.errors = res.data.result;
            } else {
              this.$store.dispatch("socialNetwork");
              this.$refs["socialnetwork"].hide();
            }
          }
        });
    },

    deleteImage() {
      let formData = new FormData();

      formData.append("table", "social_newtworks");
      formData.append("update_field", "nm_image_path");
      formData.append("where_field", "id_social_network");
      formData.append("id", this.form.id_social_network);
      formData.append("image_path", this.form.nm_image_path);
      formData.append("folder", this.folder);

      this.$http
        .post("storage/delete", formData, {
          headers: {
            Authorization: "Bearer " + this.token
          }
        })
        .then(res => {
          if (res.status === 200) {
            this.form.nm_image_path = "";
          }
        });
    },

    resetErrors() {
      this.errors = [];
    }
  }
};
</script>