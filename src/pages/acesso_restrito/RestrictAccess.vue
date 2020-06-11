<template>
  <div>
      <router-view></router-view>
  </div>
</template>

<script>
     
    export default {
        computed: {
            path: function() {
                return this.$router.history.current.fullPath
            }
        }
        
    }
</script>