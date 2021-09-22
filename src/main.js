import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { projectAuth } from "./firebase/config";

import "@/assets/styles/main.css";
import './registerServiceWorker'

let app;

projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .mount("#app");
  }
});
