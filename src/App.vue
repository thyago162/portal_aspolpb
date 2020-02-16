<template>
  <div class="app">
    
    <Header />
    <router-view />
   
  </div>
</template>

<script>
  import Header from './components/header/Header.vue';

  export default {
    name: 'app',

    computed: {
      loading() {
        return this.$store.getters.getLoading
      }
    },

    components: {
      Header,
    }
  }
</script>

<style>
  .app {
    overflow-x: hidden;
  }
</style>
