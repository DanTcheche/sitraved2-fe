<template>
  <v-hover>
    <template #default="{ hover }">
      <v-card id="movie-card" box-shadow="none" min-width="175">
        <div @click="selectMovie" :class="{ 'show-cursor': !movie.already_recommended_by && withAddButton }">
          <v-img
            height="315"
            width="100%"
            :src="`${movie.poster_url}`"
            class="movie-image"
          >
          </v-img>
          <v-fade-transition>
            <v-overlay v-show="hover" absolute opacity="0.75">
              <div class="movie-title text-center">
                {{ movie.title }}
              </div>
              <p v-if="movie.year" class="text-center">
                {{ movie.year }}
              </p>
              <p v-if="recommender" class="recommended-by">Recommended by:
                <span class="font-weight-bold recommender">
                  {{ recommender }}
                </span>
              </p>
              <v-chip v-if="movie.already_recommended_by" class="text-center" color="error" style="max-width: 210px;">Already recommended by you</v-chip>
            </v-overlay>
          </v-fade-transition>
        </div>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  name: "MovieCard",
  props: {
    movie: Object,
    withAddButton: Boolean,
    recommender: String
  },
  methods: {
    selectMovie() {
      if (this.withAddButton && !this.movie.already_recommended_by) {
        this.$store.commit("moviesSearch/setSelectedMovie", this.movie);
      }
    }
  }
};
</script>
<style>
  .show-cursor {
    cursor: pointer;
  }
</style>
