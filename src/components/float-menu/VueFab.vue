<template>
  <vue-fab
    icon="arrow_drop_up"
    size="big"
    mainBtnColor="red"
    @clickMainBtn="goBack()"
  ></vue-fab>
</template>

<script>
export default {
  components: {},

  data() {
    return {
    }
  },

  methods: {
    goBack() {
      document.getElementById('menu').scrollIntoView()
    }
    
  }
};
</script>