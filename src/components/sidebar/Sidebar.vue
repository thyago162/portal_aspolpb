<template>
  <div>
    <b-sidebar
      id="menu-lateral"
      right
      :visible="visible"
      bg-variant="dark"
      text-variant="light"
      :no-header="true"
      :no-close-on-backdrop="false"
      shadow
    >
      <div class="menu-lateral-header">
        <h4 class="ml-2">Painel de Controle</h4>
      </div>
      <b-nav vertical class="mt-3">
        <b-nav-item @click="$router.push({ name: 'table-news' })">
          <b-icon icon="newspaper" ></b-icon>
          <span class="ml-2">Notícias</span>
        </b-nav-item>
        <b-nav-item @click="$router.push({ name: 'table-about' })">
          <b-icon icon="building" />
          <span class="ml-2">Institucional</span>
        </b-nav-item>
        <b-nav-item @click="$router.push({ name: 'table-media' })">
          <b-icon icon="tv-fill"></b-icon>
          <span class="ml-2">Mídia</span>
        </b-nav-item>
        <b-nav-item @click="$router.push({ name: 'table-agreement' })">
          <b-icon icon="collection-fill"></b-icon>
          <span class="ml-2">Convênios</span>
        </b-nav-item>
        <b-nav-item @click="$router.push({ name: 'table-associated' })">
          <b-icon icon="person-square"></b-icon>
          <span class="ml-2">Associados</span>
        </b-nav-item>
        <b-nav-item @click="$router.push({ name: 'table-file' })">
          <b-icon icon="files"></b-icon>
          <span class="ml-2">Arquivos</span>
        </b-nav-item>
        <b-nav-item @click="$router.push({ name: 'table-user' })">
          <b-icon icon="people-fill"></b-icon>
          <span class="ml-2">Usuários</span>
        </b-nav-item>
        <b-nav-item @click="$router.push({ name: 'dashboard' })">
          <b-icon icon="pie-chart-fill"></b-icon>
          <span class="ml-2">Relatórios</span>
        </b-nav-item>
        <b-nav-item v-b-modal.warning-form >
          <b-icon icon="aspect-ratio"></b-icon>
          <span class="ml-2">Avisos</span>
          </b-nav-item>
      </b-nav>

      <template v-slot:footer="{ hide }">
        <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
          <strong class="mr-auto">Versão 1.5.0</strong>
          <b-button size="sm" @click="hide">Fechar</b-button>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    };
  },

  computed: {
    user: function() {
      return this.$session.get("user");
    }
  },

  methods: {
    logout() {
      let path = this.$router.history.current.fullPath;
      this.$session.destroy();
      this.$store.dispatch("token", null);
      if (!path == "/") {
        this.$router.push({ name: "home" });
      } else {
        location.reload("/");
      }
    }
  }
};
</script>

<style scoped>
.menu-lateral-header {
  width: 100%;
  height: 50px;
  background-color: #333;
}

h4 {
  padding: 10px;
}
a {
  color: blanchedalmond;
}

a:hover {
  font-weight: bolder;
  color: #ffffff;
}
</style>