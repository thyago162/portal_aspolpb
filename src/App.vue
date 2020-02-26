<template>
  <div class="app">
    
    <Header />
    <router-view />
    <Footer />

  </div>
</template>

<script>
  import Header from './components/header/Header';
  import Footer from './components/footer/Footer';

  export default {
    name: 'app',

    computed: {
      loading() {
        return this.$store.getters.getLoading
      }
    },

    components: {
      Header,
      Footer
    }
  }
</script>

<style>
  .app {
    overflow-x: hidden;
  }
</style>
