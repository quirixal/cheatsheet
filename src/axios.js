import axios from "axios";

const ax = axios;
ax.defaults.headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${atob(
        "Z2l0aHViX3BhdF8xMUFYSTVYSlkwVlpCa2xvR1JNWTVVX01kb2NIZXFMN3N0Y1J3VkhuWG9GeEVtUlFJTjd0ZlF5djNHdm5qRUJoaEtaNkVTWjY1Umc0dnFRbUpZ"
    )}`,
};
ax.defaults.baseURL = "https://api.github.com/repos/patrickmaul";

export default ax;
