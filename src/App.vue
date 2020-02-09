<template>
  <div >
    <Header />
     <Load v-if="loading === true" />
     <Submenu />
    <router-view />
   
  </div>
</template>

<script>
  import Header from './components/header/Header.vue';
  import Load from './components/loader/Loader.vue';
  import Submenu from './components/submenu/Submenu';

  export default {
    name: 'app',

    computed: {
      loading() {
        return this.$store.getters.getLoading
      }
    },

    components: {
      Header,
      Load,
      Submenu
    }
  }
</script>

<style>

</style>
