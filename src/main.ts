import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import { vuetify, http } from "./plugins";
import "./assets/style/app.scss";

const app = createApp(App);

app.use(createPinia());
app.use(vuetify);

app.provide("http", http);

app.mount("#app");
