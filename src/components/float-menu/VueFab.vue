<template>
  <fab
    :position="position"
    :main-icon="mainIcon"
    :bg-color="bgColor"
    :actions="fabActions"
    @noticias="news" @institucional="about" @convenios="agreement" @associados="associated"
    @midias="media" @arquivos="file" @usuarios="user" @relatorios="dashboard"
  ></fab>
</template>

<script>
import fab from "vue-fab";
export default {
  components: {
    fab
  },

  data() {
    return {
      bgColor: "red",
      position: "button-right",
      mainIcon: "menu",
      fabActions: [
        {
          name: "noticias",
          icon: "article",
          tooltip: "Notícias"
        },
        {
          name: "institucional",
          icon: "domain",
          tooltip: "Institucional"
        },
        {
          name: "convenios",
          icon: "wysiwyg",
          tooltip: "Convênios"
        },
        {
          name: "associados",
          icon: "assignment_ind",
          tooltip: "Associados"
        },
        {
          name: "midias",
          icon: "tv",
          tooltip: "Mídias Sociais"
        },
        {
          name: "arquivos",
          icon: "folder",
          tooltip: "Arquivos"
        },
        {
          name: "usuarios",
          icon: "people",
          tooltip: "Usuários"
        },
        {
          name: "relatorios",
          icon: "bubble_chart",
          tooltip: "Relatórios"
        },
      ]
    };
  },

  methods: {
    news() {
      this.$router.push({ name: "table-news" });
    },

    about() {
      this.$router.push({ name: "table-about" });
    },

    agreement() {
      this.$router.push({ name: "table-agreement" });
    },

    associated() {
      this.$router.push({ name: "table-associated" });
    },

    media() {
      this.$router.push({ name: "table-media" });
    },

    dashboard() {
      this.$router.push({ name: "dashboard" });
    },

    file() {
      this.$router.push({ name: "table-file" });
    },

    user() {
      this.$router.push({name: 'table-user'});
    }
  }
};
</script>