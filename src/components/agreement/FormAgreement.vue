<template>
  <b-overlay :show="loading">
    <b-container fluid class="mb-3">
      <b-row class="header-title ml-1 mr-1">
        <b-col class="title">
          <h5 class="mt-2">
            <b-link class="navigation-link" :to="{name: 'table-agreement'}">Convênios</b-link>/
            Formulário
          </h5>
        </b-col>
      </b-row>

      <b-row class="mt-4 ml-1 mr-1">
        <b-col>
          <b-alert
            variant="warning"
            dismissible
            :show="true"
          >Os campos com asteriscos são obrigatórios</b-alert>
          <form @submit.stop.prevent="formSubmited">
            <b-form-group label="Categoria *">
              <b-form-select v-model="form.nm_category" :options="options" :state="state.category"></b-form-select>
            </b-form-group>
            <b-form-group label="Nome *">
              <b-form-input
                type="text"
                v-model="form.nm_title"
                placeholder="Nome da empresa convêniada"
                :state="state.name"
              />
            </b-form-group>

            <b-form-group label="Contrato">
              <b-form-file accept="application/pdf" v-model="doc" :state="Boolean(file)"></b-form-file>
            </b-form-group>

            <b-form-group label="Site">
              <b-form-input v-model="form.nm_link" placeholder="Site da empresa, com http" />
            </b-form-group>

            <b-form-group label="Instagram">
              <b-form-input v-model="instagram" type="text" placeholder="Instagram da empresa" />
            </b-form-group>

            <b-form-group label="Facebook">
              <b-form-input v-model="facebook" type="text" />
            </b-form-group>

            <b-form-group label="Twitter">
              <b-form-input v-model="twitter" type="text" />
            </b-form-group>

            <b-form-group label="Conteúdo *">
              <VueEditor v-model="form.nm_content" />
            </b-form-group>

            <b-row class="mt-4 mb-4 ml-1 mr-1" :style="{backgroundColor: 'gray', color: '#fff'}">
              <b-col>
                <h4 class="mt-2">Endereço</h4>
              </b-col>
            </b-row>

            <b-row class="mt-3">
              <b-col>
                <b-form-group label="Cep">
                  <b-input-group>
                    <b-form-input
                      trim
                      placeholder="Apenas números"
                      v-model="form.nm_cep"
                      type="text"
                    />
                    <b-input-group-append>
                      <b-button variant="default" @click="searchCep">
                        <b-icon icon="search"></b-icon>Buscar
                        <b-spinner small label="Small Spinner" class="ml-1" v-show="loadingAddress"></b-spinner>
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
                <b-form-group label="Rua">
                  <b-form-input v-model="form.nm_street" />
                </b-form-group>

                <b-form-group label="Número">
                  <b-form-input v-model="form.nm_number" />
                </b-form-group>

                <b-form-group label="Complemento">
                  <b-form-input placeholder="Ex: apt 000" v-model="form.nm_complement" />
                </b-form-group>

                <b-form-group label="Bairro">
                  <b-form-input v-model="form.nm_neighbohood" />
                </b-form-group>

                <b-form-group label="Estado *">
                  <b-form-select v-model="form.nm_uf" @input="getCities()" :state="state.uf">
                    <b-form-select-option
                      v-for="(uf, index) in ufs"
                      :key="index"
                      :value="uf.sigla"
                    >{{uf.nome}}</b-form-select-option>
                  </b-form-select>
                </b-form-group>

                <b-form-group label="Cidade *">
                  <b-form-select v-model="form.nm_city" :state="state.city">
                    <b-form-select-option
                      v-for="(city, index) in cities"
                      :key="index"
                      :value="city.nome"
                    >{{city.nome}}</b-form-select-option>
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-row>

            <b-form-group>
              <Image-Upload
                :id="form.id_agreement"
                folder="public/agreement"
                :path="form.nm_image_path"
                size="150x150"
              />
              <span v-if="form.nm_image_path">
                {{form.nm_image_path | fileName }}
                <b-button size="sm" variant="default" @click="deleteImage()">
                  <b-icon icon="trash" variant="danger" />
                </b-button>
              </span>
            </b-form-group>

            <b-img v-if="form.nm_image_path" :src="form.nm_image_path"></b-img>
          </form>
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col class="buttons">
          <b-button variant="success" @click="formSubmited()">
            Salvar
          </b-button>
        </b-col>
      </b-row>
      <SessionOff ref="session" />
      <ModalError ref="error" :errors="errors" />
    </b-container>
  </b-overlay>
</template>

<script>
import SessionOff from "../session/Session";
import { VueEditor } from "vue2-editor";
import ModalError from "../error/ModalError";
import ImageUpload from "../image/ImageUpload";
import { validate } from "../../config";

