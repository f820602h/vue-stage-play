<script setup lang="ts">
import { ref } from "vue";
import { useStagePlay } from "../../../src/index";
import { StagePlayScene } from "../../../src/index";

const { action } = useStagePlay();

const skip = ref<boolean>(true);
</script>

<template>
  <div>
    <div class="action">
      <button @click="action('test')">Test</button>
    </div>

    <div class="container">
      <div v-for="i in 10" :key="i" class="card">
        <h1 class="title">Max</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptatibus, quibusdam, quia, quae voluptatem voluptatum quod
          exercitationem quos voluptates quas doloribus. Quisquam voluptatibus,
          quibusdam, quia, quae voluptatem voluptatum quod exercitationem quos
          voluptates quas doloribus.
        </p>
      </div>

      <StagePlayScene :act-name="'test'" :scene-number="1">
        <template #default="slotProp">
          <div class="card">
            <StagePlayScene :act-name="'test'" :scene-number="2" :skip="skip">
              <h1 ref="title" class="title" @click="skip = !skip">Max</h1>
              <template #voHeader>
                <div @click="slotProp.cut">Test</div>
              </template>
            </StagePlayScene>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptatibus, quibusdam, quia, quae voluptatem voluptatum quod
              exercitationem quos voluptates quas doloribus. Quisquam
              voluptatibus, quibusdam, quia, quae voluptatem voluptatum quod
              exercitationem quos voluptates quas doloribus.
            </p>
          </div>
        </template>
      </StagePlayScene>

      <div v-for="i in 8" :key="i" class="card">
        <h1 class="title">Max</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptatibus, quibusdam, quia, quae voluptatem voluptatum quod
          exercitationem quos voluptates quas doloribus. Quisquam voluptatibus,
          quibusdam, quia, quae voluptatem voluptatum quod exercitationem quos
          voluptates quas doloribus.
        </p>
      </div>

      <StagePlayScene :act-name="'test'" :scene-number="4">
        <template #default="slotProp">
          <div class="card">
            <StagePlayScene :act-name="'test'" :scene-number="3">
              <h1 ref="title" class="title">Max</h1>
              <template #voHeader>
                <div @click="slotProp.cut">Test</div>
              </template>
            </StagePlayScene>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptatibus, quibusdam, quia, quae voluptatem voluptatum quod
              exercitationem quos voluptates quas doloribus. Quisquam
              voluptatibus, quibusdam, quia, quae voluptatem voluptatum quod
              exercitationem quos voluptates quas doloribus.
            </p>
          </div>
        </template>
      </StagePlayScene>
    </div>
  </div>
</template>

<style scoped>
.action {
  padding: 30px 0;
  text-align: center;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 45px 0px;
  gap: 20px;
}

.card {
  max-width: 30rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
}
</style>
../composables/composables
