<script setup lang="ts">
import { useAct } from "../../../src/index";
import { VueTrailerScene } from "../../../src/index";

const { action } = useAct("test");
</script>

<template>
  <div class="container">
    <button @click="action()">start</button>
    <div v-for="i in 10" :key="i" class="card">
      <h1 class="title">Max</h1>
      <button>123</button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptatibus, quibusdam, quia, quae voluptatem voluptatum quod
        exercitationem quos voluptates quas doloribus. Quisquam voluptatibus,
        quibusdam, quia, quae voluptatem voluptatum quod exercitationem quos
        voluptates quas doloribus.
      </p>
    </div>

    <VueTrailerScene :act-name="'test'" :scene-number="1" style="margin: 10px">
      <template #default="slotProp">
        <div class="card">
          <VueTrailerScene :act-name="'test'" :scene-number="2">
            <h1 ref="title" class="title">Max</h1>
            <template #voHeader>
              <div @click="slotProp.cut">Test</div>
            </template>
          </VueTrailerScene>
          <button>123</button>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptatibus, quibusdam, quia, quae voluptatem voluptatum quod
            exercitationem quos voluptates quas doloribus. Quisquam
            voluptatibus, quibusdam, quia, quae voluptatem voluptatum quod
            exercitationem quos voluptates quas doloribus.
          </p>
        </div>
      </template>
    </VueTrailerScene>

    <div v-for="i in 20" :key="i" class="card">
      <h1 class="title">Max</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        voluptatibus, quibusdam, quia, quae voluptatem voluptatum quod
        exercitationem quos voluptates quas doloribus. Quisquam voluptatibus,
        quibusdam, quia, quae voluptatem voluptatum quod exercitationem quos
        voluptates quas doloribus.
      </p>
    </div>
  </div>
</template>

<style scoped>
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
