import axios from "axios";
import config from "./config.json";

const ax = axios;
ax.defaults.headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer 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`,
};
ax.defaults.baseURL = "https://api.github.com/repos/patrickmaul";

export default ax;
