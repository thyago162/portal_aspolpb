<template>
  <b-modal
    title="Nova noticia"
    header-text-variant="light"
    ref="formnews"
    id="form-news"
    size="xl"
    header-bg-variant="primary"
    ok-only
    ok-title="Salvar"
    no-close-on-backdrop
  >
    <template v-slot:modal-footer>
      <b-button @click="closeModal" variant="danger">Fechar</b-button>

      <b-button variant="primary" size="md" @click="save">
        <span :style="{fontWeight: 'bolder'}">Salvar</span>
        <b-spinner class="ml-1" label="Spinning" small v-show="loading"></b-spinner>
      </b-button>

      <div v-if="form.id_news">
        <b-button variant="secondary" size="md" @click="disableOrEnable(0)" v-show="isPublishing">
          <span :style="{fontWeight: 'bolder'}">Desativar</span>
          <b-spinner class="ml-1" label="Spinning" small v-show="loading"></b-spinner>
        </b-button>

        <b-button
          variant="outline-primary"
          size="md"
          @click="disableOrEnable(1)"
          v-show="!isPublishing"
        >
          <span :style="{fontWeight: 'bolder'}">Publicar</span>
          <b-spinner class="ml-1" label="Spinning" small v-show="loading"></b-spinner>
        </b-button>
      </div>

      <div>
        <b-button
          variant="info"
          @click="preview = !preview"
        >{{preview ? 'Fechar pre-visualização': 'Exibir pré-visualização'}}</b-button>
      </div>

      <b-button @click="handleOk" variant="success" size="md">
        <span :style="{fontWeight: 'bolder'}">Salvar e Publicar</span>
        <b-spinner class="ml-1" label="Spinning" small v-show="loading"></b-spinner>
      </b-button>
    </template>

    <form @submit.stop.prevent="formSubmited" enctype="multipart/form-data">
      <b-container fluid>
        <b-row class="mt-2">
          <b-col v-show="!preview">
            <b-row>
              <b-col>
                <b-form-group label="Título">
                  <b-form-input type="text" v-model="form.nm_title" required name="nm_title"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <b-form-group label="Subtítulo">
                  <b-form-input type="text" v-model="form.nm_subtitle" />
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col lg="3" md="2">
                <b-form-group label="Data">
                  <b-form-input type="date" v-model="form.dt_date" name="dt_date" required />
                </b-form-group>
              </b-col>

              <b-col lg="3">
                <b-form-group label="Destacar" class="ml-4">
                  <b-form-radio-group v-model="form.st_highlights" required>
                    <b-form-radio :value="0" default name="no-highlights">Não</b-form-radio>
                    <b-form-radio :value="1" name="yes-highlights">Sim</b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col>
                <b-form-group label="Conteúdo">
                  <vue-editor id="editor" v-model="form.nm_content"></vue-editor>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col lg="9">
                <ImageUpload :id="form.id_news" folder :path="item.nm_image_path" size="800x600" />
              </b-col>
            </b-row>
            <b-row>
                <b-col>
                     <span v-if="form.nm_image_path">
                        {{form.nm_image_path | fileName }}
                        <b-button size="sm" variant="default" @click="deleteImage()">
                            <b-icon icon="trash" variant="danger" />
                        </b-button>
                    </span> 
               </b-col>
            </b-row>
             <b-row>
                <b-col>
                  <b-img
                    v-if="form.nm_image_path"
                    :src="form.nm_image_path"
                    width="150"
                    height="150"
                    class="mt-3"
                  ></b-img>
                </b-col>
              </b-row>
          </b-col>
          <transition name="fade">
            <b-col v-show="preview">
              <PreviewNews
                :title="form.nm_title"
                :subtitle="form.nm_subtitle"
                :date="form.dt_date"
                :content="form.nm_content"
                :image="file"
                :path="form.nm_image_path"
              />
            </b-col>
          </transition>
        </b-row>
      </b-container>
    </form>

    <SessionOff ref="session" />
    <ModalError :errors="errors" ref="error" />
  </b-modal>
</template>

<script>
import ModalError from "../error/ModalError";
import { VueEditor } from "vue2-editor";
import PreviewNews from "./PreviewNews";
import SessionOff from "../session/Session";
import ImageUpload from "../image/ImageUpload";

