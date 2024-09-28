/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/main.css";

// Pinia
import { createPinia } from "pinia";

const app = createApp(App);

registerPlugins(app);
app.use(ElementPlus);
app.use(createPinia()); // 使用 Pinia
app.mount("#app");
