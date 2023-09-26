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
const currentSceneNumber = computed<number | undefined>(() => {
  if (!currentActName.value) return undefined;
  if (!currentAct.value.length) return undefined;
  if (currentSceneIndex.value === undefined) return undefined;
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
    console.warn(
      `[Vue Stage Play] Act ${currentActName.value} already in action`,
    );
    return;
  }

  const specifyAct = acts.value[actName];
  const act = Array.isArray(specifyAct) ? specifyAct : [];

  if (act.length === 0) {
    console.warn(`[Vue Stage Play] No scene in act ${actName}`);
    return;
  }
  if (sceneNumber && !act[sceneNumber]) {
    console.warn(`[Vue Stage Play] No scene ${sceneNumber} in act ${actName}`);
    return;
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
  if (currentSceneNumber.value === sceneNumber) {
    console.warn(`[Vue Stage Play] Can't remove current scene`);
    return;
  }

  const scenes = acts.value[actName];
  if (Array.isArray(scenes)) {
    const index = scenes.indexOf(sceneNumber);
    if (index >= 0) scenes.splice(index, 1);
  }
}

function prevScene(): void {
  const sceneIndex = currentSceneIndex.value;
  if (currentActName.value === undefined || sceneIndex === undefined) {
    console.warn(`[Vue Stage Play] No playing act.`);
    return;
  }
  if (!hasPrevScene.value) {
    console.warn(`[Vue Stage Play] No previous scene.`);
    return;
  }
  currentSceneIndex.value = sceneIndex - 1;
}

function nextScene(): void {
  const sceneIndex = currentSceneIndex.value;
  if (currentActName.value === undefined || sceneIndex === undefined) {
    console.warn(`[Vue Stage Play] No playing act.`);
    return;
  }
  if (!hasNextScene.value) {
    console.warn(`[Vue Stage Play] No next scene.`);
    return;
  }
  currentSceneIndex.value = sceneIndex + 1;
}

function jumpToScene(sceneNumber: number): void {
  const sceneIndex = currentSceneIndex.value;
  if (currentActName.value === undefined || sceneIndex === undefined) {
    console.warn(`[Vue Stage Play] No playing act.`);
    return;
  }
  if (currentAct.value.indexOf(sceneNumber) < 0) {
    console.warn("[Vue Stage Play] No such scene");
    return;
  }
  currentSceneIndex.value = currentAct.value.indexOf(sceneNumber);
}

export function useStagePlay() {
  return {
    acts,
    currentActName,
    currentAct,
    currentSceneIndex,
    currentSceneNumber,
    currentActor,
    hasPrevScene,
    hasNextScene,
    totalSceneCount,
    action,
    cut,
    prevScene,
    nextScene,
    jumpToScene,
  };
}

export function useAct() {
  return {
    acts,
    currentActName,
    currentAct,
    currentSceneIndex,
    currentSceneNumber,
    currentActor,
    hasPrevScene,
    hasNextScene,
    totalSceneCount,

    actorWalkIn,
    action,
    cut,
    addScene,
    removeScene,
    prevScene,
    nextScene,
    jumpToScene,
  };
}
