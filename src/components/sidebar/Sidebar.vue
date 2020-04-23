<template>
  <div>
    <b-sidebar id="sidebar-1" no-header right shadow :visible="visible">
      <template v-slot:default="{ hide }">

        <div >
          <div class="mt-4 sidebar-header">
            <b-avatar size="5rem"></b-avatar>
            <p class="mt-1" v-if="user">{{user.name}}</p>
        </div>

        <nav class="mb-3">
          <b-nav vertical>
              <b-nav-item-dropdown active @click="hide">
                 <template v-slot:button-content>
                            <span class="personal-link" >
                                Minha conta
                            </span>
                        </template>
                <b-dropdown-item>
                  Editar perfil
                </b-dropdown-item>
                <b-dropdown-item>
                  Meus dados
                </b-dropdown-item>
              </b-nav-item-dropdown>
              <b-nav-item  @click="hide" disabled>Associação</b-nav-item>
              <b-nav-item  @click="logout">Sair</b-nav-item>
          </b-nav>
        </nav>

        <b-button variant="primary" class="mb-0 mt-5" block @click="hide">Fechar</b-button>
      </div>
        
      </template>
      
    </b-sidebar>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        visible: false
      }
    },

    computed: {
      user: function() {
        return this.$session.get('user')
      }
    },

    methods: {
      logout() {
        this.$session.destroy();
        this.$store.dispatch('token',null);
        location.reload('/')
      }
    }
    
  }
</script>

<style scoped>
  .sidebar-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

</style>