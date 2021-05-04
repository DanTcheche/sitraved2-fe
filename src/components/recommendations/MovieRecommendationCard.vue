<template>
  <div id="recommendation-card">
    <movie-card :movie="movieRecommendation.movie" :recommender="capitalizeFirstLetter(movieRecommendation.user.username)"/>
    <div class="recommendation-card-like-section">
      <v-btn
        icon
        :color="color"
        :disabled="loading"
        @click="toggleRecommendation" >
        <v-icon v-if="recommendedByUser">mdi-heart</v-icon>
        <v-icon v-else>mdi-heart-outline</v-icon>
      </v-btn>
      <span class="recommendation-count">{{ recommendationCount }}</span>
    </div>
  </div>
</template>

<script>
import MovieCard from "@/components/common/MovieCard";
import { mapGetters } from "vuex";
export default {
  name: "MovieRecommendationCard",
  components: { MovieCard },
  props: {
    movieRecommendation: Object
  },
  data() {
    return {
      comment: null,
      loading: false,
      recommendationCount: this.movieRecommendation.recommendations_count
    };
  },
  computed: {
    ...mapGetters("user", ["user"]),
    color() {
      if (this.recommendedByUser) {
        return "error";
      }
      return "warning";
    },
    recommendedByUser() {
      return this.isOwner || this.comment;
    },
    isOwner() {
      return this.user && this.movieRecommendation.user.username === this.user.username;
    }
  },
  created() {
    this.comment = this.movieRecommendation.comment;
  },
  methods: {
    async toggleRecommendation() {
      let response = null;
      if (!this.user) {
        this.$store.dispatch("toggleUserManagementDialog", true);
        return;
      }
      this.loading = true;
      if (this.recommendedByUser) {
        if (this.isOwner) {
          this.$notify({ type: "error", text: "You cannot delete a movie you recommended." });
        } else {
          response = await this.$store.dispatch("movieRecommendations/deleteComment", this.comment);
          if (response.success) {
            this.comment = null;
            this.recommendationCount -= 1;
          }
        }
      } else {
        response = await this.$store.dispatch("movieRecommendations/addComment",
          {
            tmdb_id: this.movieRecommendation.movie.tmdb_id,
            reloadPage: false
          });
        if (response.success) {
          this.comment = response.comment;
          this.recommendationCount += 1;
        } else {
          this.$notify({ type: "error", text: response.message });
        }
      }
      this.loading = false;
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
</script>
