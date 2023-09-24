<script setup lang="ts">
// import { watch } from "vue";
// import { useElementBounding } from "@vueuse/core";
// const { x, y, width, height } = useElementBounding(currentActor);
import { useScript } from "../composables";

const { currentScene } = useScript();

defineProps({
  disabled: {
    default: false,
    type: Boolean,
  },

  stepName: {
    default: "",
    type: String,
  },
  padding: {
    default: 8,
    type: Number,
  },
  borderRadius: {
    default: 8,
    type: Number,
  },
});
</script>

<template>
  <Teleport :to="currentScene?.actor || 'body'">
    <div id="spot-light" :class="{ hidden: !currentScene?.actor }"></div>
  </Teleport>

  <!-- <svg
      v-if="width"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
    >
      <defs>
        <mask id="light">
          <rect x="0" y="0" width="100vw" height="100vh" fill="white" />
          <rect
            :rx="borderRadius"
            :x="x - padding"
            :y="y - padding"
            :width="width + padding * 2"
            :height="height + padding * 2"
            fill="black"
          />
        </mask>
      </defs>

      <rect
        class="introvuection__spot-light"
        x="0"
        y="0"
        width="100vw"
        height="100vh"
        fill="rgba(0,0,0,0.5)"
        mask="url(#light)"
      />
    </svg> -->
</template>

<style scoped lang="scss">
// $z-index: 9527;

// .introvuection__stage {
//   position: fixed;
//   inset: 0;
//   z-index: $z-index;
//   width: 100vw;
//   height: 100%;
// }

#spot-light {
  position: absolute;
  inset: -10px;
  border-radius: 10px;
  box-shadow: rgba(33, 33, 33, 0.5) 0px 0px 0px 5000px;
  pointer-events: none;

  &.hidden {
    display: none;
  }

  :deep(#actor__tip) {
    pointer-events: auto;
  }
}
</style>
