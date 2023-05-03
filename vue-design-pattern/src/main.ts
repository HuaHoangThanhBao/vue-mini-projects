import { createApp } from "vue";
import mitt from 'mitt'
import App from "./App.vue";
import router from "./router";
// import store from "./store/vuex/index";
import { createPinia } from "pinia";
// import "./assets/main.css";

const emitter = mitt()
const app = createApp(App);
const pinia = createPinia();

app.config.globalProperties.emitter = emitter
app.use(router);
app.use(pinia);
// app.use(store);
app.mount("#app");