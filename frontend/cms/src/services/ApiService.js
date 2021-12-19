import axios from "axios";
import { BASE_API_URL, BASE_URL } from "@/const.js";

const tokens = {};
const CancelToken = axios.CancelToken;

export default new (class ApiService {
  constructor() {
    this.client = null;
  }

  async initClient(errorFunction) {
    this.client = axios.create({
      baseURL: `${BASE_API_URL}`,
      withCredentials: true,
      headers: {
        Accept: "application/json",
      },
    });
    await this.setErrorInterceptors(errorFunction);
    //await this.getCSRFCookie();
  }
  async getCSRFCookie() {
    await this.client.get(`${BASE_URL}/sanctum/csrf-cookie`);
  }
  setToken(token) {
    this.client.defaults.headers = {
      ...this.client.defaults.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  setErrorInterceptors(errorFunction) {
    this.client.interceptors.response.use(
      (config) => {
        try {
          if (!tokens[config.url]) {
            const source = CancelToken.source();

            config.cancelToken = source.token;
            tokens[config.url] = source;
          } else {
            const source = CancelToken.source();

            tokens[config.url].cancel();

            tokens[config.url] = source;
            config.cancelToken = source.token;
          }
        } catch (e) {
          console.log(e);
        }

        return config;
      },
      (error) => {
        if (error.response && error.response.status !== 500) {
          errorFunction(error);
        }
        return Promise.reject(error.response);
      }
    );
  }
})();
