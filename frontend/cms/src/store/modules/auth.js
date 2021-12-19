import { removeValue, setValue } from "@/utils";
import { TOKEN } from "@/const";
import ApiService from "@/services/ApiService";

export const auth = {
  namespaced: true,
  state: {
    user: null,
    token: null,
  },
  actions: {
    async login({ commit, dispatch, state }, { email, password }) {
      const { data } = await ApiService.client.post("/login", {
        email,
        password,
      });
      commit("SET_TOKEN", data);
      setValue(TOKEN, data);
      ApiService.setToken(data);
      if (!state.user) await dispatch("getUser");
    },
    async logout({ commit }) {
      commit("SET_USER", null);
      commit("SET_TOKEN", null);
      await ApiService.client.post("/logout");
    },
    async getUser({ commit }) {
      const { data } = await ApiService.client.get("/user");
      commit("SET_USER", data);
    },
  },
  mutations: {
    SET_USER(state, data) {
      state.user = data;
    },
    SET_TOKEN(state, data) {
      if (!data) {
        removeValue(TOKEN);
      }
      state.token = data;
    },
  },
};
