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

## Global Configuration Options

Detailed explanations of the options are available in sections [StagePlaySpotlight](./stage-play-spotlight.md) and [StagePlayScene](./stage-play-scene.md).

| Prop                    | Type                                                  |
| ----------------------- | ----------------------------------------------------- |
| spotlightPadding        | `number`                                              |
| spotlightBorderRadius   | `number`                                              |
| spotlightDarkZoneColor  | `string`                                              |
| allowInteract           | `boolean`                                             |
| allowLeave              | `boolean`                                             |
| cameraFollow            | `boolean`                                             |
| cameraFollowOptions     | `number`                                              |
| cameraFollowOffset      | `number`                                              |
| cameraFixAfterFollow    | `boolean`                                             |
| voiceOverAutoPlacement  | `boolean`                                             |
| voiceOverPlacement      | `string`                                              |
| voiceOverAlign          | `string`                                              |
| voiceOverWidth          | `number`                                              |
| voiceOverTitle          | `string`                                              |
| voiceOverContent        | `string`                                              |
| voiceOverPrevButtonText | `string`                                              |
| voiceOverNextButtonText | `string`                                              |
| voiceOverDoneButtonText | `string`                                              |
| onBeforeCut             | `(scopedProps: ScopedProps) => void \| Promise<void>` |
| onAfterCut              | `(scopedProps: ScopedProps) => void \| Promise<void>` |
| onActivated             | `(scopedProps: ScopedProps) => void \| Promise<void>` |
| onDeactivated           | `(scopedProps: ScopedProps) => void \| Promise<void>` |