export default {
  created() {
    this.getAgreement();
    this.getUfs();
  },
  mounted() {
    this.splitSocialNetwork();
    this.hasAddress();
  },

  components: {
    VueEditor,
    SessionOff,
    ModalError,
    ImageUpload
  },

  computed: {
    token: function() {
      return this.$session.get("jwt");
    },

    file: function() {
      return this.$store.getters.getImage;
    }
  },
  data() {
    return {
      ufs: [],
      state: {},
      cities: [],
      form: {
        id_agreement: "",
        nm_title: "",
        nm_content: "",
        nm_image_path: "",
        nm_file_path: "",
        nm_link: "",
        nm_social_network_link: "",
        nm_category: "",
        nm_city: "",
        nm_cep: "",
        nm_street: "",
        nm_number: "",
        nm_neighbohood: "",
        nm_complement: "",
        nm_uf: ""
      },
      loading: false,
      doc: null,
      errors: {},
      instagram: " ",
      facebook: " ",
      twitter: " ",
      socialNetworks: "",

      options: [
        { value: "Alimentação", text: "Alimentação" },
        { value: "Beleza", text: "Beleza" },
        { value: "Educação", text: "Educação" },
        { value: "Lazer", text: "Lazer" },
        { value: "Saúde", text: "Saúde" },
        { value: "Serviços", text: "Serviços" },
        { value: "Transporte", text: "Transporte" },
        { value: "Vestuário", text: "Vestuário" },
        { value: "Outros", text: "Outros" }
      ],
      loadingAddress: false
    };
  },

  methods: {
    splitSocialNetwork() {
      if (this.form.nm_social_network_link) {
        this.socialNetworks = this.form.nm_social_network_link.split(",");
        this.instagram = this.socialNetworks[1];
        this.facebook = this.socialNetworks[0];
        this.twitter = this.socialNetworks[2];
      }
    },

    handleOk(bvEvtModal) {
      bvEvtModal.preventDefault();
      this.joinSocialNetworkLinks();
      this.formSubmited();
    },

    formSubmited() {
      this.loading = true;
      this.save();
    },

    save() {
      let form = this.fillForm();

      this.$http
        .post("agreement", form, {
          headers: {
            Authorization: "Bearer " + this.token,
            "Content-type": "Multipart/form"
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
              this.$store.dispatch("agreement");
              this.$store.dispatch("images", null);
              this.$router.push({ name: "table-agreement" });
            }
          }
        });
    },

    fillForm() {
      let image = null;
      this.requiredForms();
      let crop = this.$store.getters.getCropImage;

      if (crop) {
        image = crop;
      } else {
        image = this.file;
      }

      let formData = new FormData();
      formData.append("id_agreement", this.form.id_agreement);
      formData.append("nm_title", this.form.nm_title);
      formData.append("nm_content", this.form.nm_content);
      formData.append("nm_image_path", this.form.nm_image_path);
      formData.append("nm_file_path", this.form.nm_file_path);
      formData.append("nm_link", this.form.nm_link);
      formData.append(
        "nm_social_network_link",
        this.form.nm_social_network_link
      );
      formData.append("nm_category", this.form.nm_category);
      formData.append("nm_city", this.form.nm_city);
      formData.append("nm_cep", this.form.nm_cep);
      formData.append("nm_street", this.form.nm_street);
      formData.append("nm_number", this.form.nm_number);
      formData.append("nm_neighbohood", this.form.nm_neighbohood);
      formData.append("nm_complement", this.form.nm_complement);
      formData.append("nm_uf", this.form.nm_uf);
      formData.append("file", image);
      formData.append("doc", this.doc);

      return formData;
    },

    joinSocialNetworkLinks() {
      this.form.nm_social_network_link =
        this.instagram + "," + this.facebook + "," + this.twitter;
    },

    searchCep() {
      this.loading = true;
      this.loadingAddress = true;
      let cep = this.form.nm_cep;

      this.$http("http://viacep.com.br/ws/" + cep + "/json/")
      .then(res => {
        this.loading = false;
        if (res.status === 200) {
          let result = res.data;
          this.form.nm_street = result.logradouro;
          this.form.nm_complement = result.complemento;
          this.form.nm_neighbohood = result.bairro;
          this.form.nm_city = result.localidade;
          this.form.nm_uf = result.uf;

          this.loadingAddress = false;
        }
      });
    },
    next() {
      if (this.formControl <= 4) {
        parseInt((this.formControl += 1));
      }
    },

    preview() {
      if (this.formControl > 1) {
        parseInt((this.formControl -= 1));
      }
    },

    deleteImage() {
      this.loading = true;
      let formData = new FormData();

      formData.append("table", "agreements");
      formData.append("update_field", "nm_image_path");
      formData.append("where_field", "id_agreement");
      formData.append("id", this.form.id_agreement);
      formData.append("image_path", this.form.nm_image_path);
      formData.append("folder", "public/agreement");

      this.$http
        .post("storage/delete", formData, {
          headers: {
            Authorization: "Bearer " + this.token
          }
        })
        .then(res => {
          this.loading = false;
          if (res.status === 200) {
            this.form.nm_image_path = "";
            this.$store.dispatch("images", null);
          }
        });
    },

    hasAddress() {
      this.form.nm_cep != null ? (this.address = 1) : (this.address = 0);
    },

    getAgreement() {
      
      let id = this.$route.params.id;

      if (Number.isInteger(id)) {
        this.$http
          .get("agreement/show/" + id, {
            headers: {
              Authorization: "Bearer " + this.token
            }
          })
          .then(res => {
            if (res.status === 200) {
              this.form = res.data.result.agreement;
            }
          })
          .catch(err => {
            window.console.log(err);
          });
      }
    },

    getUfs() {
      this.$http(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      ).then(res => {
        if (res.status === 200) {
          this.ufs = res.data;
        }
      });
    },

    getCities() {
      this.$http(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" +
          this.form.nm_uf +
          "/municipios"
      ).then(res => {
        if (res.status === 200) {
          this.cities = res.data;
        }
      });
    },

    requiredForms() {
      this.state.category = validate(this.form.nm_category);
      this.state.name = validate(this.form.nm_name);
      this.state.uf = validate(this.form.nm_uf);
      this.state.city = validate(this.form.nm_city);
    }
  }
};
</script>