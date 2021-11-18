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
      await dispatch("getRecommendations", { sort: "new" });
    },
    async addRecommendation({ commit, dispatch }, params) {
      commit("setLoading", true);
      try {
        await axios.post("/recommendations/movies/", params);
        if (params.reloadPage) {
          await dispatch("init");
        }
        return { success: true };
      } catch (err) {
        return { success: false, message: "Unexpected server error." };
      } finally {
        commit("setLoading", false);
      }
    },
    async deleteRecommendation({ commit, dispatch, state }, params) {
      commit("setLoading", true);
      try {
        await axios.delete(`/recommendations/movies/${params.recommendation.id}`);
        commit("setMovieRecommendations", state.movieRecommendations.filter(movieRecommendation => movieRecommendation !== params.recommendation.id));
      } catch (err) {
        return { success: false, message: "Unexpected server error." };
      } finally {
        commit("setLoading", false);
      }
    },
    async addComment({ commit, dispatch, state }, params) {
      commit("setLoading", true);
      try {
        const response = await axios.post("/recommendations/comments/", params);
        if (params.reloadPage) {
          dispatch("init");
        }
        return { success: true, comment: response.data.movie_recommendation.comment };
      } catch (err) {
        return { success: false, message: "Unexpected server error." };
      } finally {
        commit("setLoading", false);
      }
    },
    async deleteComment({ commit, dispatch, state }, commentId) {
      commit("setLoading", true);
      try {
        await axios.delete(`/recommendations/comments/${commentId}/`);
        return { success: true };
      } catch (err) {
        return { success: false, message: "Unexpected server error." };
      } finally {
        commit("setLoading", false);
      }
    },
    async getRecommendations({ commit, state, dispatch }, filters) {
      commit("setLoading", true);
      try {
        if (filters.resetSearch) {
          dispatch("clear");
        }
        const response = await axios.get(`/recommendations/movies/?page=${state.nextPage}&sort=${filters.sort}`);
        let recommendations = [];
        if (!state.movieRecommendations) {
          recommendations = response.data.results;
        } else {
          recommendations = state.movieRecommendations.concat(response.data.results);
        }
        commit("setMovieRecommendations", recommendations);
        const nextPage = response.data.next ? response.data.next.split("=")[1] : null;
        commit("setNextPage", nextPage);
        return { success: true };
      } catch (err) {
        return { success: false, message: "Unexpected server error." };
      } finally {
        commit("setLoading", false);
      }
    },
    clear({ commit, state }) {
      commit("setMovieRecommendations", null);
      commit("setNextPage", 1);
      commit("setLoading", false);
    }
  }
};
