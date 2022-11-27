import { createApp } from "vue";
import App from "./App.vue";

import "./assets/style/app.scss";
import config from "./config.json";

const app = createApp(App);
app.provide("config", config);

app.mount("#app");
