<template>
  <div class="app">
    
    <Auth ref="auth"/>
    <Menu />
    <Sidebar />
    <router-view />
    <Footer />

  </div>
</template>

<script>
  import Auth from './components/auth/Auth';
  import Menu from './components/menu/Menu';
  import Footer from './components/footer/Footer';
  import Sidebar from './components/sidebar/Sidebar';

  export default {
    name: 'app',

    computed: {
      loading() {
        return this.$store.getters.getLoading
      }
    },

    components: {
      Footer,
      Menu,
      Sidebar,
      Auth
    },

  }
</script>

<style>
  .app {
    overflow-x: hidden;
  }
</style>
