<template>
  <div id="recommendation-card">
    <movie-card :movie="movieRecommendation.movie" />
    <confirmation-btn v-if="movieRecommendation.user.username === user.username"
      text="You are about to delete your own recommendation, are you sure you want to continue?"
      icon
      :color="color"
      @click="toggleRecommendation" >
      <v-icon v-if="recommendedByUser">mdi-thumb-up</v-icon>
      <v-icon v-else>mdi-thumb-up-outline</v-icon>
    </confirmation-btn>
    <v-btn v-else
      class="recommendation-card-like-button"
      icon
      :color="color"
      @click="toggleRecommendation" >
      <v-icon v-if="recommendedByUser">mdi-thumb-up</v-icon>
      <v-icon v-else>mdi-thumb-up-outline</v-icon>
    </v-btn>
  </div>
</template>

<script>
import MovieCard from "@/components/common/MovieCard";
import { mapGetters } from "vuex";
import ConfirmationBtn from "@/components/common/ConfirmationBtn";
export default {
  name: "MovieRecommendationCard",
  components: { ConfirmationBtn, MovieCard },
  props: {
    movieRecommendation: Object
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters("movieRecommendations", ["recommendationMoviesIds"]),
    color() {
      if (this.recommendedByUser) {
        return "primary";
      }
      return "warning";
    },
    recommendedByUser() {
      return this.recommendationMoviesIds && this.recommendationMoviesIds.includes(this.movieRecommendation.movie.id);
    }
  },
  methods: {
    async toggleRecommendation() {
      if (!this.user) {
        this.$store.dispatch("toggleUserManagementDialog", true);
        return;
      }
      if (this.recommendedByUser) {
      } else {
        const response = await this.$store.dispatch("movieRecommendations/addComment",
          {
            tmdb_id: this.movieRecommendation.movie.tmdb_id,
            reloadPage: false
          });
        if (response.success) {
          const addedMovieIds = JSON.parse(JSON.stringify(this.recommendationMoviesIds));
          addedMovieIds.push(this.movieRecommendation.movie.id);
          this.$store.commit("movieRecommendations/setRecommendationMoviesIds", addedMovieIds);
        }
      }
    }
  }
};
</script>
