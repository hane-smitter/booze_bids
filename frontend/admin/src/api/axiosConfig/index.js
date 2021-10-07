import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.bidspesa.com:5000",
});

console.log(`Auth token from axiosConfig ${localStorage.getItem('tokenize')}`);
instance.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("tokenize")}`;

export default instance;
