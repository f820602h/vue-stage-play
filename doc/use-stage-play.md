# useStagePlay

`useStagePlay` is a Composable that allows you to access relevant values and methods outside of the `<StagePlayScene>`. This is useful for interacting with the guided tour from other components or logic in your Vue application.

``` vue
<script setup lang="ts">
import { useStagePlay } from "vue-stage-play"
const { action } = useStagePlay()

action("onBoarding")
</script>
```

## Returns 

| Property            | Type                                            |
| ------------------- | ----------------------------------------------- |
| acts                | `Record<string, Ref<HTMLElement \| null>[]>`    |
| currentActName      | `Ref<string>`                                   |
| currentActSceneList | `ComputedRef<number[]>`                         |
| totalSceneCount     | `ComputedRef<number>`                           |
| currentScene        | `Ref<number>`                                   |
| currentSceneOrder   | `ComputedRef<number>`                           |
| currentActor        | `ComputedRef<HTMLElement \| null \| undefined>` |
| hasPrevScene        | `ComputedRef<boolean>`                          |
| hasNextScene        | `ComputedRef<boolean>`                          |
| action              | `(actName: string, scene?: number) => void`     |
| cut                 | `() => void`                                    |
| prevScene           | `() => void`                                    |
| nextScene           | `() => void`                                    |
| jumpToScene         | `(scene: number) => void`                       |

### `acts`

All the registered acts and their corresponding scenes.

<div class="tip custom-block" style="padding-top: 8px">

The acts and scenes belonging to `<StagePlayScene>` that have not undergone initial mounting will remain undisclosed.

</div>

### `currentActName`

The name of the act currently in progress.

### `currentActSceneList`

The scene list of the act currently in progress.

### `totalSceneCount`

The total number of scenes in the current act.

### `currentScene`

The number of the scene currently in progress.

### `currentSceneOrder`

The order of the scene currently in progress.

### `currentActor`

The template ref of highlighting `<StagePlayScene>`.

### `hasPrevScene`

A boolean value indicating whether there is a previous scene in the current scene.

### `hasNextScene`

A boolean value indicating whether there is a next scene in the current scene.

### `action`

The function to start the guided tour. By default, it will start from the first scene of the act you specify.

<div class="tip custom-block" style="padding-top: 8px">

In contrast to the [action](./stage-play-scene.md#action) in the `ScopedProps` of `<StagePlayScene>`, you must specify the act you wish to start through the `actName` parameter.

</div>

### `cut`

The function to stop the guided tour.

<div class="tip custom-block" style="padding-top: 8px">

Invoking this method to stop the guided tour will not trigger the `onBeforeCut` and `onAfterCut` events within `<StagePlayScene>`.

</div>

### `prevScene`

The function to go back to the previous scene in the current act. If there is no active act, the function may not have any effect.

### `prevScene`

The function to go to the next scene in the current act. If there is no active act, the function may not have any effect.

### `jumpToScene`

The function to navigate to a specific scene in the current act, please provide the scene number as an argument. If there is no active act, the function may not have any effect.