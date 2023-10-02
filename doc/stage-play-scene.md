# StagePlayScene

The component used to configure each step in the guided tour. All the elements you wish to highlight in a single step must be placed within the slot of `<StagePlayScene>`.

``` vue{2,6,15}
<script setup lang="ts">
import { StagePlayScene } from 'vue-stage-play'
</script>

<template>
  <StagePlayScene actName="demo" :scene="1">
    <template #default>
      <div class="title">
        <!-- ... -->
      </div>
      <div class="content">
        <!-- ... -->
      </div>
    </template>
  </StagePlayScene>
</template>
```

:::tip
`<StagePlayScene>` will render an actual element. Hence, you may need to set the `margin` to it, rather than the highlighted elements.
:::

## Props

<script setup>
  const a = `{ behavior: "smooth", block: "start", inline: "nearest" }`
</script>

| Prop                    | Type                                                  | Default                                       |
| ----------------------- | ----------------------------------------------------- | --------------------------------------------- |
| actName                 | `string`                                              | Required                                      |
| scene                   | `number`                                              | Required                                      |
| tag                     | `string`                                              | `"div"`                                       |
| skip                    | `boolean`                                             | `false`                                       |
| allowInteract           | `boolean`                                             | `false`                                       |
| allowLeave              | `boolean`                                             | `true`                                        |
| cameraFollow            | `boolean`                                             | `true`                                        |
| cameraFollowOptions     | `number`                                              | `{{a}}`                                       |
| cameraFollowOffset      | `number`                                              | `24`                                          |
| cameraFixAfterFollow    | `boolean`                                             | `true`                                        |
| voiceOverAutoPlacement  | `boolean`                                             | `true`                                        |
| voiceOverPlacement      | `string`                                              | `"bottom"`                                    |
| voiceOverAlign          | `string`                                              | `"center"`                                    |
| voiceOverWidth          | `number`                                              | `300`                                         |
| voiceOverTitle          | `string`                                              | `"Hamlet Act 3 Scene 2"`                      |
| voiceOverContent        | `string`                                              | `"To be, or not to be; that's the question."` |
| voiceOverPrevButtonText | `string`                                              | `"Back"`                                      |
| voiceOverNextButtonText | `string`                                              | `"Next"`                                      |
| voiceOverDoneButtonText | `string`                                              | `"Done"`                                      |
| onBeforeCut             | `(scopedProps: ScopedProps) => void \| Promise<void>` | `() => {}`                                    |
| onAfterCut              | `(scopedProps: ScopedProps) => void \| Promise<void>` | `() => {}`                                    |
| onActivated             | `(scopedProps: ScopedProps) => void \| Promise<void>` | `() => {}`                                    |
| onDeactivated           | `(scopedProps: ScopedProps) => void \| Promise<void>` | `() => {}`                                    |

### `actName` <Badge type="warning" text="required" />

The string used to label the same set of guided tours.

### `scene` <Badge type="warning" text="required" />

The number used to indicate the order in the same set of guided tours. The `scene` for each StagePlayScene don't need to be continuous, but they will be arranged based on the numeric order.

### `tag`

StagePlayScene will render an actual element as the outermost layer of the highlighting block. You can use the `tag` to specify which HTML tag to render

### `skip`

Determines whether to skip this scene in the guided tour.

### `allowInteract`

Determines whether the highlighting block can be interacted with after the guided tour begins.

### `allowLeave`

Determines whether users can end the guided tour by clicking on the dark area of the spotlight.

### `cameraFollow`

Determines whether the highlighting block will automatically fit into the viewport after the guided tour begins.

### `cameraFollowOptions`

CameraFollow is implemented through [scrollIntoView](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView). You can adjust its options when called using cameraFollowOptions.

### `cameraFollowOffset`

Determines how many pixels the highlighting block should be spaced from the edge of the viewport when entering it.

### `cameraFixAfterFollow`

Determines whether the window can be scrolled after the highlighting block automatically enters the viewport. Effective only when `cameraFollow` is set to `true`.

