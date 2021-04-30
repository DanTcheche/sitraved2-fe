<template>
  <v-btn
    class="mx-2 close-button"
    fab
    dark
    small
    color="error"
    @click="hideRecommendationDialog"
  >
    <v-icon dark>
      mdi-close
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "CloseButton",
  methods: {
    hideRecommendationDialog() {
      this.$store.dispatch("toggleRecommendationDialog", false);
    }
  }
};
</script>

<style scoped>
  .close-button {
    position: absolute;
    right: 5px;
    top: 10px;
  }
</style>
