<template>
  <v-navigation-drawer
    v-model="showDrawer"
    fixed
    temporary
  />
</template>

<script>
export default {
  name: "Drawer",
  props: {
    value: Boolean
  },
  data() {
    return {
      showDrawer: this.value
    };
  },
  watch: {
    value() {
      this.showDrawer = this.value;
    },
    showDrawer() {
      this.$emit("input", this.showDrawer);
    }
  }
};
</script>

<style scoped>

</style>
