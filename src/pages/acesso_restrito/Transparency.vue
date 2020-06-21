<template>
  <b-container fluid class="mb-3">
    <b-row class="header-title ml-1 mr-1">
      <b-col class="title" >
        <h5 class="mt-2">
          Transparência
        </h5>
      </b-col>
    </b-row>

    <b-row class="mt-3 ml-1 mr-1">
      <b-col>
        <h4>
          <b>Atenção:</b> Estas informações são de interesse exclusivo dos associados, portanto é proibida sua publicação e/ou divulgação para outros públicos, devendo ser cumprido, conforme estabelece o inciso III, do art. 7º, do Estatuto.
        </h4>
      </b-col>
    </b-row>

    <b-row class="mt-3 ml-1 mr-1">
      <b-col>
        <b-button
          :style="{float: 'right'}"
          variant="primary" 
          @click="$router.push({name: 'form-transparency', params: {id: 'novo'}})"
          v-if="token != null && user.administrator === 1"
        >
          Nova gestão
        </b-button>
      </b-col>
    </b-row>

    <b-row class="mt-3">
      <b-col>
          <TableTransparency :item="transparency" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import TableTransparency from '../../components/transparency/TableTransparency';
export default {
  components: {
    TableTransparency
  },

  computed: {
    token: function() {
      return this.$session.get("jwt");
    },

    transparency: function() {
      return this.$store.getters.getTransparency;
    },

    user: function() {
      return this.$session.get('user');
    }
  },

  mounted() {
    this.$store.dispatch("transparency", this.token);
  },

  data() {
    return {
      form: {}
    };
  }
};
</script>

<style scoped>
h5 {
  margin-top: 10px;
}

.transparency-head {
  margin-top: 20px;
  border-bottom: 3px solid red;
}

.transparency-title {
  background: rgba(138, 21, 0, 1);
  background: -moz-linear-gradient(
    left,
    rgba(138, 21, 0, 1) 0%,
    rgba(186, 35, 15, 1) 25%,
    rgba(201, 27, 8, 1) 71%,
    rgba(240, 31, 12, 1) 100%
  );
  background: -webkit-gradient(
    left top,
    right top,
    color-stop(0%, rgba(138, 21, 0, 1)),
    color-stop(25%, rgba(186, 35, 15, 1)),
    color-stop(71%, rgba(201, 27, 8, 1)),
    color-stop(100%, rgba(240, 31, 12, 1))
  );
  background: -webkit-linear-gradient(
    left,
    rgba(138, 21, 0, 1) 0%,
    rgba(186, 35, 15, 1) 25%,
    rgba(201, 27, 8, 1) 71%,
    rgba(240, 31, 12, 1) 100%
  );
  background: -o-linear-gradient(
    left,
    rgba(138, 21, 0, 1) 0%,
    rgba(186, 35, 15, 1) 25%,
    rgba(201, 27, 8, 1) 71%,
    rgba(240, 31, 12, 1) 100%
  );
  background: -ms-linear-gradient(
    left,
    rgba(138, 21, 0, 1) 0%,
    rgba(186, 35, 15, 1) 25%,
    rgba(201, 27, 8, 1) 71%,
    rgba(240, 31, 12, 1) 100%
  );
  background: linear-gradient(
    to right,
    rgba(138, 21, 0, 1) 0%,
    rgba(186, 35, 15, 1) 25%,
    rgba(201, 27, 8, 1) 71%,
    rgba(240, 31, 12, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#8a1500', endColorstr='#f01f0c', GradientType=1 );
  width: 250px;
  height: 40px;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: -15px;
  margin-top: 10px;
}
</style>