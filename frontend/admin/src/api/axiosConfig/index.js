import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5000",
});

console.log(`Auth token from axiosConfig ${localStorage.getItem('tokenize')}`);
instance.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("tokenize")}`;

export default instance;
