<template>
  <div class="app">
    
    <Menu />
    <router-view />
    <Footer />

  </div>
</template>

<script>
  import Menu from './components/menu/Menu';
  import Footer from './components/footer/Footer';

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
    },

  }
</script>

<style>
  .app {
    overflow-x: hidden;
  }
</style>
