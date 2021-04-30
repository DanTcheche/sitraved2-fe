import axios from "axios";
import settings from "./settings";

axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: settings.SITRADEV_API_URL,
  headers: { "Content-Type": "application/json" }
});
