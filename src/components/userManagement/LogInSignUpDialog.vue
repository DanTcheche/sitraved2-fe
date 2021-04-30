<template>
  <v-dialog v-model="dialog" @click:outside="hideUserManagementDialog" persistent max-width="600px" min-width="360px">
    <div>
      <v-tabs v-model="tab" show-arrows icons-and-text dark grow>
        <v-tabs-slider color="darken-4"></v-tabs-slider>
        <v-tab v-for="(tab, index) in tabs" :key="index">
          <v-icon large>{{ tab.icon }}</v-icon>
          <div class="caption py-1">{{ tab.name }}</div>
        </v-tab>
        <v-tab-item>
          <log-in-tab />
        </v-tab-item>
        <v-tab-item>
          <sign-up-tab />
        </v-tab-item>
      </v-tabs>
    </div>
  </v-dialog>
</template>

<script>
import LogInTab from "@/components/userManagement/LogInTab";
import SignUpTab from "@/components/userManagement/SignUpTab";

export default {
  name: "LogInSignUpDialog",
  components: { SignUpTab, LogInTab },
  data() {
    return {
      dialog: true,
      tab: 0,
      tabs: [
        { name: "Login", icon: "mdi-account" },
        { name: "Register", icon: "mdi-account-outline" }
      ]
    };
  },
  methods: {
    hideUserManagementDialog() {
      this.$store.dispatch("toggleUserManagementDialog", false);
    }
  }
};
</script>

<style scoped>

</style>
