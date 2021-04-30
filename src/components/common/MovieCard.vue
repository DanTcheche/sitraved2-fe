<template>
  <v-hover>
    <template #default="{ hover }">
      <v-card id="movie-card" box-shadow="none">
        <div>
          <v-img
            height="240"
            width="100%"
            :src="`${movie.poster_url}?d=200x`"
          >
          </v-img>
          <v-fade-transition>
            <v-overlay v-show="hover" absolute opacity="0.75" class="align-end">
              <v-btn
                class="mx-2"
                fab
                dark
                color="primary"
                @click="addRecommendation"
              >
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </div>
        <v-card-title>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
          <div class="movie-title"
               v-bind="attrs"
               v-on="on"
          >
            {{ movie.title }}
          </div>
            </template>
            <span>{{ movie.title }}</span>
          </v-tooltip>
        </v-card-title>

        <v-card-subtitle>
          <p class="movie-card__year">
            {{ movie.year }}
          </p>
          <p v-if="movie.director" class="movie-card__director">
            {{ movie.director }}
          </p>
        </v-card-subtitle>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  name: "MovieCard",
  props: {
    movie: Object
  },
  methods: {
    addRecommendation() {
      return null;
    }
  }
};
</script>

<style scoped>
  .movie-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
