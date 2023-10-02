# StagePlaySpotlight

The primary component used to highlight elements in a guided tour. Each `<StagePlayScene>` should be used within `<StagePlaySpotlight>`.

It's recommended to use it directly in the root component.

``` vue{2,6,10}
<script setup lang="ts">
import { StagePlaySpotlight } from 'vue-stage-play'
</script>

<template>
  <StagePlaySpotlight>
    <div class="root">
      <!-- ... -->
    </div>
  </StagePlaySpotlight>
</template>
```

## Props

| Prop                   | Type     | Default                  |
| ---------------------- | -------- | ------------------------ |
| spotlightPadding       | `number` | `10`                     |
| spotlightBorderRadius  | `number` | `10`                     |
| spotlightDarkZoneColor | `string` | `"rgba(66, 66, 66, .5)"` |

### `spotlightPadding`
Spacing between the spotlight and the highlighted element.

### `spotlightBorderRadius`
Border radius of the spotlight.

### `spotlightDarkZoneColor`
Color of the area not highlighted.

## Slots

### `default`

The default slot, each `<StagePlayScene>` should be used within it.