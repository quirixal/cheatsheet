import axios from "axios";
import config from "../config.json";

const http = axios.create({
  baseURL: `https://raw.githubusercontent.com/PatrickMaul/cheatsheet/${config.branch}`
});

export default http;
