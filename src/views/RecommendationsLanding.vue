<template>
  <div id="recommendations-landing">
    <v-row v-if="movieRecommendations">
      <v-col
        class="mt-2"
        cols="12"
      >
        <v-select class="sorts"
          :items="sorts"
          v-model="selectedSort"
          return-object
          @change="sort"
        />
      </v-col>

      <v-col
        v-for="movieRecommendation in movieRecommendations"
        :key="movieRecommendation.id"
        cols="6"
        md="2"
      >
        <movie-recommendation-card :movie-recommendation="movieRecommendation" />
      </v-col>
    </v-row>
    <v-row v-if="nextPage && nextPage !== 1" align="center" justify="space-around">
      <v-btn v-intersect="getNextPage" :loading="loading" @click="getNextPage">
        Load More
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MovieRecommendationCard from "@/components/recommendations/MovieRecommendationCard";

export default {
  name: "RecommendationsLanding",
  components: { MovieRecommendationCard },
  data() {
    return {
      sorts: [
        { text: "New Recommendations", value: "new" },
        { text: "Most Liked", value: "popularity" }
      ],
      selectedSort: { text: "New Recommendations", value: "new" }
    };
  },
  computed: {
    ...mapGetters("movieRecommendations", ["movieRecommendations", "nextPage", "loading"])
  },
  methods: {
    async getNextPage() {
      await this.$store.dispatch("movieRecommendations/getRecommendations", { sort: this.selectedSort.value });
    },
    async sort() {
      await this.$store.dispatch("movieRecommendations/getRecommendations", { sort: this.selectedSort.value, resetSearch: true });
    }
  }
};
</script>
