<script setup>
import { StagePlaySpotlight, StagePlayScene } from "../src/index.ts";
</script>


# Getting Started
<StagePlaySpotlight>

## What is VueStagePlay?

VueStagePlay is a component-based package designed to assist you in implementing step-by-step guided tour function within your application.

For developers using Vue, VueStagePlay makes developing such features much smoother. Simply import the component, pass in the props, and you're good to go.

<div class="tip custom-block" style="padding-top: 8px">

The inspiration for VueStagePlay comes from [intro.js](https://introjs.com/) and [vue-starport](https://github.com/antfu/vue-starport).

</div>


## Installation

```sh [npm]
$ npm install vue-stage-play
```

## Usage

Import `<StagePlaySpotlight>` in your root component and wrap it around the outermost layer.

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

Next, import `<StagePlayScene>` where you want to highlight elements and wrap the elements.

Set the `actName` and `scene` for `<StagePlayScene>`, and call the `action` function from the slot props.

``` vue{2,6,14,18,20-25}
<script setup lang="ts">
import { StagePlayScene } from 'vue-stage-play'
</script>

<template>
  <StagePlayScene :act-name="'liveDemo'" :scene="1">
    <template #default="slotProp">
      <div class="title">
        <!-- ... -->
      </div>
      <div class="content">
        <!-- ... -->
      </div>
      <button @click="slotProp.action()">
        Live Demo
      </button>
    </template>
  </StagePlayScene>

  <StagePlayScene
    :act-name="'liveDemo'"
    :scene="2"
    :voice-over-title="'Only Vice Over'"
    :voice-over-content="'You have the option not to highlight any elements.'"
  />
</template>
```

<StagePlayScene :act-name="'demo'" :scene="1">
<template #default="slotProp">

<button class="btn" style="background: #34495e; color: white; border-radius: 4px; padding: 2px 12px" @click="slotProp.action()">Live Demo</button>

</template>
</StagePlayScene>

<StagePlayScene :act-name="'demo'" :scene="2" :voice-over-title="'Only Vice Over'" :voice-over-content="'You have the option not to highlight any elements.'" />

</StagePlaySpotlight>