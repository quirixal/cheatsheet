import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import "./assets/style/app.scss";
import config from "./config.json";

const pinia = createPinia();
const app = createApp(App);
app.provide("config", config);

app.use(pinia);
app.mount("#app");
