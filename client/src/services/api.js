import axios from "axios";

import { logout } from "../store/ducks/auth";
import { store } from "../store/store";

const api = axios.create({
  baseURL: "http://localhost:3333",
  withCredentials: true
});

export function setDefaultAuthHeader(token) {
  api.defaults.headers.common["x-auth-token"] = token;
}

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        store.dispatch(logout());
      }
    }

    return Promise.reject(error);
  }
);

export default api;
