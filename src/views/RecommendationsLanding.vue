<template>
  <div>
    <v-row v-if="movieRecommendations">
      <v-col
        class="mt-2"
        cols="12"
      >
        <strong>New Recommendations</strong>
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
  computed: {
    ...mapGetters("movieRecommendations", ["movieRecommendations", "nextPage", "loading"])
  },
  methods: {
    async getNextPage() {
      await this.$store.dispatch("movieRecommendations/getRecommendations");
    }
  }
};
</script>
