import { createApp } from "vue";
import { StagePlayPlugin } from "../../src/index";

import App from "./App.vue";
const app = createApp(App);
app.use(StagePlayPlugin());

app.mount("#app");
