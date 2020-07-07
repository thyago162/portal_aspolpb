<template>
  <b-container fluid>
    <b-row class="header-title ml-1 mr-1">
      <b-col class="title">
        <h5 class="mt-2">DADOS DO ASSOCIADO</h5>
      </b-col>
    </b-row>

    <b-row class="mt-5 ml-1 mr-1" v-if="associated">
      <b-col :style="{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}">
        <div :class="isActive">
          <h5>{{user.name}}</h5>
        </div>

        <div :class="isActive">
          <h5>Situação: {{associated.st_active === 1 ? 'Ativo' : 'Pendente'}}</h5>
        </div>
        <div v-bind:class="isActive" v-if="associated.updated_at">
          <h5>{{associated.updated_at | fullDate}}</h5>
        </div>

        <b-button
          variant="info"
          @click="$router.push({name: 'form-associated', params: {id: associated.nm_email}})"
        >
          <b-icon icon="pen"></b-icon>
        </b-button>
      </b-col>
    </b-row>
    <h5 v-else class="mt-5 mb-5 ml-5">
      Nenhum dado a ser exibido
    </h5>

    <b-row class="mt-3" v-if="associated">
      <b-col>
        <AssociatedView :item="associated" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import AssociatedView from "./AssociatedView";
export default {
  created() {
    this.getAssociated();
  },

  components: {
    AssociatedView
  },

  computed: {
    user: function() {
      return this.$session.get("user");
    },

    token: function() {
      return this.$session.get("jwt");
    },

    isActive: function() {
      return {
        active: this.associated.st_active === 1,
        pending: this.associated.st_active === 0
      };
    }
  },

  data() {
    return {
      associated: [],
      activeClass: "active",
      pendingClass: "pending"
    };
  },

  methods: {
    getAssociated() {
      this.$http("associated/show/email/" + this.user.email, {
        headers: {
          Authorization: "Bearer " + this.token
        }
      })
        .then(res => {
          if (res.status === 200) {
            this.associated = res.data.result.associated;
          }
        })
        .catch(err => {
          window.console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.active {
  background: rgb(25, 74, 15);
  background: linear-gradient(
    345deg,
    rgba(25, 74, 15, 1) 13%,
    rgba(27, 225, 8, 1) 100%
  );
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 250px;
  height: 50px;
  color: #fff;
}

.pending {
  background: rgb(172, 102, 20);
  background: linear-gradient(
    264deg,
    rgba(172, 102, 20, 1) 13%,
    rgba(225, 204, 8, 1) 100%
  );
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 250px;
  height: 50px;
  color: #fff;
}

h5 {
  margin-top: 7px;
}
</style>