import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import store from "./store/store";
import VueAwesomePaginate from 'vue-awesome-paginate';
import 'vue-awesome-paginate/dist/style.css';
const app = createApp(App);
app.use(store);
app.use(VueAwesomePaginate);
app.use(router);
app.mount("#app");
