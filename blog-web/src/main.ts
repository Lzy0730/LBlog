import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import plugin from "./plugin";

// 自定义css
import "./assets/css/base.css";
// semantic-ui-css
import "semantic-ui-css/semantic.min.css";
//阿里icon
import "./assets/css/icon/iconfont.css";
// remixicon
import "@/assets/icon/remixicon.css"
import Icon from './components/content/icon.vue'
//typo.css
import "./assets/css/typo.css";

import './permission.ts'

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(plugin);
app.component('icon', Icon)

app.mount("#app");
