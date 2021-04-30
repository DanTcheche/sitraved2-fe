<template>
    <v-text-field
        v-model="password"
        :rules="passwordRules"
        :label="label"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        required
        @click:append="showPassword = !showPassword"
    />
</template>

<script>
export default {
  name: "PasswordField",
  props: {
    label: String,
    rules: Array,
    value: String
  },
  data() {
    return {
      showPassword: false,
      password: null
    };
  },
  computed: {
    passwordRules() {
      const basicRules = [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 8) || "Password should have at least 6 characters."
      ];
      if (this.rules) {
        return basicRules.concat(this.rules);
      } else {
        return basicRules;
      }
    }
  },
  watch: {
    value() {
      this.password = this.value;
    },
    password() {
      this.$emit("input", this.password);
    }
  }
};
</script>
