<template>
  <v-btn
    class="mx-2 close-button"
    fab
    dark
    small
    color="secondary"
    @click="$emit('back')"
  >
    <v-icon dark>
      mdi-keyboard-backspace
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "BackButton"
};
</script>

<style scoped>
.close-button {
  position: absolute;
  left: 5px;
  top: 10px;
  z-index: 10;
}
</style>
