<template>
  <v-app id="inspire">

    <nav-bar @toggleDrawer="toggleDrawer" :showing-drawer="this.showDrawer" />

<!--    <drawer v-model="showDrawer"/>-->

    <log-in-sign-up-dialog v-if="showUserManagementDialog"/>
    <media-search-dialog v-if="showRecommendationDialog" />

    <v-main>
      <v-container>
        <router-view v-if="initialized" />
      </v-container>
    </v-main>

    <notifications position="top right" ignore-duplicates style="z-index: 1000000" />
  </v-app>
</template>

<script>
import Vue from "vue";
import NavBar from "@/components/common/NavBar.vue";
import { mapGetters } from "vuex";
import LogInSignUpDialog from "@/components/userManagement/LogInSignUpDialog";
import MediaSearchDialog from "@/components/movieSearch/MediaSearchDialog";

export default Vue.extend({
  name: "App",
  components: {
    MediaSearchDialog,
    LogInSignUpDialog,
    NavBar
  },
  data() {
    return {
      showDrawer: false
    };
  },
  computed: {
    ...mapGetters(["initialized", "showUserManagementDialog", "showRecommendationDialog"])
  },
  async beforeCreate() {
    if (!this.initialized) {
      await this.$store.dispatch("init");
    }
  },
  methods: {
    toggleDrawer() {
      this.showDrawer = !this.showDrawer;
    }
  }
});
</script>
