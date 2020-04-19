<template>
  <div class="app">
    
    <Menu />
    <Sidebar />
    <router-view />
    <Footer />

  </div>
</template>

<script>
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
      Sidebar
    },

  }
</script>

<style>
  .app {
    overflow-x: hidden;
  }
</style>
