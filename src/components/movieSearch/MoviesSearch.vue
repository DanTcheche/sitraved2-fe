<template>
  <v-card class="px-4">
    <v-card-title class="headline">
      <h5>Search for a movie</h5>
    </v-card-title>
    <v-card-text>
      <v-text-field :disabled="loading" v-model="title" label="Film title" @keyup.enter="search" />
    </v-card-text>
    <v-row v-if="loading">
      <v-col v-for="x in [1, 2, 3]" :key="x" :cols="4">
        <v-skeleton-loader type="card" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col v-for="movie in movies" :key="movie.id" :cols="4">
        <movie-card :movie="movie"/>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import MovieCard from "@/components/common/MovieCard";

export default {
  name: "MoviesSearch",
  components: { MovieCard },
  data() {
    return {
      title: null
    };
  },
  computed: {
    ...mapGetters("moviesSearch", ["movies", "loading"])
  },
  methods: {
    async search() {
      await this.$store.dispatch("moviesSearch/search", { title: this.title });
      return true;
    }
  }
};
</script>

<style scoped>

</style>
