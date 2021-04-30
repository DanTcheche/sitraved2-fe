import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import moviesSearch from "./modules/moviesSearch";
import movieRecommendations from "./modules/movieRecommendations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    initialized: false,
    showUserManagementDialog: false,
    showRecommendationDialog: false
  },
  getters: {
    initialized: (state) => state.initialized,
    showUserManagementDialog: (state) => state.showUserManagementDialog,
    showRecommendationDialog: (state) => state.showRecommendationDialog
  },
  mutations: {
    setInitialized: (state, initialized) => (state.initialized = initialized),
    setShowUserManagementDialog: (state, showUserManagementDialog) => (state.showUserManagementDialog = showUserManagementDialog),
    setShowRecommendationDialog: (state, showRecommendationDialog) => (state.showRecommendationDialog = showRecommendationDialog)
  },
  actions: {
    async init({ commit, dispatch }) {
      commit("setInitialized", false);
      await dispatch("user/init");
      await dispatch("movieRecommendations/init");
      commit("setInitialized", true);
    },
    toggleUserManagementDialog({ commit }, newState) {
      commit("setShowUserManagementDialog", newState);
    },
    toggleRecommendationDialog({ commit }, newState) {
      commit("setShowRecommendationDialog", newState);
    }
  },
  modules: {
    user: user,
    moviesSearch: moviesSearch,
    movieRecommendations: movieRecommendations
  }
});
