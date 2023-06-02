import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import "./assets/style/app.scss";
import config from "./config.json";
import { $http, $markdown } from "./plugins";

const pinia = createPinia();
const app = createApp(App);

app.provide("config", config);
app.provide("$http", $http);
app.provide("$markdown", $markdown);

app.use(pinia);
app.mount("#app");
