import axios from "axios";

const baseURL = "https://api.jikan.moe/v4/";

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    return new Promise((resolve, reject) => {
      reject(error);
      throw error;
    });
  }
);
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

export default api;
