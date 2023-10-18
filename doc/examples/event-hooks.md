<script setup>
import { ref } from 'vue'
import { StagePlaySpotlight, StagePlayScene, useStagePlay } from '../../src/index.ts'

const { action } = useStagePlay()

const consoleText = ref("log....")

function eventHandler(hookName) {
  return ({ currentActName, currentScene}) => {
    consoleText.value = `[${hookName}] Act: ${currentActName}; Scene: ${currentScene}\n` + consoleText.value;
  }
}
</script>

# Event Hooks

This example demonstrates how to bind events. VueStagePlay provides events for four stages; detailed information can be found in the [StagePlayScene](/stage-play-scene.html#onbeforecut) section.

```vue
<script setup>
import { ref } from 'vue'
import { StagePlaySpotlight, StagePlayScene, useStagePlay } from 'vue-stage-play'

const { action } = useStagePlay()
const consoleText = ref("log....")

function eventHandler(hookName) {
  return ({ currentActName, currentScene}) => {
    consoleText.value = `[${hookName}] Act: ${currentActName}; Scene: ${currentScene}\n` + consoleText.value;
  }
}
</script>

<template>
  <StagePlaySpotlight>
    <h2>How to place an elephant into a refrigerator?</h2>
    <button @click="action('event')">Start</button>

    <StagePlayScene 
      :act-name="'event'"
      :scene="1"
      :voice-over-title="'Step1'"
      :voice-over-content="'Open the door of the refrigerator.'"
      :on-before-cut="eventHandler('Before Cut')"
      :on-after-cut="eventHandler('After Cut')"
      :on-activated="eventHandler('Activated')"
      :on-deactivated="eventHandler('Deactivated')"
    >
      <h3>Step1</h3>
    </StagePlayScene>

     <!-- ... Omitted -->

  </StagePlaySpotlight>
</template>
```

## How to place an elephant into a refrigerator? 

<button class="btn" style="background: #34495e; color: white; border-radius: 4px; padding: 2px 12px" @click="action('event')">Start</button>


<StagePlaySpotlight>
  <StagePlayScene :act-name="'event'" :scene="1" :voice-over-title="'Step1'" :voice-over-content="'Open the door of the refrigerator.'" :on-before-cut="eventHandler('Before Cut')" :on-after-cut="eventHandler('After Cut')" :on-activated="eventHandler('Activated')" :on-deactivated="eventHandler('Deactivated')" >

  ### Step1

  </StagePlayScene>

  <StagePlayScene :act-name="'event'" :scene="2" :voice-over-title="'Step2'" :voice-over-content="'Place the elephant inside the refrigerator.'" :on-before-cut="eventHandler('Before Cut')" :on-after-cut="eventHandler('After Cut')" :on-activated="eventHandler('Activated')" :on-deactivated="eventHandler('Deactivated')" >

  ### Step2

  </StagePlayScene>

  <StagePlayScene :act-name="'event'" :scene="3" :voice-over-title="'Step3'" :voice-over-content="'Close the door of the refrigerator.'" :on-before-cut="eventHandler('Before Cut')" :on-after-cut="eventHandler('After Cut')" :on-activated="eventHandler('Activated')" :on-deactivated="eventHandler('Deactivated')" >

  ### Step3

  </StagePlayScene>

  <textarea style="width: 100%; height: 200px; margin-top: 30px; padding: 10px; border: 1px solid #000; resize: none;; border-radius: 8px;" readonly v-model="consoleText" />
</StagePlaySpotlight>