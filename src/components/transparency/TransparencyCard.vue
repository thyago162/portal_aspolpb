<template>
  <b-container fluid class="mt-3">
    <b-row>
      <b-col>
        <div v-html="item.nm_content"></div>
      </b-col>
      <b-col>
        <b-overlay :show="loading">
        <b-tabs pills>
          
          <b-tab title="Certidões" @click="getFiles('Certidão')">
              <TransparencyFiles :files="files" />
          </b-tab>
          <b-tab title="Contabilidade" @click="getFiles('Contabilidade')">
              <TransparencyFiles :files="files" />
          </b-tab>
          <b-tab title="Financeiro" @click="getFiles('Financeiro')">
              <TransparencyFiles :files="files" />
          </b-tab>
          <b-tab title="Outros" @click="getFiles('Outros')">
              <TransparencyFiles :files="files" />
          </b-tab>
          
        </b-tabs>
        </b-overlay>
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

  created(){
    this.getFiles('Certidão')
  },

  props: ["item"],

  data() {
    return {
      show: false,
      loading: false,
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
      this.loading = true;
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
       this.loading = false;
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