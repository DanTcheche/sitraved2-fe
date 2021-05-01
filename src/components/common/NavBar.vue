<template>
  <v-app-bar
    app
  >
    <v-app-bar-nav-icon v-if="false" @click="$emit('toggleDrawer')">
      <v-icon v-if="!showingDrawer">mdi-filter</v-icon>
      <v-icon v-else>mdi-filter-off</v-icon>
    </v-app-bar-nav-icon>

    <v-toolbar-title>Sitraved</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon style="display: none">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn
      v-if="initialized"
      class="ma-2"
      color="primary"
      @click="showRecommendationDialog"
    >
      Add recommendation
    </v-btn>

    <v-btn
      v-if="initialized && !user"
      class="ma-2"
      color="secondary"
      @click="showUserManagementDialog"
    >
      Login
    </v-btn>

    <v-menu
      v-if="initialized && user"
      left
      bottom
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list class="nav-bar-list">
        <v-list-item @click="logout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NavBar",
  props: {
    showingDrawer: Boolean
  },
  computed: {
    ...mapGetters(["initialized"]),
    ...mapGetters("user", ["user"])
  },
  methods: {
    showUserManagementDialog() {
      this.$store.dispatch("toggleUserManagementDialog", true);
    },
    showRecommendationDialog() {
      if (!this.user) {
        this.showUserManagementDialog();
      } else {
        this.$store.dispatch("toggleRecommendationDialog", true);
      }
    },
    async logout() {
      await this.$store.dispatch("user/logout");
    }
  }
};
</script>

<style scoped>
  .nav-bar-list {
    margin-top: 52px;
  }

</style>
