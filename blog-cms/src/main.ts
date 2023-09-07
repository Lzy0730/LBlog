import { createApp } from "vue";
import { createPinia } from "pinia";

import "@/assets/css/base.css";

import App from "./App.vue";
import router from "./router";
import plugin from "./plugins";

const app = createApp(App);

app.use(createPinia());
app.use(plugin);
app.use(router);

app.mount("#app");
