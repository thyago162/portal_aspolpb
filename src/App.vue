<template>
  <div >
    <Header />
     <Load v-if="loading === true" />
    <router-view />
   
  </div>
</template>

<script>
  import Header from './components/header/Header.vue';
  import Load from './components/loader/Loader.vue';

  export default {
    name: 'app',

    computed: {
      loading() {
        return this.$store.getters.getLoading
      }
    },

    components: {
      Header,
      Load
    }
  }
</script>

<style>

</style>
