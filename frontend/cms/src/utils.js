import { PKG_NAME } from "@/const";
import ApiService from "@/services/ApiService";
import Vue from "vue";
import merge from "lodash/fp/merge";

export function capitalize(str) {
  function upperToHyphenLower(match) {
    return "" + match[1].toUpperCase();
  }
  const regStr = str.replace(/-\w/, upperToHyphenLower);
  return regStr.charAt(0).toUpperCase() + regStr.slice(1);
}
export function lowercase(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}
export const getValue = (key) => {
  const value = localStorage.getItem(`${PKG_NAME}:${key}`);
  return value ? JSON.parse(atob(value)) : value;
};
export const removeValue = (key) => {
  return localStorage.removeItem(`${PKG_NAME}:${key}`);
};
export const setValue = (key, value) => {
  const val = btoa(JSON.stringify(value));
  localStorage.setItem(`${PKG_NAME}:${key}`, val);
};

export const createVuexCRUDModule = (ns, options) => {
  const route = options?.url || ns;
  const module = {
    namespaced: true,
    state: {
      pagination: null,
      params: {},
      options: {},
    },
    actions: {
      async getEntities({ commit, state }) {
        const params = {};
        if (state.params) {
          for (const [key, value] of Object.entries(state.options)) {
            if (value && value.length) {
              params[key] = Array.isArray(value) ? value.join(",") : value;
            }
          }
        }
        const { data } = await ApiService.client.get(`/${route}`, {
          params: {
            ...params,
            per_page: state.options.itemsPerPage,
            page: state.options.page,
          },
        });
        commit("SET_PAGINATION", data);
      },
      async getEntity(_, id) {
        const { data } = await ApiService.client.get(`/${route}/${id}`);
        return data;
      },
      createEntity(_, entity) {
        return ApiService.client.post(route, entity);
      },
      deleteEntity(_, id) {
        return ApiService.client.delete(`${route}/${id}`);
      },
      async deleteEntities({ dispatch }, ids) {
        await ApiService.client.post(`destroy/${route}`, ids);
        await dispatch("getEntities");
      },
      async updateEntity(_, entity) {
        const { data } = await ApiService.client.put(
          `${route}/${entity.id}`,
          entity
        );
        return data;
      },
      async nomenclature(_, params) {
        const { data } = await ApiService.client.get(`nomenclature/${route}`, {
          params,
        });
        return data;
      },
      setTableOptions({ commit }, payload) {
        commit("SET_TABLE_OPTIONS", payload);
      },
      setParam({ commit }, payload) {
        commit("SET_PARAMS", payload);
      },
    },
    mutations: {
      SET_PAGINATION(state, payload) {
        state.pagination = payload;
      },
      SET_TABLE_OPTIONS(state, payload) {
        Vue.set(state, "options", payload);
      },
      SET_PARAMS(state, payload) {
        if (Array.isArray(payload.value) && payload.value.length === 0) {
          Vue.delete(state.params, [payload.key]);
        } else if (payload.value === null) {
          Vue.delete(state.params, [payload.key]);
        } else {
          Vue.set(state.params, payload, {
            ...state.params,
            [payload.key]: payload.value,
          });
        }
      },
    },
    getters: {},
  };
  return merge(module)(options);
};
