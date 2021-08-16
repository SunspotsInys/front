import { createApp } from 'vue'
import App from './App.vue'
import router from "./routes"
import store from "./store"



import "./style.scss"
import "vditor/src/assets/scss/index.scss";

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
