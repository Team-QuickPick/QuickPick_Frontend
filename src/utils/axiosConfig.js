import axios from "axios";

const instance = axios.create({
  baseURL: "http://115.85.183.154/api/v1/",
});

export default instance;
