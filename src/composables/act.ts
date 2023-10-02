import { Ref } from "vue";
import { ref, reactive, computed } from "vue";
import { useBodyScrollFixed } from "../composables/bodyScrollFixed";

const { reset } = useBodyScrollFixed();

const acts = reactive<Record<string, (Ref<HTMLElement | null> | undefined)[]>>(
  {},
);

const currentActName = ref<string>();
const currentAct = computed<(Ref<HTMLElement | null> | undefined)[]>(() => {
  if (!currentActName.value) return [];
  if (!acts[currentActName.value]) return [];
  return acts[currentActName.value];
});

const currentActSceneList = computed<number[]>(() => {
  if (!currentAct.value) return [];
  return currentAct.value
    .map((actor, index) => (actor !== undefined ? index : undefined))
    .filter((index) => index !== undefined) as number[];
});
const currentSceneOrder = computed<number>(() => {
  if (!currentAct.value || !currentScene.value) return 0;
  return currentActSceneList.value.findIndex(
    (index) => index === currentScene.value,
  );
});

const currentScene = ref<number>();
const currentActor = computed<HTMLElement | null | undefined>(() => {
  if (!currentActName.value) return undefined;
  if (!currentAct.value.length) return undefined;
  if (currentScene.value === undefined) return undefined;
  const actor = currentAct.value[currentScene.value];
  return actor !== undefined ? actor.value : undefined;
});

const totalSceneCount = computed<number>(() => {
  if (!currentAct.value) return 0;
  return currentAct.value.filter((actor) => actor !== undefined).length;
});

const hasPrevScene = computed<boolean>(() => {
  return currentSceneOrder.value - 1 >= 0;
});

const hasNextScene = computed<boolean>(() => {
  return currentSceneOrder.value + 1 < totalSceneCount.value;
});

function action(actName: string, scene?: number): void {
  if (currentActName.value) {
    console.warn(
      `[Vue Stage Play] Act ${currentActName.value} already in action`,
    );
    return;
  }

  const specifyAct = acts[actName];
  const act = Array.isArray(specifyAct) ? specifyAct : [];

  if (act.length === 0) {
    console.warn(`[Vue Stage Play] No scene in act ${actName}`);
    return;
  }

  if (scene !== undefined && !act[scene]) {
    console.warn(`[Vue Stage Play] No scene ${scene} in act ${actName}`);
    return;
  }

  currentActName.value = actName;
  currentScene.value =
    scene !== undefined ? scene : act.findIndex((actor) => actor !== undefined);
}

function cut(): void {
  currentActName.value = undefined;
  currentScene.value = undefined;
  reset();
}

function addScene(
  actName: string,
  scene: number,
  actor: Ref<HTMLElement | null>,
): void {
  if (!acts[actName]) acts[actName] = [];

  const scenes = acts[actName];
  if (Array.isArray(scenes)) scenes[scene] = actor;
}

function removeScene(actName: string, scene: number): void {
  if (!acts[actName]) return;
  if (currentScene.value === scene) {
    console.warn(`[Vue Stage Play] Can't remove current scene`);
    return;
  }

  const scenes = acts[actName];
  if (Array.isArray(scenes)) scenes[scene] = undefined;
}

function prevScene(): void {
  const scene = currentScene.value;
  if (!currentAct.value || scene === undefined) {
    console.warn(`[Vue Stage Play] No playing act.`);
    return;
  }
  if (!hasPrevScene.value) {
    console.warn(`[Vue Stage Play] No previous scene.`);
    return;
  }
  currentScene.value = currentAct.value.findLastIndex(
    (actor, index) => index < scene && actor !== undefined,
  );
}

function nextScene(): void {
  const scene = currentScene.value;
  if (!currentAct.value || scene === undefined) {
    console.warn(`[Vue Stage Play] No playing act.`);
    return;
  }
  if (!hasNextScene.value) {
    console.warn(`[Vue Stage Play] No next scene.`);
    return;
  }
  currentScene.value = currentAct.value.findIndex(
    (actor, index) => index > scene && actor !== undefined,
  );
}

function jumpToScene(scene: number): void {
  if (!currentAct.value || currentScene.value === undefined) {
    console.warn(`[Vue Stage Play] No playing act.`);
    return;
  }
  if (currentAct.value[scene] === undefined) {
    console.warn("[Vue Stage Play] No such scene");
    return;
  }
  currentScene.value = scene;
}

export function useStagePlay() {
  return {
    acts,
    currentActName,
    currentActSceneList,
    totalSceneCount,
    currentScene,
    currentSceneOrder,
    currentActor,
    hasPrevScene,
    hasNextScene,
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
    currentActSceneList,
    currentScene,
    currentSceneOrder,
    currentActor,
    hasPrevScene,
    hasNextScene,
    totalSceneCount,

    action,
    cut,
    addScene,
    removeScene,
    prevScene,
    nextScene,
    jumpToScene,
  };
}
