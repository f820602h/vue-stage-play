<script setup>
import { StagePlaySpotlight, StagePlayScene, useStagePlay } from '../../src/index.ts'

const { action } = useStagePlay()
</script>

# Voice Over Customizing

This example demonstrates the utilization of a customized tooltip.

::: code-group

```vue [MyVoiceOver.vue]
<script setup>
  const emit = defineEmits(['prev', 'next', 'done']);

  defineProps({
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    hasPrevScene: {
      type: Boolean,
      required: true
    },
    hasNextScene: {
      type: Boolean,
      required: true
    }
  });
</script>

<template>
  <div class="demo-card">
    <button
      :disabled="!hasPrevScene"
      @click="emit('prev')"
    >
      ←
    </button>

    <div>
      <h3>{{ title }}</h3>
      <p>{{ content }}</p>
    </div>

    <button
      v-show="hasNextScene"
      @click="emit('next')"
    >
      →
    </button>

    <button
      v-show="!hasNextScene"
      @click="emit('done')"
    >
      X
    </button>
  </div>
</template>
```

```vue [App.vue]
<script setup>
import MyVoiceOver from "./components/MyVoiceOver"
import { StagePlaySpotlight, StagePlayScene, useStagePlay } from 'vue-stage-play'

const { action } = useStagePlay()
</script>

<template>
  <StagePlaySpotlight>
    <h2>How to place an giraffe into a refrigerator?</h2>
    <button @click="action('basic')">Start</button>

    <StagePlayScene :act-name="'voiceOverCustomizing'" :scene="1">
      <h3>Step1</h3>

      <template #voiceOver="scopedProps">
        <MyVoiceOver
          :title="'Step1'"
          :content="'Open the door of the refrigerator.'"
          :has-prev-scene="scopedProps.hasPrevScene"
          :has-next-scene="scopedProps.hasNextScene"
          @prev="scopedProps.prevScene()"
          @next="scopedProps.nextScene()"
          @done="scopedProps.cut()"
        />
      </template>
    </StagePlayScene>

    <StagePlayScene :act-name="'voiceOverCustomizing'" :scene="2">
      <h3>Step2</h3>

      <template #voiceOver="scopedProps">
        <MyVoiceOver
          :title="'Step2'"
          :content="'Extract the elephant from the refrigerator.'"
          :has-prev-scene="scopedProps.hasPrevScene"
          :has-next-scene="scopedProps.hasNextScene"
          @prev="scopedProps.prevScene()"
          @next="scopedProps.nextScene()"
          @done="scopedProps.cut()"
        />
      </template>
    </StagePlayScene>

    <StagePlayScene :act-name="'voiceOverCustomizing'" :scene="3">
      <h3>Step3</h3>

      <template #voiceOver="scopedProps">
        <MyVoiceOver
          :title="'Step3'"
          :content="'Place the giraffe inside the refrigerator.'"
          :has-prev-scene="scopedProps.hasPrevScene"
          :has-next-scene="scopedProps.hasNextScene"
          @prev="scopedProps.prevScene()"
          @next="scopedProps.nextScene()"
          @done="scopedProps.cut()"
        />
      </template>
    </StagePlayScene>

    <StagePlayScene :act-name="'voiceOverCustomizing'" :scene="4">
      <h3>Step4</h3>

      <template #voiceOver="scopedProps">
        <MyVoiceOver
          :title="'Step4'"
          :content="'Close the door of the refrigerator.'"
          :has-prev-scene="scopedProps.hasPrevScene"
          :has-next-scene="scopedProps.hasNextScene"
          @prev="scopedProps.prevScene()"
          @next="scopedProps.nextScene()"
          @done="scopedProps.cut()"
        />
      </template>
    </StagePlayScene>

    <StagePlayScene :act-name="'voiceOverCustomizing'" :scene="5">
       <template #voiceOver="scopedProps">
        <MyVoiceOver
          :title="'Success!'"
          :content="'You place an giraffe into a refrigerator.'"
          :has-prev-scene="scopedProps.hasPrevScene"
          :has-next-scene="scopedProps.hasNextScene"
          @prev="scopedProps.prevScene()"
          @next="scopedProps.nextScene()"
          @done="scopedProps.cut()"
        />
      </template>
    </StagePlayScene>
  </StagePlaySpotlight>
</template>
```

:::

## How to place an giraffe into a refrigerator?

<button class="btn" style="background: #34495e; color: white; border-radius: 4px; padding: 2px 12px" @click="action('voiceOverCustomizing')">Start</button>

