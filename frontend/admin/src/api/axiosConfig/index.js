import axios from "axios";
import { AuthService } from "../AuthService";

const instance = axios.create({});


instance.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.baseURL = axios.defaults.baseURL
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
