import axios from "axios";
import config from "./config.json";

const ax = axios;
ax.defaults.headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer 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`,
};
ax.defaults.baseURL = config.apiBaseUrl;

export default ax;
