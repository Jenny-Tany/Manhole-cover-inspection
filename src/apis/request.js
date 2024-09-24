import axios from "axios"; // 引入 axios
import NProgress from "nprogress"; // 引入 nprogress
import "nprogress/nprogress.css"; // 引入 nprogress 样式

// 创建 axios 实例
const request = axios.create({
  baseURL: "/api", // 设置基础 URL
  timeout: 2000, // 设置请求超时时间
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    NProgress.start(); // 请求发起时开始加载进度条
    return config; // 返回配置
  },
  (error) => {
    NProgress.done(); // 请求错误时结束进度条
    return Promise.reject(error); // 返回错误
  }
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    NProgress.done(); // 响应成功时结束进度条
    return response.data; // 返回响应
  },
  (error) => {
    NProgress.done(); // 响应错误时结束进度条
    return Promise.reject(error); // 返回错误
  }
);

export default request; // 导出 axios 实例
