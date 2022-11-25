import axios from "axios";

const ax = axios;
ax.defaults.headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer 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`
}

export default ax;