<StagePlaySpotlight>
  <StagePlayScene :act-name="'voiceOverCustomizing'" :scene="1" >

  ### Step1

  <template #voiceOver="scopedProps">
    <div class="demo-card">
      <button
        class="btn"
        :disabled="!scopedProps.hasPrevScene"
        @click="scopedProps.prevScene()"
      >
        ←
      </button>
      <div class="content">
        <h3 class="title">Step1</h3>
        <p>Open the door of the refrigerator.</p>
      </div>
      <button
        v-show="scopedProps.hasNextScene"
        class="btn"
        :disabled="!scopedProps.hasNextScene"
        @click="scopedProps.nextScene()"
      >
        →
      </button>
      <button
        v-show="!scopedProps.hasNextScene"
        class="btn"
        @click="scopedProps.cut()"
      >
        X
      </button>
    </div>
  </template>
  </StagePlayScene>

  <StagePlayScene :act-name="'voiceOverCustomizing'" :scene="2" >

  ### Step2

  <template #voiceOver="scopedProps">
    <div class="demo-card">
      <button
        class="btn"
        :disabled="!scopedProps.hasPrevScene"
        @click="scopedProps.prevScene()"
      >
        ←
      </button>
      <div class="content">
        <h3 class="title">Step2</h3>
        <p>Extract the elephant from the refrigerator.</p>
      </div>
      <button
        v-show="scopedProps.hasNextScene"
        class="btn"
        :disabled="!scopedProps.hasNextScene"
        @click="scopedProps.nextScene()"
      >
        →
      </button>
      <button
        v-show="!scopedProps.hasNextScene"
        class="btn"
        @click="scopedProps.cut()"
      >
        X
      </button>
    </div>
  </template>
  </StagePlayScene>

  <StagePlayScene :act-name="'voiceOverCustomizing'" :scene="3" >

  ### Step3

  <template #voiceOver="scopedProps">
    <div class="demo-card">
      <button
        class="btn"
        :disabled="!scopedProps.hasPrevScene"
        @click="scopedProps.prevScene()"
      >
        ←
      </button>
      <div class="content">
        <h3 class="title">Step3</h3>
        <p>Place the giraffe inside the refrigerator.</p>
      </div>
      <button
        v-show="scopedProps.hasNextScene"
        class="btn"
        :disabled="!scopedProps.hasNextScene"
        @click="scopedProps.nextScene()"
      >
        →
      </button>
      <button
        v-show="!scopedProps.hasNextScene"
        class="btn"
        @click="scopedProps.cut()"
      >
        X
      </button>
    </div>
  </template>
  </StagePlayScene>

  <StagePlayScene :act-name="'voiceOverCustomizing'" :scene="4" >

  ### Step4

  <template #voiceOver="scopedProps">
    <div class="demo-card">
      <button
        class="btn"
        :disabled="!scopedProps.hasPrevScene"
        @click="scopedProps.prevScene()"
      >
        ←
      </button>
      <div class="content">
        <h3 class="title">Step4</h3>
        <p>Close the door of the refrigerator.</p>
      </div>
      <button
        v-show="scopedProps.hasNextScene"
        class="btn"
        :disabled="!scopedProps.hasNextScene"
        @click="scopedProps.nextScene()"
      >
        →
      </button>
      <button
        v-show="!scopedProps.hasNextScene"
        class="btn"
        @click="scopedProps.cut()"
      >
        X
      </button>
    </div>
  </template>
  </StagePlayScene>

  <StagePlayScene :act-name="'voiceOverCustomizing'" :scene="5">
  <template #voiceOver="scopedProps">
     <div class="demo-card">
      <button
        class="btn"
        :disabled="!scopedProps.hasPrevScene"
        @click="scopedProps.prevScene()"
      >
        ←
      </button>
      <div class="content">
        <h3 class="title">Success!</h3>
        <p>You place an giraffe into a refrigerator.</p>
      </div>
      <button
        v-show="scopedProps.hasNextScene"
        class="btn"
        :disabled="!scopedProps.hasNextScene"
        @click="scopedProps.nextScene()"
      >
        →
      </button>
      <button
        v-show="!scopedProps.hasNextScene"
        class="btn"
        @click="scopedProps.cut()"
      >
        X
      </button>
    </div>
  </template>
  </StagePlayScene>
</StagePlaySpotlight>

<style scoped>
  .demo-card {
    display: flex;
    align-items: center;
    margin: 8px;
    width: 300px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    padding: 12px 8px;
    color: white;
    backdrop-filter: blur(5px);
  }

  .demo-card .content {
    text-align: center;
    flex: 1;
  }

  .demo-card .btn {
    font-size: 20px;
    cursor: pointer;
  }
</style>