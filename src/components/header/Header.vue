<template>
  <div>
    <b-row class="header">
      <b-col>
        <b-img-lazy :blank="true" fluid-grow :src="image" class="image"></b-img-lazy>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <Submenu />
      </b-col>
    </b-row>

    <WarningForm :item="item" />
  </div>
</template>

<script>
import Submenu from "../submenu/Submenu";
import WarningForm from "../warning/WarningForm";

export default {
  components: {
    Submenu,
    WarningForm
  },

  mounted() {
    this.$store.dispatch("warning");
  },

  computed: {
    image: function() {
      return this.warning.nm_image_path != undefined
        ? this.warning.nm_image_path
        : "";
    },

    token: function() {
      return this.$store.getters.getToken;
    },

    warning: function() {
      return this.$store.getters.getWarning;
    },

    administrator: function() {
      let user = this.$session.get("user");
      return user ? user.administrator : 0;
    }
  },

  data() {
    return {
      item: []
    };
  },

  methods: {
    editItem() {
      this.item = this.warning;
    }
  }
};
</script>

<style scoped>
.header {
  height: 400px;
}

.image {
  max-height: 400px;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.banner {
  background-color: #111010;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn-edit {
  bottom: 0px;
  color: #000;
  position: absolute;
}

@media screen and (max-width: 768px) {
  .header {
    max-height: 280px;
  }

  .image {
    max-height: 280px;
  }
}

@media screen and (max-width: 416px) {
  .header {
    max-height: 220px;
  }

  .image {
      max-height: 220px;
  }

  h3 {
    font-size: 10px;
    margin-top: 15px;
  }
}

@media screen and (max-width: 375px) {
  .header {
    height: 170px;
  }
}
</style>