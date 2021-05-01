import axios from "@/axios.config";

export default {
  namespaced: true,
  state: () => ({
    movieRecommendations: null,
    loading: false,
    nextPage: 1
  }),
  getters: {
    movieRecommendations: (state) => state.movieRecommendations,
    loading: (state) => state.loading,
    nextPage: (state) => state.nextPage
  },
  mutations: {
    setMovieRecommendations: (state, movies) => (state.movieRecommendations = movies),
    setLoading: (state, loading) => (state.loading = loading),
    setNextPage: (state, nextPage) => (state.nextPage = nextPage)
  },
  actions: {
    async init({ commit, dispatch }) {
      commit("setNextPage", 1);
      commit("setMovieRecommendations", null);
      await dispatch("getRecommendations", true);
    },
    async addRecommendation({ commit, dispatch }, params) {
      commit("setLoading", true);
      try {
        await axios.post("/recommendations/movies/", params);
        dispatch("init");
        return { success: true };
      } catch (err) {
        return { success: false, message: "Unexpected server error." };
      } finally {
        commit("setLoading", false);
      }
    },
    async addComment({ commit, dispatch }, params) {
      commit("setLoading", true);
      try {
        await axios.post("/recommendations/comments/", params);
        dispatch("init");
        return { success: true };
      } catch (err) {
        return { success: false, message: "Unexpected server error." };
      } finally {
        commit("setLoading", false);
      }
    },
    async getRecommendations({ commit, state }) {
      commit("setLoading", true);
      try {
        const response = await axios.get(`/recommendations/movies/?page=${state.nextPage}`);
        let recommendations = [];
        if (!state.movieRecommendations) {
          recommendations = response.data.results;
        } else {
          recommendations = state.movieRecommendations.concat(response.data.results);
        }
        commit("setMovieRecommendations", recommendations);
        console.log("next page");
        console.log(state.nextPage);
        const nextPage = response.data.next ? response.data.next.split("=")[1] : null;
        console.log(nextPage);
        commit("setNextPage", nextPage);
        return { success: true };
      } catch (err) {
        return { success: false, message: "Unexpected server error." };
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
