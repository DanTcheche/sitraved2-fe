import axios from "@/axios.config";

export default {
  namespaced: true,
  state: () => ({
    user: null,
    token: null,
    refreshToken: null,
    loading: false
  }),
  getters: {
    user: (state) => state.user
  },
  mutations: {
    setUser: (state, user) => (state.user = user),
    setToken: (state, token) => (state.token = token),
    setRefreshToken: (state, token) => (state.refreshToken = token),
    setLoading: (state, loading) => (state.loading = loading)
  },
  actions: {
    async init({ state, dispatch }) {
      await dispatch("refreshAccessToken");
      dispatch("initializeAxiosInterceptors");
      if (state.token) {
        await dispatch("loadCurrentUser");
      }
    },
    async login({ commit, dispatch }, params) {
      commit("setLoading", true);
      try {
        const response = await axios.post(
          "/users/login/",
          JSON.stringify(params)
        );
        if (response.data.success) {
          commit("setRefreshToken", response.data.refresh_token);
          commit("setToken", response.data.access_token);
          commit("setUser", response.data.user);
          dispatch("initializeAxiosInterceptors");
        }
        return { success: response.data.success };
      } catch (err) {
        const response = err.response;
        if (response && response.status === 400) {
          return { success: false, message: response.data.non_field_errors[0] };
        } else {
          return { success: false, message: "Unexpected error." };
        }
      } finally {
        commit("setLoading", false);
      }
    },
    async signUp({ commit, dispatch }, params) {
      commit("setLoading", true);
      try {
        const response = await axios.post(
          "/users/register/",
          JSON.stringify(params)
        );
        if (response.data.success) {
          commit("setRefreshToken", response.data.refresh_token);
          commit("setToken", response.data.access_token);
          commit("setUser", response.data.user);
          dispatch("initializeAxiosInterceptors");
        }
        return { success: response.data.success };
      } catch (err) {
        const response = err.response;
        if (response.status === 400) {
          return { success: false, message: response.data.message };
        } else {
          return { success: false, message: "Unexpected error." };
        }
      } finally {
        commit("setLoading", false);
      }
    },
    async refreshAccessToken({ commit, state }) {
      try {
        // The token is sent in a cookie and in the body, to handle browsers where third party cookies
        // are not supported.
        const response = await axios.post("/jwt/refresh/", {
          refresh: state.refreshToken
        });
        commit("setToken", response.data.access);
      } catch (err) {
        commit("setToken", null);
        commit("setUser", null);
      }
    },
    async loadCurrentUser({ commit }) {
      const response = await axios.get("/users/current/");
      if (response.status === 200) {
        commit("setUser", response.data.user);
      } else {
        commit("setUser", null);
      }
    },
    async logout({ commit }) {
      await axios.post("/users/logout/", {});
      commit("setToken", null);
      commit("setUser", null);
      // Clear the Authorization header
      axios.interceptors.request.use(
        (config) => {
          config.headers.Authorization = "";
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    },
    initializeAxiosInterceptors({ dispatch, state }) {
      axios.interceptors.request.use(
        (config) => {
          if (state.token) {
            config.headers.Authorization = `Bearer ${state.token}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      axios.interceptors.response.use(
        (response) => {
          return response;
        },
        async(error) => {
          const originalRequest = error.config;
          if (
            state.user && state.user.token &&
                        error.response.status === 401 &&
                        error.response.data.code === "token_not_valid" &&
                        !originalRequest._retry
          ) {
            originalRequest._retry = true;
            await dispatch("refreshAccessToken");
            originalRequest.headers.Authorization = `Bearer ${state.token}`;
            return axios.request(originalRequest);
          }
          return Promise.reject(error);
        }
      );
    }
  }
};
