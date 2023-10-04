<script setup>
import { ref } from 'vue'
import { StagePlaySpotlight, StagePlayScene, useStagePlay } from '../../src/index.ts'

const { action } = useStagePlay()

</script>

# Basic Example

This example demonstrates a guided tour, covering 「Activation with useStagePlay」 and 「Changing tooltip content using props」.

```vue
<script setup>
import { ref } from 'vue'
import { StagePlaySpotlight, StagePlayScene, useStagePlay } from 'vue-stage-play'

const { action } = useStagePlay()
</script>

<template>
  <StagePlaySpotlight>
    <h2>How to place an elephant into a refrigerator?</h2>
    <button @click="action('basic')">Start</button>

    <StagePlayScene 
      :actName="'basic'"
      :scene="1"
      :voice-over-title="'Step1'"
      :voice-over-content="'Open the door of the refrigerator.'" 
    >
      <h3>Step1</h3>
    </StagePlayScene>

    <StagePlayScene 
      :actName="'basic'"
      :scene="2"
      :voice-over-title="'Step2'"
      :voice-over-content="'Place the elephant inside the refrigerator.'" 
    >
      <h3>Step2</h3>
    </StagePlayScene>

    <StagePlayScene 
      :actName="'basic'"
      :scene="3"
      :voice-over-title="'Step3'"
      :voice-over-content="'Close the door of the refrigerator.'" 
    >
      <h3>Step3</h3>
    </StagePlayScene>
  </StagePlaySpotlight>
</template>
```

## How to place an elephant into a refrigerator? 

<button class="btn" style="background: #34495e; color: white; border-radius: 4px; padding: 2px 12px" @click="action('basic')">Start</button>


<StagePlaySpotlight>
  <StagePlayScene :actName="'basic'" :scene="1" :voice-over-title="'Step1'" :voice-over-content="'Open the door of the refrigerator.'" >

  ### Step1

  </StagePlayScene>

  <StagePlayScene :actName="'basic'" :scene="2" :voice-over-title="'Step2'" :voice-over-content="'Place the elephant inside the refrigerator.'" >

  ### Step2

  </StagePlayScene>

  <StagePlayScene :actName="'basic'" :scene="3" :voice-over-title="'Step3'" :voice-over-content="'Close the door of the refrigerator.'" >

  ### Step3

  </StagePlayScene>
</StagePlaySpotlight>