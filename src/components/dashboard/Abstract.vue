<template>
  <div class="resume-box">
    <Resume :data="totalNews" text="Notícias" color="#8B3E2F" />
    <Resume :data="totalAgreement" text="Convênios" color="#191970" />
    <Resume :data="totalAssociated" text="Associados" color="indigo" />
    <Resume :data="totalUsers" text="Usuários" color="#2E8B57" />
  </div>
</template>

<script>
import Resume from "./Resume";
export default {
  created() {
    this.$store.dispatch("news", 1);
    this.$store.dispatch("users", { token: this.token, page: 1 });
    this.$store.dispatch("agreement");
    this.$store.dispatch("associated");
  },

  components: {
    Resume
  },

  computed: {
    totalAgreement: function() {
      return this.$store.getters.getAgreement.length;
    },

    totalAssociated: function() {
      return this.$store.getters.getAssociated.length;
    },

    totalNews: function() {
      return this.$store.getters.getNews.total;
    },

    totalUsers: function() {
      return this.$store.getters.getUsers.total;
    },

    token: function() {
      return this.$session.get("jwt");
    }
  }
};
</script>

<style scoped>
.resume-box {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>