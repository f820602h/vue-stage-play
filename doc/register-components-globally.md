# Register Components Globally

You can also use the plugin provided by VueStagePlay for global component registration. This allows you to use `<StagePlaySpotlight>` and `<StagePlayScene>` without importing.

``` js{6}
import App from "./App.vue";
import { createApp } from "vue";
import { stagePlayPlugin } from "vue-stage-play";

const app = createApp(App);
app.use(stagePlayPlugin());

app.mount("#app");
```

## Global Configuration

When you use the plugin to register components, you have the option to configure global parameters.

``` js{2-4}
app.use(stagePlayPlugin({
  spotlightPadding: 20,
  cameraFollow: false,
  cameraFixAfterFollow: false,
  //....
}));
```

Global configuration can affect all `<StagePlaySpotlight>` and `<StagePlayScene>` within your application. However, directly passing props to the components will still override them.
