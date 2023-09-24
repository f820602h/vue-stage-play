import { ref, computed } from "vue";
import type { Scene } from "./types";

const acts = ref<Map<string, Scene[]>>(new Map());

const currentActName = ref<string>();
const currentAct = computed<Scene[]>(() => {
  if (!currentActName.value) return [];
  const act = acts.value.get(currentActName.value);
  return Array.isArray(act) ? act : [];
});

const currentSceneIndex = ref<number>();
const currentScene = computed<Scene | null>(() => {
  if (!currentAct.value || currentSceneIndex.value === undefined) return null;
  return currentAct.value?.[currentSceneIndex.value];
});

function action(actName: string, sceneIndex?: number) {
  if (currentActName.value) {
    throw new Error(`${currentActName.value} already in action`);
  }

  const specifyAct = acts.value.get(actName);
  const act = Array.isArray(specifyAct) ? specifyAct : [];

  if (act.length === 0) {
    throw new Error(`No scene in ${actName}`);
  }
  if (sceneIndex && !act[sceneIndex]) {
    throw new Error(`No scene-${sceneIndex} in ${actName}`);
  }

  currentActName.value = actName;
  currentSceneIndex.value = sceneIndex || act.findIndex((scenes) => scenes);
}

function cut() {
  currentActName.value = undefined;
  currentSceneIndex.value = undefined;
}

function addScene(actName: string, sceneIndex: number, scene: Scene) {
  if (!acts.value.has(actName)) acts.value.set(actName, []);
  const scenes = acts.value.get(actName);
  if (Array.isArray(scenes)) {
    scenes[sceneIndex] = scene;
  }
}

function prevScene(actName: string) {
  const sceneIndex = currentSceneIndex.value;
  if (currentActName.value !== actName || sceneIndex === undefined) {
    throw new Error(`${actName} not in action.`);
  }
  const index = currentAct.value.findIndex(
    (scene, i) => i < sceneIndex && scene,
  );
  currentSceneIndex.value = index > 0 ? index : sceneIndex;
}

function nextScene(actName: string) {
  const sceneIndex = currentSceneIndex.value;
  if (currentActName.value !== actName || sceneIndex === undefined) {
    throw new Error("Not in action");
  }
  const index = currentAct.value.findIndex(
    (scene, i) => i > sceneIndex && scene,
  );
  currentSceneIndex.value = index > 0 ? index : sceneIndex;
}

function jumpToScene(actName: string, sceneIndex: number) {
  if (currentActName.value !== actName) {
    throw new Error("Not in action");
  }
  if (currentAct.value[sceneIndex] === undefined) {
    throw new Error("No such scene");
  }
  currentSceneIndex.value = sceneIndex;
}

export function useScript() {
  return {
    acts,
    currentActName,
    currentAct,
    currentSceneIndex,
    currentScene,
    action,
    cut,
    addScene,
    prevScene,
    nextScene,
    jumpToScene,
  };
}

export function useAct(actName: string) {
  return {
    currentActName,
    currentAct,
    currentSceneIndex,
    currentScene,
    action: (sceneIndex?: number) => {
      action(actName, sceneIndex);
    },
    cut,
    addScene: (sceneIndex: number, scene: Scene) => {
      addScene(actName, sceneIndex, scene);
    },
    prevScene: () => {
      prevScene(actName);
    },
    nextScene: () => {
      nextScene(actName);
    },
    jumpToScene: (sceneIndex: number) => {
      jumpToScene(actName, sceneIndex);
    },
  };
}
