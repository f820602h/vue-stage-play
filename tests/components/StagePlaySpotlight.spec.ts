import type { Ref } from "vue";
import { ref, nextTick } from "vue";
import { config, shallowMount } from "@vue/test-utils";
import { InjectionGlobalOptions } from "../../src/constants";
import { StagePlaySpotlight } from "../../src/components/StagePlaySpotlight";
import { useAct } from "../../src/composables/act";

vi.mock("@vueuse/core", () => {
  return {
    isClient: true,
    useElementBounding: () => {
      return {
        width: ref(100),
        height: ref(100),
        top: ref(100),
        left: ref(100),
      };
    },
  };
});

const actName = "testAct";
const element = document.createElement("div");
element.style.width = "100px";
element.style.height = "100px";
element.style.position = "absolute";
element.style.top = "100px";
element.style.left = "100px";
const mockHtmlElement: Ref<HTMLElement> = ref(element);
const { action, cut, addScene, isFloat } = useAct();
addScene(actName, 1, mockHtmlElement);

describe("StagePlaySpotlight", () => {
  beforeEach(() => {
    config.global.renderStubDefaultSlot = true;
  });

  afterEach(() => {
    config.global.renderStubDefaultSlot = false;
    cut();
  });

  it("should render", () => {
    const wrapper = shallowMount(StagePlaySpotlight, {
      global: {
        stubs: { Teleport: true, Transition: true },
      },
    });
    expect(wrapper.exists()).toBe(true);

    const bulb = wrapper.find(".vue-stage-play__spotlight-bulb");
    expect(bulb.exists()).not.toBe(true);
  });

  it("should spotlight-bulb render with default options when act is action", async () => {
    const wrapper = shallowMount(StagePlaySpotlight, {
      global: {
        stubs: { Teleport: true, Transition: true },
      },
    });
    action(actName);

    await nextTick(); // wait vue-stage-play__spotlight-bulb to render

    const bulb = () => wrapper.find(".vue-stage-play__spotlight-bulb");
    expect(isFloat.value).toBe(true);
    expect(wrapper.find("teleport-stub").attributes("to")).toBe("body");
    expect(bulb().exists()).toBe(true);
    expect(bulb().attributes("style")).toBe(
      "position: absolute; z-index: 99995; top: 100px; left: 100px; width: 100px; height: 100px; border-radius: 10px 10px 10px 9.999px; box-shadow: rgba(66, 66, 66, 0.5) 0px 0px 0px 3000px; transition: all 0.35s ease; pointer-events: none;",
    );

    await bulb().trigger("transitionend");
    expect(isFloat.value).toBe(false);
    expect(wrapper.find("teleport-stub").attributes("to")).toBe(
      element.toString(),
    );
    expect(bulb().attributes("style")).toBe(
      "position: absolute; z-index: 99995; top: 0px; left: 0px; width: 100px; height: 100px; border-radius: 10px 10px 10px 9.999px; box-shadow: rgba(66, 66, 66, 0.5) 0px 0px 0px 3000px; transition: all 0.35s ease; pointer-events: none;",
    );
  });

  it("should spotlight-bulb render with global options when act is action", async () => {
    const wrapper = shallowMount(StagePlaySpotlight, {
      global: {
        stubs: { Teleport: true, Transition: true },
        provide: {
          [`${InjectionGlobalOptions}`]: {
            spotlightPadding: 15,
            spotlightBorderRadius: 15,
            spotlightDarkZoneColor: "#777",
          },
        },
      },
    });
    action(actName);

    await nextTick(); // wait vue-stage-play__spotlight-bulb to render

    const bulb = () => wrapper.find(".vue-stage-play__spotlight-bulb");
    expect(isFloat.value).toBe(true);
    expect(wrapper.find("teleport-stub").attributes("to")).toBe("body");
    expect(bulb().exists()).toBe(true);
    expect(bulb().attributes("style")).toBe(
      "position: absolute; z-index: 99995; top: 100px; left: 100px; width: 100px; height: 100px; border-radius: 15px 15px 15px 14.999px; box-shadow: #777 0px 0px 0px 3000px; transition: all 0.35s ease; pointer-events: none;",
    );

    await bulb().trigger("transitionend");
    expect(isFloat.value).toBe(false);
    expect(wrapper.find("teleport-stub").attributes("to")).toBe(
      element.toString(),
    );
    expect(bulb().attributes("style")).toBe(
      "position: absolute; z-index: 99995; top: 0px; left: 0px; width: 100px; height: 100px; border-radius: 15px 15px 15px 14.999px; box-shadow: #777 0px 0px 0px 3000px; transition: all 0.35s ease; pointer-events: none;",
    );
  });

  it("should spotlight-bulb render with props when act is action", async () => {
    const wrapper = shallowMount(StagePlaySpotlight, {
      props: {
        spotlightPadding: 20,
        spotlightBorderRadius: 20,
        spotlightDarkZoneColor: "#000",
      },
      global: {
        stubs: { Teleport: true, Transition: true },
      },
    });
    action(actName);

    await nextTick(); // wait vue-stage-play__spotlight-bulb to render

    const bulb = () => wrapper.find(".vue-stage-play__spotlight-bulb");

    expect(isFloat.value).toBe(true);
    expect(wrapper.find("teleport-stub").attributes("to")).toBe("body");
    expect(bulb().exists()).toBe(true);
    expect(bulb().attributes("style")).toBe(
      "position: absolute; z-index: 99995; top: 100px; left: 100px; width: 100px; height: 100px; border-radius: 20px 20px 20px 19.999px; box-shadow: #000 0px 0px 0px 3000px; transition: all 0.35s ease; pointer-events: none;",
    );

    await bulb().trigger("transitionend");
    expect(isFloat.value).toBe(false);
    expect(wrapper.find("teleport-stub").attributes("to")).toBe(
      element.toString(),
    );
    expect(bulb().attributes("style")).toBe(
      "position: absolute; z-index: 99995; top: 0px; left: 0px; width: 100px; height: 100px; border-radius: 20px 20px 20px 19.999px; box-shadow: #000 0px 0px 0px 3000px; transition: all 0.35s ease; pointer-events: none;",
    );
  });
});
