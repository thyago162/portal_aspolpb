<template>
  <b-container fluid class="mb-3">
    <b-row class="ml-1 mr-1">
      <b-col class="social-midia-head">
        <div class="social-midia-title">
          <h5>PARCEIROS</h5>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <carousel-partner :agreements="agreement" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CarouselPartner from "../components/partner/CarouselPartner";
export default {
  components: {
    CarouselPartner
  },

  created() {
    this.$store.dispatch("agreement");
  },

  computed: {
    agreement() {
      return this.$store.getters.getAgreement;
    }
  }
};
</script>

<style  scoped>
.social-midia-head {
  border-bottom: 3px solid rgb(189, 22, 34);
  margin-top: 20px;
}

.social-midia-title {
  background: rgb(189, 22, 34);
  width: 150px;
  height: 35px;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: -15px;
  margin-top: 10px;
}
.partner-title {
  margin-top: 20px;
}

h5 {
  margin-bottom: 0%;
}

.partner-title-block {
  border-bottom: 2px solid black;
  width: 110px;
}

@media screen and (max-width: 1200px) {
  h5 {
    font-size: 20px;
    font-weight: bold;
  }
}

@media screen and (max-width: 724px) {
  h5 {
    font-size: 18px;
  }
}

@media screen and (max-width: 500px) {
  h5 {
    font-size: 15px;
  }

  .partner-title-block {
    border-bottom: 2px solid black;
    width: 80px;
  }
}
</style>