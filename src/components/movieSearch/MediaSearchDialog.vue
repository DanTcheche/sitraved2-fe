<template>
  <v-dialog v-model="dialog" persistent max-width="1000px" min-width="360px" >
    <div>
      <movies-search v-if="tab === 0"  />
      <add-recommendation v-if="tab === 1" @back="tab = 0" />
    </div>
  </v-dialog>
</template>

<script>

import MoviesSearch from "@/components/movieSearch/MoviesSearch";
import AddRecommendation from "@/components/movieSearch/AddRecommendation";
import { mapGetters } from "vuex";
export default {
  name: "MediaSearchDialog",
  components: { AddRecommendation, MoviesSearch },
  computed: {
    ...mapGetters("moviesSearch", ["selectedMovie"])
  },
  data() {
    return {
      dialog: true,
      tab: 0,
      totalTabs: 2
    };
  },
  beforeDestroy() {
    this.$store.dispatch("moviesSearch/clear");
  },
  watch: {
    selectedMovie() {
      if (this.selectedMovie) {
        this.tab = 1;
      }
    },
    tab() {
      if (this.tab !== this.totalTabs - 1) {
        this.$store.commit("moviesSearch/setSelectedMovie", null);
      }
    }
  }
};
</script>

<style scoped>
</style>