export default {
  props: ["item"],

  components: {
    VueEditor,
    PreviewNews,
    SessionOff,
    ModalError,
    ImageUpload
  },

  mounted() {
    this.item.st_active == 1
      ? (this.isPublishing = true)
      : (this.isPublishing = false);
  },

  computed: {
    token: function() {
      return this.$session.get("jwt");
    },

    form: function() {
      return this.item;
    },

    file: function() {
      return this.$store.getters.getImage;
    }
  },

  data() {
    return {
      loading: false,
      hasImage: false,
      preview: false,
      isPublishing: null,
      errors: {}
    };
  },

  methods: {
    handleOk: function(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.form.st_active = 1;
      this.formSubmited();
    },

    formSubmited() {
      this.loading = true;
      this.saveNews();
    },

    saveNews() {
      let image = null;
      let formData = new FormData();
      let cropImage = this.$store.getters.getCropImage;

      if (cropImage) {
        image  = cropImage
      }else {
        image = this.file
      }

      if (this.form.nm_image_path == undefined) {
        this.form.nm_image_path = "";
      }

      formData.append("id_news", this.form.id_news);
      formData.append("nm_title", this.form.nm_title);
      formData.append("nm_subtitle", this.form.nm_subtitle);
      formData.append("nm_content", this.form.nm_content);
      formData.append("dt_date", this.form.dt_date);
      formData.append("st_highlights", this.form.st_highlights);
      formData.append("nm_image_path", this.form.nm_image_path);
      formData.append("st_active", this.form.st_active);
      formData.append("file", image),

      this.$http
        .post("news", formData, {
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
              this.errors = res.data.result;
              this.$refs.error.$refs["modal-error"].show();
            } else {
              this.updateNews(res.data.result.news);
              this.$store.dispatch("news", 1);

              if (this.form.st_active === 1) {
                this.$refs["formnews"].hide();
              }
              this.errors = {};
            }
          }
        });
    },

    setImage(e) {
      const file = e.target.files[0];

      if (file.type.indexOf("image/") === -1) {
        alert("Por favor selecione uma imagem.");
        return;
      }

      if (typeof FileReader === "function") {
        const reader = new FileReader();

        reader.onload = event => {
          this.imgSrc = event.target.result;

          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };

        reader.readAsDataURL(file);
      } else {
        alert("Desculpe, formato não suportado!");
      }
    },

    cropImage() {
      let vm = this;
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.$refs.cropper.getCroppedCanvas().toBlob(function(blob) {
        vm.file = new File([blob], "arquivo");
      }, "image/jpeg");
    },

    reset() {
      this.$refs.cropper.reset();
    },

    removeSelectedImage() {
      this.file = null;
      this.cropImg = "";

      if (this.form.nm_image_path) {
        this.deleteImage();
      }
    },

    deleteImage() {
      let formData = new FormData();

      formData.append("table", "news");
      formData.append("update_field", "nm_image_path");
      formData.append('where_field','id_news');
      formData.append("id", this.form.id_news);
      formData.append("image_path", this.form.nm_image_path);
      formData.append("folder", "public/news");

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

    pre() {
      this.preview = !this.preview;
    },

    closeModal() {
      this.$refs["formnews"].hide();
    },

    disableOrEnable(param) {
      this.visibility = false;
      param === 1 ? (this.isPublishing = true) : (this.isPublishing = false);
      this.loading = true;

      this.$http
        .put(
          "news/disable-news/" + this.form.id_news,
          {
            st_active: param
          },
          {
            headers: {
              Authorization: "Bearer " + this.token
            }
          }
        )
        .then(res => {
          if (res.status === 200) {
            this.loading = false;

            if (res.data.token_failure) {
              this.$refs.session.$refs.session.show();
            }

            if (res.data.result.error) {
              this.errors = res.data.result;
              this.$refs.error.$refs["modal-error"].show();
            } else {
              this.$forceUpdate();
              this.$store.dispatch("news");
            }
          }
        });
    },

    save() {
      this.form.st_active = 0;
      this.loading = true;
      this.saveNews();
    },

    updateNews(param) {
      this.$emit("updateNews", param);
    }
  }
};
</script>

<style scoped>
.editor {
  height: 200px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.btn-footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>