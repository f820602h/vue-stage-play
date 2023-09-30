<script setup>
import { ref } from 'vue'
import { StagePlaySpotlight } from '../src/components/StagePlaySpotlight.ts'
import { StagePlayScene } from '../src/components/StagePlayScene.ts'
import { useStagePlay } from "../src/composables/act.ts"

const { action } = useStagePlay()

</script>

# Basic Example

```vue
<script setup>
import { ref } from 'vue'
import { StagePlaySpotlight, StagePlayScene, useStagePlay } from 'vue-stage-play'

const { action } = useStagePlay()
</script>

<template>
  <StagePlaySpotlight>
    <button @click="action('basic')">Start</button>

    <StagePlayScene 
      :actName="'basic'"
      :scene="1"
      :voice-over-title="'step1'"
      :voice-over-content="'Open the door of the refrigerator.'" 
    >
      <h2>step1</h2>
    </StagePlayScene>

    <StagePlayScene 
      :actName="'basic'"
      :scene="2"
      :voice-over-title="'step2'"
      :voice-over-content="'Place the elephant inside the refrigerator.'" 
    >
      <h2>step2</h2>
    </StagePlayScene>

    <StagePlayScene 
      :actName="'basic'"
      :scene="3"
      :voice-over-title="'step3'"
      :voice-over-content="'Close the door of the refrigerator.'" 
    >
      <h2>step3</h2>
    </StagePlayScene>
  </StagePlaySpotlight>
</template>
```

## How to place an elephant into a refrigerator? 

<button class="btn" style="background: #34495e; color: white; border-radius: 4px; padding: 2px 12px" @click="action('basic')">Start</button>


<StagePlaySpotlight>
  <StagePlayScene :actName="'basic'" :scene="1" :voice-over-title="'step1'" :voice-over-content="'Open the door of the refrigerator.'" >

  ### step1

  </StagePlayScene>

  <StagePlayScene :actName="'basic'" :scene="2" :voice-over-title="'step2'" :voice-over-content="'Place the elephant inside the refrigerator.'" >

  ### step2

  </StagePlayScene>

  <StagePlayScene :actName="'basic'" :scene="3" :voice-over-title="'step3'" :voice-over-content="'Close the door of the refrigerator.'" >

  ### step3

  </StagePlayScene>
</StagePlaySpotlight>