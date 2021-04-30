<template>
    <v-text-field
        v-model="email"
        :rules="emailRules"
        :label="label"
        required
    />
</template>

<script>
export default {
  name: "EmailField",
  props: {
    label: String,
    value: String
  },
  data() {
    return {
      email: null
    };
  },
  computed: {
    emailRules() {
      return [
        (v) => !!v || "E-mail is required",
        (v) => /^\w+([-.+]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail must be valid"
      ];
    }
  },
  watch: {
    value() {
      this.email = this.value;
    },
    email() {
      this.$emit("input", this.email);
    }
  }
};
</script>
