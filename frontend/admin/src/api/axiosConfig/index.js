import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
});

instance.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("tokenize")}`;
console.log("Running?");

export default instance;
