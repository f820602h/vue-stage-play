<script setup lang="ts">
import HomePage from "./components/HomePage.vue";
import { VueTrailerSpotlight } from "../../src/index";
</script>

<template>
  <VueTrailerSpotlight>
    <div>
      <HomePage></HomePage>
    </div>
  </VueTrailerSpotlight>
</template>

<style lang="scss">
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: #292929;
  background-color: #fcfcfc;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}

#app {
  width: 100vw;
  min-height: 100vh;
}
</style>
