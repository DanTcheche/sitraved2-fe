<template>
  <v-card box-shadow="none" class="px-4" >
    <v-row v-if="selectedMovie.already_recommended_by === false" class="already-recommended-text-container">
      <v-chip  color="warning" class="already-recommended-text">
        This movie was already recommended by someone else but feel free to add your own review.
      </v-chip>
    </v-row>
    <close-button />
    <back-button @back="$emit('back')" />
    <div class="d-flex">
      <v-img
        height="300"
        width="250"
        :src="`${selectedMovie.backdrop_url}`"
        class="add-recommendation-image"
      />

      <div class="movie-description-section">
        <v-card-title
          class="headline"
          v-text="selectedMovie.title"
        />
        <v-card-subtitle class="mt-2 add-recommendation-plot">
          {{ selectedMovie.plot }}
        </v-card-subtitle>
      </div>
    </div>
    <v-card-actions class="add-recommendation-actions">
      <v-textarea
        name="input-7-1"
        height="100"
        filled
        label="Recommendation description (Optional)"
        no-resize
        v-model="description"
        counter="500"
        class="add-recommendation-description"
      />
      <v-btn color="primary" class="add-recommendation-button" @click="addRecommendation">
        Add Recommendation
      </v-btn>
      <v-alert
        v-if="errorMessage"
        color="error"
        dark
        class="add-recommendation-alert"
      >
        {{ errorMessage }}
      </v-alert>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import CloseButton from "@/components/movieSearch/CloseButton";
import BackButton from "@/components/movieSearch/BackButton";

export default {
  name: "AddRecommendation",
  components: { BackButton, CloseButton },
  data() {
    return {
      description: "",
      errorMessage: null
    };
  },
  computed: {
    ...mapGetters("moviesSearch", ["selectedMovie"])
  },
  methods: {
    async addRecommendation() {
      if (this.description.length > 500) {
        this.errorMessage = "Description exceeds max length";
        return;
      }
      let response = {};
      if (this.selectedMovie.already_recommended_by === false) {
        response = await this.$store.dispatch("movieRecommendations/addComment",
          {
            tmdb_id: this.selectedMovie.id,
            description: this.description
          });
      } else {
        response = await this.$store.dispatch("movieRecommendations/addRecommendation",
          {
            tmdb_id: this.selectedMovie.id,
            description: this.description
          });
      }
      if (!response.success) {
        this.$notify({ type: "error", text: response.message });
        return;
      }
      this.$store.dispatch("toggleRecommendationDialog", false);
    }
  }
};
</script>

<style scoped type="less">
  .movie-description-section {
    width: 50%;
  }
  .add-recommendation-image {
    margin-top: 20px;
    border-radius: 10px;
  }
  .add-recommendation-actions {
    margin-top: 10px;
  }
  .add-recommendation-description {
    margin-right: 20px;
  }
  .add-recommendation-button {
    margin-top: 35px;
  }
  .add-recommendation-plot {
    --max-lines: 11;
    position: relative;
    max-height: calc(1.4rem * var(--max-lines));
    overflow: hidden;
    padding-right: 1rem; /* space for ellipsis */
  }
  .add-recommendation-alert {
    position: absolute;
    right: 22px;
    bottom: 80px;
    width: 200px;
    font-size: 12px;
  }
  .already-recommended-text {
    left: 150px;
  }
  .already-recommended-text-container {
    margin-top: 0;
    &.v-chip-content {
      color: black;
    }
  }
</style>
