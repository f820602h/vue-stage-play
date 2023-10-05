<script setup>
import { ref } from 'vue'
import { StagePlaySpotlight, StagePlayScene, useStagePlay } from '../../src/index.ts'

const { action } = useStagePlay()

const placement = ref("top")
const align = ref("start")

</script>

# Voice Over Placement

This example demonstrates 「Adjusting tooltip position manually and dynamically」, along with 「Enabling interactive」.

```vue
<script setup>
import { ref } from 'vue'
import { StagePlaySpotlight, StagePlayScene, useStagePlay } from 'vue-stage-play'

const { action } = useStagePlay()

const placement = ref("top")
const align = ref("start")
</script>

<template>
  <StagePlaySpotlight>
    <h2>In which locations can the tooltip be positioned?</h2>
    <button @click="action('voiceOverPlacement')">Start</button>

    <StagePlayScene 
      :act-name="'voiceOverPlacement'"
      :scene="1"
      :allow-interact="true"
      :voice-over-auto-placement="false"
      :voice-over-placement="placement"
      :voice-over-align="align"
    >
      <div>
        <p>Placement:</p>
        <button @click="placement = 'top'">Top</button>
        <button @click="placement = 'bottom'">Bottom</button>
        <button @click="placement = 'right'">Right</button>
        <button @click="placement = 'left'">Left</button>
      </div>

      <div>
        <p>Align:</p>
        <button @click="align = 'start'">start</button>
        <button @click="align = 'center'">center</button>
        <button @click="align = 'end'">end</button>
      </div>
    </StagePlayScene>
  </StagePlaySpotlight>
</template>
```

## In which locations can the tooltip be positioned?

<button class="btn" style="background: #34495e; color: white; border-radius: 4px; padding: 2px 12px" @click="action('voiceOverPlacement')">Start</button>


<StagePlaySpotlight>
  <StagePlayScene :act-name="'voiceOverPlacement'" :scene="1" :allow-interact="true" :voice-over-auto-placement="false" :voice-over-placement="placement" :voice-over-align="align" >

  <div style="display: flex; align-items: center; gap: 12px;">
    <p>Placement:</p>
    <button class="btn" style="background: #34495e; color: white; border-radius: 4px; padding: 2px 12px" @click="placement = 'top'">Top</button>
    <button class="btn" style="background: #34495e; color: white; border-radius: 4px; padding: 2px 12px" @click="placement = 'bottom'">Bottom</button>
    <button class="btn" style="background: #34495e; color: white; border-radius: 4px; padding: 2px 12px" @click="placement = 'right'">Right</button>
    <button class="btn" style="background: #34495e; color: white; border-radius: 4px; padding: 2px 12px" @click="placement = 'left'">Left</button>
  </div>

  <div style="display: flex; align-items: center; gap: 12px; margin-top: 8px">
    <p>Align:</p>
    <button class="btn" style="background: #34495e; color: white; border-radius: 4px; padding: 2px 12px" @click="align = 'start'">start</button>
    <button class="btn" style="background: #34495e; color: white; border-radius: 4px; padding: 2px 12px" @click="align = 'center'">center</button>
    <button class="btn" style="background: #34495e; color: white; border-radius: 4px; padding: 2px 12px" @click="align = 'end'">end</button>
  </div>

  </StagePlayScene>
</StagePlaySpotlight>