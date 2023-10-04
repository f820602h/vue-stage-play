<script setup>
import { StagePlaySpotlight, StagePlayScene } from '../../src/index.ts'
</script>

# Nested Example

This example illustrates a nested structure of guided tour.

```vue{14,37}
<script setup>
import { StagePlaySpotlight, StagePlayScene } from 'vue-stage-play'
</script>

<template>
  <StagePlaySpotlight>
    <StagePlayScene 
      :actName="'basic'"
      :scene="1"
      :voice-over-title="'Card'"
      :voice-over-content="'This is a card.'"
      :voice-over-placement="'right'"
    >
      <template #default="scopedProps">
        <div class="card">
          <StagePlayScene
            :actName="'basic'"
            :scene="2"
            :voice-over-title="'Title'"
            :voice-over-content="'This is title.'"
            :voice-over-placement="'right'"
          >
            <h3 style="margin: 0">Vue Stage Play</h3>
          </StagePlayScene>

          <StagePlayScene
            :actName="'basic'"
            :scene="3"
            :voice-over-title="'Content'"
            :voice-over-content="'This is content.'" :voice-over-placement="'right'"
          >
            <p>
              Designing a guided tour for your website with vue components, much like directing a stage play.
            </p>
          </StagePlayScene>
    
          <button class="btn" @click="scopedProps.action()">Start</button>
        </div>
      </template>
    </StagePlayScene>
  </StagePlaySpotlight>
</template>
```

<StagePlaySpotlight>
  <StagePlayScene style="display: flex; width: 300px" :actName="'basic'" :scene="1" :voice-over-title="'Card'" :voice-over-content="'This is a card.'" :voice-over-placement="'right'" >

  <template #default="scopedProps">
  
  <div class="card" style="width: 300px; padding: 20px 20px 8px 20px; background: white; color: #292929; border-radius: 8px; box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;">

  <StagePlayScene :actName="'basic'" :scene="2" :voice-over-title="'Title'" :voice-over-content="'This is title.'" :voice-over-placement="'right'" >

  <h3 style="margin: 0">Vue Stage Play</h3>

  </StagePlayScene>

  <StagePlayScene :actName="'basic'" :scene="3" :voice-over-title="'Content'" :voice-over-content="'This is content.'" :voice-over-placement="'right'" >

  <p>Designing a guided tour for your website with vue components, much like directing a stage play.</p>

  </StagePlayScene>
    
  <button class="btn" style="background: #34495e; color: white; border-radius: 4px; padding: 2px 12px" @click="scopedProps.action()">Start</button>

  </div>
  
  </template>

  </StagePlayScene>
</StagePlaySpotlight>