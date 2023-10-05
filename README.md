<br>
<br>

<p align="center" style="margin-bottom: 0px">
<img height="100" src="./doc/public/logo.svg" alt="Vue Surf">
</p>

<h1 align="center" style="border: 0px">Vue Stage Play</h1>

<p align="center">
Designing a guided tour for your website with vue components, much like directing a stage play.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vue-stage-play"><img src="https://img.shields.io/npm/v/vue-stage-play.svg?style=flat&colorA=18181B&colorB=28CF8D" alt="Version"></a>
  <a href="https://github.com/f820602h/vue-stage-play/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/vue-stage-play.svg" alt="License"></a>
</p>

<p align="center">
  <a href="https://f820602h.github.io/vue-stage-play/">Documentation</a>
</p>

## What is VueStagePlay?

VueStagePlay is a component-based package designed to assist you in implementing step-by-step guided tour function within your application.

For developers using Vue, VueStagePlay makes developing such features much smoother. Simply import the component, pass in the props, and you're good to go.

>The inspiration for VueStagePlay comes from [intro.js](https://introjs.com/) and [vue-starport](https://github.com/antfu/vue-starport).

## Features

- 💚 Develop more naturally and seamlessly within your Vue application.
- 🛠️ Simplify the customization of your guided tour and tooltip using slots and props.
- 🎯 Focused on your SFC component, no need for additional configuration.
- 🗞️ No need to import additional CSS files.

## Installation

```
$ npm install vue-stage-play
```

## Usage

Import `<StagePlaySpotlight>` in your root component and wrap it around the outermost layer.

```html
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

```html
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
</template>
```

## Documentation

Refer to the [documentation](https://f820602h.github.io/vue-stage-play/) for more detailed information.

## License

[MIT](./LICENSE) License © 2023 [max.lee](https://github.com/f820602)