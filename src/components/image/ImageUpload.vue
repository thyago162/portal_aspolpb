<template>
  <b-container fluid>
    <b-row>
      <b-col >
        <b-form-group label="Imagem" class="mt-1">
          <b-form-file
            name="nm_image_path"
            accept="image/*"
            @change="setImage"
            v-model="file"
            :state="Boolean(file)"
            placeholder="Clique ou arraste uma imagem..."
            :outputSize="0.7"
            outputType='png'
            id="file"
          />
          <span :style="{fontSize: '10px'}">Tamanho recomendado: {{size}}</span>
        </b-form-group>

        <div class="ml-2">
          <b-button-group size="sm">
            <b-button variant="info" @click.prevent="zoom(0.2)">+ Zoom</b-button>
            <b-button variant="info" @click.prevent="zoom(-0.2)">- Zoom</b-button>
            <b-button variant="info" @click.prevent="getData">Dimensão da imagem</b-button>
            <b-button variant="info" @click.prevent="getCropBoxData">Dimensões selecionada</b-button>
            <b-button variant="info" @click.prevent="reset">Resetar</b-button>
            <b-button variant="success" @click.prevent="cropImage">Selecionar</b-button>
          </b-button-group>
        </div>
      </b-col>
    </b-row>

    <b-row v-if="file" class="mt-3">
      <span>
        {{file.name}}
        <b-button size="sm" variant="default" @click="resetFields()">
          <b-icon icon="trash" variant="danger" />
        </b-button>
      </span>
    </b-row>

    <b-row class="mt-3" v-if="data != null" :style="{backgroundColor: '#cccccc'}">
      <b-col>
        <h5 class="mt-2">Dimensões</h5>
        <b-form-group label="Comprimento">
          <input type="text" v-model="data.width" />
        </b-form-group>
        <b-form-group label="Altura">
          <input type="text" v-model="data.height" />
        </b-form-group>
      </b-col>
      <b-col>
        <h6 class="mt-4">Alterar tamanho da área selecionada</h6>
        <b-button variant="info" @click.prevent="setCropBoxData">Alterar</b-button>
      </b-col>
    </b-row>

    <b-row class="mt-3" v-if="file">
      <b-img v-if="path" :src="path"></b-img>

      <b-col lg="6">
        <h5>Prévia</h5>
        <vue-cropper class="mt-2" ref="cropper" :src="path" alt="Imagem" preview=".preview"></vue-cropper>
      </b-col>
      <b-col>
        <h5>Área selecionada</h5>
        <b-img v-if="cropImg" :src="cropImg" alt="Imagem Recortada" fluid></b-img>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import VueCropper from "vue-cropperjs";
export default {
  props: ["path", "folder", "id", "size"],

  components: {
    VueCropper
  },

  data() {
    return {
      file: null,
      imgSrc: "",
      cropImg: "",
      data: null
    };
  },

  computed: {
    token: function() {
      return this.$store.getters.getToken;
    }
  },

  methods: {
    cropImage() {
      let vm = this;
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      this.$refs.cropper.getCroppedCanvas().toBlob(function(blob) {
        vm.file = new File([blob], "arquivo");
        vm.$store.dispatch("cropImage", vm.file);
      }, "image/jpeg");
    },
    getCropBoxData() {
      this.data = this.$refs.cropper.getCropBoxData();
    },

    getData() {
      this.data = this.$refs.cropper.getData();
    },

    move(offsetX, offsetY) {
      this.$refs.cropper.move(offsetX, offsetY);
    },
    zoom(percent) {
      this.$refs.cropper.relativeZoom(percent);
    },
    reset() {
      this.$refs.cropper.reset();
    },

    setCropBoxData() {
      if (!this.data) {
        return;
      }
      let data = JSON.stringify(this.data);
      window.console.log(data);

      this.$refs.cropper.setCropBoxData(JSON.parse(data));
    },

    setImage(e) {
      this.$store.dispatch("images", '');
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
        this.$store.dispatch("images", file);
      } else {
        alert("Desculpe, formato não suportado!");
      }
    },

    resetFields() {
      this.file = null;
      this.data = null;
      this.cropImg = "";
      this.imgSrc = "";
      this.$store.dispatch("images", null);
    }
  }
};
</script>

<style scoped>
  .col {
    padding-left: 0px;
    padding-right: 0px;
  }
</style>