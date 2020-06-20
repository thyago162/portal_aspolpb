<template>
  <b-container fluid class="mt-3">
    <b-row>
      <b-col>
        <div v-html="item.nm_content"></div>
      </b-col>
      <b-col>
        <b-tabs pills>
          <b-tab title="Certidões" @click="getFiles('certidoes')">
              <TransparencyFiles :files="files" />
          </b-tab>
          <b-tab title="Contabilidade" @click="getFiles('contabilidade')">
              <TransparencyFiles :files="files" />
          </b-tab>
          <b-tab title="Financeiro" @click="getFiles('financeiro')">
              <TransparencyFiles :files="files" />
          </b-tab>
          <b-tab title="Outros" @click="getFiles('outros')">
              <TransparencyFiles :files="files" />
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TransparencyFiles from '../../components/transparency/TransparencyFiles';
export default {
  mounted() {
    this.getFiles("certidoes", this.item.id_transparency);
  },

  components: {
      TransparencyFiles
  },

  props: ["item"],

  data() {
    return {
      show: false,
      files: []
    };
  },

  computed: {
    token: function() {
      return this.$session.get("jwt");
    }
  },

  methods: {
    showDetails() {
      this.show = !this.show;
      this.getFiles();
    },

    getFiles(type) {
     this.$http('transparency-file/show', {
         params: {
             fk_transparency: this.item.id_transparency,
             nm_type_doc: type
         },
         headers: {
             Authorization: 'Bearer '+this.token
         }
     })
     .then(res => {
         if (res.status === 200) {
             this.files = res.data.result.transparencyFile
         }
     })
     .catch(err => {
         window.console.log(err)
     })

    }
  }
};
</script>