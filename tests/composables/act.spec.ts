import type { Ref } from "vue";
import { ref } from "vue";
import { useAct } from "../../src/composables/act";
import { errorMessages } from "../../src/utils";

const actName = "testAct";
const sceneNegative = -1;
const scene1 = 1;
const scene2 = 2;
const noExistActName = "noExistAct";
const noExistScene = 999;
const mockHtmlElement: Ref<HTMLElement> = ref(document.createElement("div"));

const {
  acts,
  currentActName,
  currentActSceneList,
  currentSceneOrder,
  currentScene,
  currentActor,
  totalSceneCount,
  hasPrevScene,
  hasNextScene,
  action,
  cut,
  addScene,
  removeScene,
  prevScene,
  nextScene,
  jumpToScene,
} = useAct();

vi.stubGlobal("console", { warn: vi.fn(), log: console.log });

describe("useAct", () => {
  afterEach(() => {
    cut();
  });

  it("check default value", () => {
    expect(currentActName.value).toBeUndefined();
    expect(currentActSceneList.value).toEqual([]);
    expect(currentSceneOrder.value).toEqual(-1);
    expect(currentScene.value).toBeUndefined();
    expect(currentActor.value).toBeUndefined();
    expect(totalSceneCount.value).toEqual(0);
    expect(hasPrevScene.value).toBeFalsy();
    expect(hasNextScene.value).toBeFalsy();
  });

  it("addScene should throw error when scene is negative", () => {
    const scene = sceneNegative;

    expect(() => addScene(actName, scene, ref(mockHtmlElement))).toThrow(
      errorMessages.sceneNumberShouldBePositive(),
    );
  });

  it("addScene should add scene even act not exist", () => {
    const scene = scene1;

    addScene(actName, scene, ref(mockHtmlElement));
    expect(acts[actName][1]).toEqual(mockHtmlElement);
  });

  it("addScene should add scene when act exist", () => {
    const scene = scene2;

    addScene(actName, scene, ref(mockHtmlElement));
    expect(acts[actName][2]).toEqual(mockHtmlElement);
  });

  it("action should warn when actName not exist", () => {
    const scene = scene1;

    expect(acts[noExistActName]).toBeUndefined();
    action(noExistActName, scene);
    expect(console.warn).toHaveBeenCalledWith(
      errorMessages.noSceneInAct(noExistActName),
    );
  });

  it("action should warn when scene not exist", () => {
    const scene = noExistScene;

    action(actName, scene);
    expect(console.warn).toHaveBeenCalledWith(
      errorMessages.noSpecifiedSceneInAct(actName, scene),
    );
  });

  it("action should action when only provide actName", () => {
    action(actName);
    expect(currentActName.value).toEqual(actName);
    expect(currentActSceneList.value).toEqual([scene1, scene2]);
    expect(currentSceneOrder.value).toEqual(0);
    expect(currentScene.value).toEqual(scene1);
    expect(currentActor.value).toEqual(mockHtmlElement.value);
    expect(totalSceneCount.value).toEqual(2);
    expect(hasPrevScene.value).toBeFalsy();
    expect(hasNextScene.value).toBeTruthy();
  });

  it("action should action when actName and scene provided", () => {
    const scene = scene2;

    action(actName, scene);
    expect(currentActName.value).toEqual(actName);
    expect(currentActSceneList.value).toEqual([scene1, scene2]);
    expect(currentSceneOrder.value).toEqual(1);
    expect(currentScene.value).toEqual(scene2);
    expect(currentActor.value).toEqual(mockHtmlElement.value);
    expect(totalSceneCount.value).toEqual(2);
    expect(hasPrevScene.value).toBeTruthy();
    expect(hasNextScene.value).toBeFalsy();
  });

  it("cut should reset all value", () => {
    const scene = scene1;

    action(actName, scene);
    cut();
    expect(currentActName.value).toBeUndefined();
    expect(currentActSceneList.value).toEqual([]);
    expect(currentSceneOrder.value).toEqual(-1);
    expect(currentScene.value).toBeUndefined();
    expect(currentActor.value).toBeUndefined();
    expect(totalSceneCount.value).toEqual(0);
    expect(hasPrevScene.value).toBeFalsy();
    expect(hasNextScene.value).toBeFalsy();
  });

  it("prevScene should warn when no playing act", () => {
    prevScene();
    expect(console.warn).toHaveBeenCalledWith(errorMessages.noPlayingAct());
  });

  it("prevScene should warn when no previous scene", () => {
    const scene = scene1;

    action(actName, scene);
    prevScene();
    expect(console.warn).toHaveBeenCalledWith(errorMessages.noPreviousScene());
  });

  it("prevScene should prev scene when has previous scene", () => {
    const scene = scene2;

    action(actName, scene);
    prevScene();
    expect(currentActName.value).toEqual(actName);
    expect(currentActSceneList.value).toEqual([scene1, scene2]);
    expect(currentSceneOrder.value).toEqual(0);
    expect(currentScene.value).toEqual(scene1);
    expect(currentActor.value).toEqual(mockHtmlElement.value);
    expect(totalSceneCount.value).toEqual(2);
    expect(hasPrevScene.value).toBeFalsy();
    expect(hasNextScene.value).toBeTruthy();
  });

  it("nextScene should warn when no playing act", () => {
    nextScene();
    expect(console.warn).toHaveBeenCalledWith(errorMessages.noPlayingAct());
  });

  it("nextScene should warn when no next scene", () => {
    const scene = scene2;

    action(actName, scene);
    nextScene();
    expect(console.warn).toHaveBeenCalledWith(errorMessages.noNextScene());
  });

  it("nextScene should next scene when has next scene", () => {
    const scene = scene1;

    action(actName, scene);
    nextScene();
    expect(currentActName.value).toEqual(actName);
    expect(currentActSceneList.value).toEqual([scene1, scene2]);
    expect(currentSceneOrder.value).toEqual(1);
    expect(currentScene.value).toEqual(scene2);
    expect(currentActor.value).toEqual(mockHtmlElement.value);
    expect(totalSceneCount.value).toEqual(2);
    expect(hasPrevScene.value).toBeTruthy();
    expect(hasNextScene.value).toBeFalsy();
  });

  it("jumpToScene should warn when no playing act", () => {
    const scene = scene1;

    jumpToScene(scene);
    expect(console.warn).toHaveBeenCalledWith(errorMessages.noPlayingAct());
  });

  it("jumpToScene should warn when scene not exist", () => {
    const scene = noExistScene;

    action(actName);
    jumpToScene(scene);
    expect(console.warn).toHaveBeenCalledWith(errorMessages.noSpecifiedScene());
  });

  it("jumpToScene should jump to scene when scene exist", () => {
    const scene = scene2;

    action(actName);
    jumpToScene(scene);
    expect(currentActName.value).toEqual(actName);
    expect(currentActSceneList.value).toEqual([scene1, scene2]);
    expect(currentSceneOrder.value).toEqual(1);
    expect(currentScene.value).toEqual(scene2);
    expect(currentActor.value).toEqual(mockHtmlElement.value);
    expect(totalSceneCount.value).toEqual(2);
    expect(hasPrevScene.value).toBeTruthy();
    expect(hasNextScene.value).toBeFalsy();
  });

  it("removeScene should warn when scene not exist", () => {
    const scene = noExistScene;

    removeScene(actName, scene);
    expect(console.warn).toHaveBeenCalledWith(
      errorMessages.noSpecifiedSceneInAct(actName, scene),
    );
  });

  it("removeScene should remove scene when act exist", () => {
    const scene = 1;

    removeScene(actName, scene);
    expect(acts[actName][1]).toBeUndefined();
  });
});
