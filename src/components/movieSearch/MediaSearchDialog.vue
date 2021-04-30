<template>
  <v-dialog v-model="dialog" @click:outside="hideRecommendationDialog" persistent max-width="800px" min-width="360px">
    <div>
      <v-tabs v-model="tab" show-arrows icons-and-text dark grow>
        <v-tabs-slider color="darken-4"></v-tabs-slider>
        <v-tab v-for="(tab, index) in tabs" :key="index">
          <v-icon large>{{ tab.icon }}</v-icon>
          <div class="caption py-1">{{ tab.name }}</div>
        </v-tab>
        <v-tab-item>
          <movies-search />
        </v-tab-item>
      </v-tabs>
    </div>
  </v-dialog>
</template>

<script>

import MoviesSearch from "@/components/movieSearch/MoviesSearch";
export default {
  name: "MediaSearchDialog",
  components: { MoviesSearch },
  data() {
    return {
      dialog: true,
      tab: 0,
      tabs: [
        { name: "Movie", icon: "fas fa-film" }
      ]
    };
  },
  beforeDestroy() {
    this.$store.dispatch("moviesSearch/clear");
  },
  methods: {
    hideRecommendationDialog() {
      this.$store.dispatch("toggleRecommendationDialog", false);
    }
  }
};
</script>

<style scoped>

</style>