### `voiceOverAutoPlacement`

Determines whether the tooltip will automatically adjust its position based on the visible viewport.

### `voiceOverPlacement`

Specifies where the tooltip should be positioned relative to the highlighting block. Accepts `top`, `bottom`, `right`, and `left`.

### `voiceOverAlign`

Specifies how the tooltip should align with the highlighting block. Accepts `start`, `end`, and `center`. `start` represents alignment to the top or left, depending on voiceOverPlacement. `center`, `end` follows the same logic.

### `voiceOverWidth`

The width of the tooltip in pixels.

### `voiceOverTitle`

The title of the tooltip.

### `voiceOverContent`

The content of the tooltip.

### `voiceOverPrevButtonText`

The text for the 'Next Scene' button in the tooltip.

### `voiceOverNextButtonText`

The text for the 'Previous Scene' button in the tooltip.

### `voiceOverDoneButtonText`

The text for the 'Done' button in the tooltip.

### `onBeforeCut`

A callback function that will be invoked before the guided tour ends. You can access the [scopedProps](#scopedprops) parameter in the callback function.

### `onAfterCut`

A callback function that will be invoked after the guided tour ends. You can access the [scopedProps](#scopedprops) parameter in the callback function.

### `onActivated`

A callback function that will be invoked when the scene gains highlight. You can access the [scopedProps](#scopedprops) parameter in the callback function.

### `onDeactivated`

A callback function that will be invoked when the scene loses highlight. You can access the [scopedProps](#scopedprops) parameter in the callback function.

## Slots

### `default`

The default slot. All elements inside the slot will be within the spotlight's scope. In the default slot, you can access slot props. ([see detail](#scopedprops)).

``` vue{3}
<template>
  <StagePlayScene actName="guide" :scene="1">
    <template #default="scopedProps">
        <!-- ... -->
    </template>
  </StagePlayScene>
</template>
```

### `voiceOver`

If you are not satisfied with the default tooltip, you can use this slot to replace the entire tooltip with your own component. `voiceOverPlacement` and `voiceOverAlign` will still take effect.

### `voHeader`

Slot for replacing the tooltip title.

### `voCloseIcon`

Slot for replacing the tooltip close icon.

### `voBody`

Slot for replacing the tooltip content.

### `voFooter`

Slot for replacing the tooltip footer.（ position of the page number ）

### `voFooterButton`

Slot for replacing the tooltip buttons.

## ScopedProps

| Property            | Type                                         |
| ------------------- | -------------------------------------------- |
| currentActName      | `string \| undefined`                        |
| currentActSceneList | `number[]`                                   |
| totalSceneCount     | `number`                                     |
| currentScene        | `number \| undefined`                        |
| currentSceneOrder   | `number`                                     |
| hasPrevScene        | `boolean`                                    |
| hasNextScene        | `boolean`                                    |
| isCurrentScene      | `boolean`                                    |
| action              | `(actName?: string, scene?: number) => void` |
| cut                 | `() => void`                                 |
| prevScene           | `() => void`                                 |
| nextScene           | `() => void`                                 |
| jumpToScene         | `(scene: number) => void`                    |

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

### `isCurrentScene`

The boolean value indicating whether it is the current scene.

### `hasPrevScene`

A boolean value indicating whether there is a previous scene in the current scene.

### `hasNextScene`

A boolean value indicating whether there is a next scene in the current scene.

### `action`

The function to start the guided tour. By default, it will start from the first scene of the act to which the current `<StagePlayScene>` belongs.

You can specify where to start by using the `actName` and `scene` parameters.

### `cut`

The function to stop the guided tour.

### `prevScene`

The function to go back to the previous scene in the current act. If there is no active act, the function may not have any effect.

### `prevScene`

The function to go to the next scene in the current act. If there is no active act, the function may not have any effect.

### `jumpToScene`

The function to navigate to a specific scene in the current act, please provide the scene number as an argument. If there is no active act, the function may not have any effect.