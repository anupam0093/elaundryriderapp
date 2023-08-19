import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

// axiosInstance.interceptors.request.use(
//   (config: any) => {
//     const state = store.getState();
//     const token = state?.user?.token;
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error: any) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
