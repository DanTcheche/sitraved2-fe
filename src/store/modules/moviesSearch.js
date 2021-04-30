import axios from "@/axios.config";

export default {
  namespaced: true,
  state: () => ({
    movies: null,
    loading: false,
    selectedMovie: null
  }),
  getters: {
    movies: (state) => state.movies,
    loading: (state) => state.loading,
    selectedMovie: (state) => state.selectedMovie
  },
  mutations: {
    setMovies: (state, movies) => (state.movies = movies),
    setLoading: (state, loading) => (state.loading = loading),
    setSelectedMovie: (state, selectedMovie) => (state.selectedMovie = selectedMovie)
  },
  actions: {
    async search({ commit }, params) {
      commit("setLoading", true);
      try {
        const response = await axios.get(`/media/search/?title=${params.title}`);
        commit("setMovies", response.data.movies);
        return { success: true };
      } catch (err) {
        return { success: false, message: "Unexpected error." };
      } finally {
        commit("setLoading", false);
      }
    },
    clear({ commit }) {
      commit("setMovies", null);
      commit("setLoading", false);
    }
  }
};
