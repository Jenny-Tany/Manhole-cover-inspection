import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
const token = localStorage.getItem("token");
const request = axios.create({
  baseURL: "/api",
  timeout: 2000,
});

request.interceptors.request.use(
  (config) => {
    NProgress.start();
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response.data;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  }
);

export default request;
