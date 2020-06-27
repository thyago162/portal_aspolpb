<template>
  <div class="menu" id="menu">
    <b-navbar toggleable="xl" type="dark" variant="light">
      <b-navbar-brand>
        <img
          src="../../assets/images/logo_aspol_02.png"
          alt="Aspolpb"
          class="d-inline-block align-top logo ml-5"
        />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse">
        <b-icon icon="list" variant="dark" class="mb-2 list"></b-icon>
      </b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav class="justify-content-center">
        <b-navbar-nav class="menu-options">
          <b-nav-item>
            <b-link :to="{name: 'home'}" class="personal-link">INÍCIO</b-link>
          </b-nav-item>

          <b-nav-item-dropdown no-caret>
            <template v-slot:button-content>
              <span class="personal-link">INSTITUCIONAL</span>
            </template>
            <b-dropdown-item>
              <b-link :to="{name: 'sobre'}" class="personal-link">QUEM SOMOS</b-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <b-link :to="{name: 'historia'}" class="personal-link">NOSSA HISTÓRIA</b-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <b-link class="personal-link" :to="{name: 'campanhas'}">CAMPANHAS</b-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <b-link class="personal-link" :to="{name: 'identidade-visual'}">IDENTIDADE VISUAL</b-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown no-caret>
            <template v-slot:button-content>
              <span class="personal-link">MÍDIA</span>
            </template>
            <b-dropdown-item>
              <b-link class="personal-link" :to="{name: 'midia-view'}">ASPOL NA MÍDIA</b-link>
            </b-dropdown-item>

            <b-dropdown-item>
              <b-link class="personal-link" :to="{name: 'noticias'}">NOTÍCIAS</b-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item>
            <b-link :to="{name: 'convênio'}" class="personal-link">CONVÊNIOS</b-link>
          </b-nav-item>
          <b-nav-item v-if="token != null">
            <b-button
              size="sm"
              class="personal-btn associated"
              @click="$router.push({name: 'form-associated', params: {id: 'novo'}})"
            >
              <span>ASSOCIE-SE</span>
            </b-button>
          </b-nav-item>

          <b-nav-item-dropdown v-if="token == null" no-caret>
            <template v-slot:button-content>
              <b-button size="sm" class="personal-btn">
                <span>
                  AREA RESTRITA
                  <b-icon icon="lock-fill"></b-icon>
                </span>
              </b-button>
            </template>
            <b-dropdown-item>
              <b-link class="personal-link" v-b-modal.auth>
                <b-icon icon="person-fill"></b-icon> <span class="ml-1">LOGIN</span>
              </b-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <b-link class="personal-link" disabled>
                <b-icon icon="eye-fill"></b-icon> <span class="ml-1">TRANSPARÊNCIA</span>
              </b-link>
            </b-dropdown-item>

            <b-dropdown-item>
              <b-link class="personal-link" disabled>
                <b-icon icon="chat-fill"></b-icon><span class="ml-1">SUGESTÕES</span>
              </b-link>
            </b-dropdown-item>

            <b-dropdown-item>
              <b-link class="personal-link" disabled>
                <b-icon icon="tag-fill"></b-icon><span class="ml-1">ACESSORIA JURÍDICA</span>
              </b-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <b-link class="personal-link" disabled>
                <b-icon icon="folder-fill"></b-icon><span class="ml-1">ARQUIVOS</span>
              </b-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown v-else no-caret>
            <template v-slot:button-content>
              <b-button size="sm" class="personal-btn">
                <span>
                  AREA RESTRITA
                  <b-icon icon="unlock-fill"></b-icon>
                </span>
              </b-button>
            </template>
            <b-dropdown-item>
              <b-link class="personal-link" :to="{name: 'transparencia'}">
                <b-icon icon="eye-fill"></b-icon><span class="ml-1">TRANSPARÊNCIA</span>
              </b-link>
            </b-dropdown-item>

            <b-dropdown-item>
              <b-link class="personal-link" :to="{name: 'sugestoes'}">
                <b-icon icon="chat-fill"></b-icon><span class="ml-1">SUGESTÕES</span>
              </b-link>
            </b-dropdown-item>

            <b-dropdown-item>
              <b-link class="personal-link" :to="{name: 'assessoria-juridica'}">
                <b-icon icon="tag-fill"></b-icon><span class="ml-1">ACESSORIA JURÍDICA</span>
              </b-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <b-link class="personal-link" :to="{name: 'arquivos'}">
                <b-icon icon="folder-fill"></b-icon><span class="ml-1">ARQUIVOS</span>
              </b-link>
            </b-dropdown-item>

            <b-dropdown-item>
              <b-link class="personal-link" v-b-toggle.menu-lateral>
                <b-icon icon="gear-wide-connected"></b-icon><span class="ml-1">PAINEL DE CONTROLE</span>
              </b-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown no-caret v-if="token != null">
            <template v-slot:button-content>
              <span class="personal-link">
                MINHA CONTA
                <b-icon icon="person-lines-fill"></b-icon>
              </span>
            </template>
            <b-dropdown-item>
              <b-link class="personal-link" :to="{name: 'user'}">Email e Senha</b-link>
            </b-dropdown-item>

            <b-dropdown-item>
              <b-link class="personal-link" :to="{name: 'associated-info'}">Dados do associado</b-link>
            </b-dropdown-item>

            <b-dropdown-item>
              <b-link class="personal-link" @click="logout">Sair</b-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <Auth />
    <ResetPassword />
    <VueFab  />
  </div>
</template>

<script>
import Auth from "../auth/Auth";
import ResetPassword from "../auth/ResetPassword";
import VueFab from "../float-menu/VueFab";

export default {
  components: {
    Auth,
    ResetPassword,
    VueFab
  },

  mounted() {
    this.verifyToken();
    this.isLoggedIn();
  },

  computed: {
    token() {
      return this.$store.getters.getToken;
    },

    user: function() {
      return this.$store.getters.getLoggedIn;
    }
  },

  methods: {
    verifyToken() {
      this.$session.has("jwt") == true
        ? this.$store.dispatch("token", this.$session.get("jwt"))
        : this.$store.dispatch("token", null);
    },

    isLoggedIn() {
      this.$session.has("user") == true
        ? this.$store.dispatch("loggedIn", this.$session.get("user"))
        : this.$store.dispatch("loggedIn", {});
    },

    logout() {
      this.$session.destroy();
      this.$store.dispatch("token", null);
      this.$router.push({ name: "home" });
      location.reload("/");
    }
  }
};
</script>

<style scoped>
.menu {
  width: 100%;
}

.logo {
  width: 200px;
  height: 90px;
  margin-top: -10px;
}

.personal-link {
  color: #333;
  text-decoration: none;
  font-size: 15px;
}

.personal-link:hover {
  font-weight: bolder;
  color: rgb(189, 22, 34);
}

.personal-btn {
  background: rgb(189, 22, 34);
  border-radius: 5px;
  margin-top: -4px;
}

@media screen and (max-width: 1299) {
  .associated {
    width: 130px;
  }
}

@media screen and (max-width: 1024px) {
  .personal-link {
    font-size: 14px;
  }

  .list {
    font-size: 27px;
  }
}

@media screen and (max-width: 416px) {
  .logo {
    width: 100px;
    height: 50px;
    margin-left: 0;
  }

  .personal-link {
    font-size: 10px;
  }

  .list {
    font-size: 22px;
  }

  .brand {
    margin-left: 0%;
  }
}

@media screen and (max-width: 375px) {
  .logo {
    width: 80px;
    height: 45px;
  }

  .list {
    font-size: 20px;
  }
}
</style>

