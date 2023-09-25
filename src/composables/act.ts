import { ref, computed, watch } from "vue";
import { useBodyScrollFixed } from "../composables/bodyScrollFixed";

const { reset } = useBodyScrollFixed();

const acts = ref<Record<string, number[]>>({});

const currentActName = ref<string>();
const currentAct = computed<number[]>(() => {
  if (!currentActName.value) return [];
  if (!acts.value[currentActName.value]) return [];
  return Array.from(acts.value[currentActName.value]).sort();
});

const currentSceneIndex = ref<number>();
const currentSceneNumber = computed<number | null>(() => {
  if (!currentActName.value) return null;
  if (!currentAct.value.length) return null;
  if (currentSceneIndex.value === undefined) return null;
  return currentAct.value[currentSceneIndex.value];
});

const currentActor = ref<HTMLElement | null>(null);
watch(
  () => currentActName.value && currentSceneIndex.value,
  () => {
    currentActor.value = null;
  },
);
function actorWalkIn(actor: HTMLElement) {
  currentActor.value = actor;
}

const totalSceneCount = computed<number>(() => {
  if (!currentAct.value) return 0;
  return currentAct.value.length;
});

const hasPrevScene = computed<boolean>(() => {
  const sceneIndex = currentSceneIndex.value;
  if (!currentAct.value || sceneIndex === undefined) return false;
  return sceneIndex - 1 >= 0;
});

const hasNextScene = computed<boolean>(() => {
  const sceneIndex = currentSceneIndex.value;
  if (!currentAct.value || sceneIndex === undefined) return false;
  return sceneIndex + 1 < totalSceneCount.value;
});

function action(actName: string, sceneNumber?: number): void {
  if (currentActName.value) {
    throw new Error(
      `[Vue Trailer] Act ${currentActName.value} already in action`,
    );
  }

  const specifyAct = acts.value[actName];
  const act = Array.isArray(specifyAct) ? specifyAct : [];

  if (act.length === 0) {
    throw new Error(`[Vue Trailer] No scene in act ${actName}`);
  }
  if (sceneNumber && !act[sceneNumber]) {
    throw new Error(`[Vue Trailer] No scene ${sceneNumber} in act ${actName}`);
  }

  currentActName.value = actName;
  currentSceneIndex.value = sceneNumber || act.findIndex((scenes) => scenes);
}

function cut(): void {
  currentActName.value = undefined;
  currentSceneIndex.value = undefined;
  reset();
}

function addScene(actName: string, sceneNumber: number): void {
  if (!acts.value[actName]) acts.value[actName] = [];

  const scenes = acts.value[actName];
  if (Array.isArray(scenes)) scenes.push(sceneNumber);
}

function removeScene(actName: string, sceneNumber: number): void {
  if (!acts.value[actName]) return;

  const scenes = acts.value[actName];
  if (Array.isArray(scenes)) {
    const index = scenes.indexOf(sceneNumber);
    if (index >= 0) scenes.splice(index, 1);
  }
}

function prevScene(actName: string): void {
  const sceneIndex = currentSceneIndex.value;
  if (currentActName.value !== actName || sceneIndex === undefined) {
    throw new Error(`[Vue Trailer] Act ${actName} not in action.`);
  }
  if (!hasPrevScene.value) {
    throw new Error(`[Vue Trailer] No previous scene.`);
  }
  currentSceneIndex.value = sceneIndex - 1;
}

function nextScene(actName: string): void {
  const sceneIndex = currentSceneIndex.value;
  if (currentActName.value !== actName || sceneIndex === undefined) {
    throw new Error(`[Vue Trailer] Act ${actName} not in action.`);
  }
  if (!hasNextScene.value) {
    throw new Error(`[Vue Trailer] No next scene.`);
  }
  currentSceneIndex.value = sceneIndex + 1;
}

function jumpToScene(actName: string, sceneNumber: number): void {
  if (currentActName.value !== actName) {
    throw new Error(`[Vue Trailer] Act ${actName} not in action.`);
  }
  if (currentAct.value.indexOf(sceneNumber) < 0) {
    throw new Error("[Vue Trailer] No such scene");
  }
  currentSceneIndex.value = currentAct.value.indexOf(sceneNumber);
}

export function useActs() {
  return {
    acts,
    currentActName,
    currentAct,
    currentSceneIndex,
    currentSceneNumber,
    currentActor,
    action,
    cut,
    addScene,
    removeScene,
    prevScene,
    nextScene,
    jumpToScene,
  };
}

export function useAct(actName: string) {
  return {
    currentActName,
    currentSceneIndex,
    currentSceneNumber,
    hasPrevScene,
    hasNextScene,
    totalSceneCount,

    actorWalkIn,
    action: (sceneNumber?: number) => {
      action(actName, sceneNumber);
    },
    cut,
    addScene: (sceneNumber: number) => {
      addScene(actName, sceneNumber);
    },
    removeScene: (sceneNumber: number) => {
      removeScene(actName, sceneNumber);
    },
    prevScene: () => {
      prevScene(actName);
    },
    nextScene: () => {
      nextScene(actName);
    },
    jumpToScene: (sceneNumber: number) => {
      jumpToScene(actName, sceneNumber);
    },
  };
}
