<template>
  <b-modal
    id="form-partner"
    ref="formpartner"
    size="lg"
    title="Adicionar parceiro"
    header-bg-variant="danger"
    header-text-variant="light"
    @ok="handleOk"
    ok-only
    @hide="resetModal"
  >
    <template v-slot:modal-footer="{ok}">
      <b-button variant="danger" size="md" @click="ok()">
        <span :style="{fontWeight: 'bolder'}">Salvar</span>
        <b-spinner small label="Small Spinner" class="ml-1" v-show="loading"></b-spinner>
      </b-button>
    </template>

    <b-form @submit.stop.prevent="formSubmited">
      <b-form-group label="Nome do parceiro">
        <b-form-input type="text" v-model="form.nm_title" />
      </b-form-group>

      <b-form-group label="Link do site">
        <b-form-input type="text" v-model="form.nm_link" placeholder="http://www.exemplo.com" />
      </b-form-group>

      <ImageUpload
        :id="form.id_partner"
        folder="public/partner"
        :path="partner.nm_image_path"
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
    </b-form>
    <SessionOff ref="session" />
    <ModalError :errors="errors" ref="error" />
  </b-modal>
</template>

<script>
import ImageUpload from "../image/ImageUpload";
import SessionOff from "../session/Session";
import ModalError from "../error/ModalError";

export default {
  props: ["partner"],

  components: {
    SessionOff,
    ModalError,
    ImageUpload
  },

  data() {
    return {
      visibility: false,
      loading: false,
      errors: {},
    };
  },

  computed: {
    token() {
      return this.$session.get("jwt");
    },

    form: function() {
      return this.partner;
    },

    file: function() {
        return this.$store.getters.getFile
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
            image  = cropImage
        }else {
            image = this.file
        }
      let formData = new FormData();
      formData.append('id_partner', this.form.id_partner);
      formData.append("nm_title", this.form.nm_title);
      formData.append("nm_image_path", this.form.nm_image_path);
      formData.append("nm_link", this.form.nm_link);
      formData.append('file', image);

      this.$http
        .post("partner", formData, {
          headers: {
            Authorization: "Bearer " + this.token,
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          if (res.status === 200) {
            this.loading = false;
            this.visibility = false;

            if (res.data.token_failure) {
              this.$refs.session.$refs.session.show();
            }

            if (res.data.result.error) {
              this.errors = res.data.result;
              this.$refs.error.$refs["modal-error"].show();
            } else {
              this.$refs["formpartner"].hide();
              this.$store.dispatch("partners");
            }
          }
        });
    },

    resetModal() {
      this.visibility = false;
      this.errors = [];
    },

    deleteImage() {
      let formData = new FormData();

      formData.append("table", "partners");
      formData.append("updated_field", "nm_image_path");
      formData.append("where_field", 'id_partner');
      formData.append("id", this.form.id_partner);
      formData.append("image_path", this.form.nm_image_path);
      formData.append("folder", "public/partner");

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
    }
  }
};
</script>

<style scoped>
</style>