<template>
  <v-card class="px-4">
    <v-card-text>
      <v-form ref="loginForm" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="username"
              :rules="[rules.required]"
              label="Username"
              maxlength="20"
              />
          </v-col>
          <v-col cols="12">
            <password-field
              v-model="password"
              label="Password"
            />
          </v-col>
          <v-alert
            v-if="errorMessage"
            color="pink darken-1"
            dark
          >
            {{ errorMessage }}
          </v-alert>
          <v-col class="d-flex" cols="12" sm="6" xsm="12">
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
            <v-btn x-large block :disabled="!valid || loading || !allFieldsFilled" color="success" @click="login">Login</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import PasswordField from "@/components/common/PasswordField";
export default {
  name: "LogInTab",
  components: { PasswordField },
  data() {
    return {
      username: null,
      password: null,
      valid: false,
      loading: false,
      errorMessage: null,
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  computed: {
    allFieldsFilled() {
      return this.username !== null && this.password !== null;
    }
  },
  methods: {
    async login() {
      this.loading = true;
      const response = await this.$store.dispatch("user/login", { username: this.username, password: this.password });
      if (!response.success) {
        this.errorMessage = response.message;
        this.resetFields();
      } else {
        this.$store.dispatch("toggleUserManagementDialog");
      }
      this.loading = false;
    },
    resetFields() {
      this.username = null;
      this.password = null;
    }
  }
};
</script>

<style scoped>

</style>
