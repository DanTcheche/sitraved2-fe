<template>
  <v-card class="px-4">
    <v-card-text>
      <v-form ref="registerForm" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="username"
              :rules="[rules.required]"
              label="Username"
              maxlength="20"
              required />
          </v-col>
          <v-col cols="12">
            <email-field
              v-model="email"
              label="E-mail"
            />
          </v-col>
          <v-col cols="12">
            <password-field
            v-model="password"
            label="Password"
            />
          </v-col>
          <v-col cols="12">
            <password-field
              v-model="rePassword"
              :rules="rules.rePasswordRules"
              label="Confirm password"
              @keyup.native.enter="register"
            />
          </v-col>
          <v-alert
            v-if="errorMessage"
            color="pink darken-1"
            dark
            height="36"
            class="alert"
          >
            {{ errorMessage }}
          </v-alert>
          <v-spacer></v-spacer>
          <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
            <v-btn x-large block :disabled="!valid || loading || !allFieldsFilled" color="success" @click="register">Sign Up</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import EmailField from "@/components/common/EmailField";
import PasswordField from "@/components/common/PasswordField";
export default {
  name: "SignUpTab",
  components: { PasswordField, EmailField },
  data() {
    return {
      username: null,
      email: null,
      password: null,
      rePassword: null,
      rules: {
        required: value => !!value || "Required.",
        rePasswordRules: [(v) => v === this.password || "Passwords don't match"]
      },
      valid: false,
      loading: false,
      errorMessage: null
    };
  },
  computed: {
    allFieldsFilled() {
      return this.username !== null && this.email !== null && this.password !== null && this.rePassword !== null;
    }
  },
  methods: {
    async register() {
      this.loading = true;
      const response = await this.$store.dispatch("user/signUp",
        {
          username: this.username,
          email: this.email,
          password: this.password,
          password_confirmation: this.rePassword
        });
      if (!response.success) {
        this.errorMessage = response.message;
        this.resetFields();
      } else {
        this.$store.dispatch("toggleUserManagementDialog");
      }
      this.loading = false;
    },
    resetFields() {
      this.password = null;
      this.rePassword = null;
    }
  }
};
</script>

<style scoped>
  .alert {
    margin-left: 10px;
  }
</style>
