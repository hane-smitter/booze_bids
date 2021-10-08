import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.bidspesa.com:5000",
});

instance.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("tokenize")}`;
console.log("Running?");

export default instance;
