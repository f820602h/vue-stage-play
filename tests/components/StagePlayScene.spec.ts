import { config, shallowMount } from "@vue/test-utils";
import {
  InjectionGlobalOptions,
  InjectionSpotlightOptions,
} from "../../src/constants";
import { GlobalOptions } from "../../src/types";
import { StagePlayScene } from "../../src/components/StagePlayScene";
import { StagePlaySpotlight } from "../../src/components/StagePlaySpotlight";
import { useAct } from "../../src/composables/act";
import { defaultOptions } from "../../src/options";
import { defineComponent, nextTick } from "vue";

const voiceOverStyle: Record<string, Record<string, string>> = {
  top: {
    start: "top: 0px; left: 0px; transform: translate(0, -100%);",
    center: "top: 0px; left: 50%; transform: translate(-50%, -100%);",
    end: "top: 0px; left: unset; right: 0px; transform: translate(0, -100%);",
  },
  bottom: {
    start: "bottom: 0px; left: 0px; transform: translate(0, 100%);",
    center: "bottom: 0px; left: 50%; transform: translate(-50%, 100%);",
    end: "bottom: 0px; left: unset; right: 0px; transform: translate(0, 100%);",
  },
  left: {
    start: "top: 0px; left: 0px; transform: translate(-100%, 0);",
    center: "top: 50%; left: 0px; transform: translate(-100%, -50%);",
    end: "top: unset; bottom: 0px; left: 0px; transform: translate(-100%, 0);",
  },
  right: {
    start: "top: 0px; right: 0px; transform: translate(100%, 0);",
    center: "top: 50%; right: 0px; transform: translate(100%, -50%);",
    end: "top: unset; bottom: 0px; right: 0px; transform: translate(100%, 0);",
  },
};

const mockGlobalOptions: GlobalOptions = {
  spotlightPadding: 20,
  cameraFollowOffset: 50,
  voiceOverWidth: 100,
  voiceOverPlacement: "top",
  voiceOverAlign: "start",
  voiceOverTitle: "title",
  voiceOverContent: "content",
  voiceOverPrevButtonText: "test-prev",
  voiceOverNextButtonText: "test-next",
  voiceOverDoneButtonText: "test-done",
  onBeforeCut: vi.fn(),
  onAfterCut: vi.fn(),
  onActivated: vi.fn(),
  onDeactivated: vi.fn(),
};

const actName = "testAct";
const scene1 = 1;
const { action, cut, currentActName, currentScene, isFloat } = useAct();

const scrollIntoViewMock = vi.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

const defaultSlots = defineComponent({ name: "DefaultSlots" });

describe("StagePlayScene before action", () => {
  beforeEach(() => {
    config.global.renderStubDefaultSlot = true;
  });

  afterEach(() => {
    config.global.renderStubDefaultSlot = false;
  });

  it("render with default options", () => {
    const wrapper = shallowMount(StagePlayScene, {
      props: { actName, scene: scene1 },
      slots: { default: defaultSlots },
      global: {
        stubs: { Teleport: true, Transition: true },
        provide: {
          [`${InjectionSpotlightOptions}`]: {
            spotlightPadding: defaultOptions.spotlightPadding,
          },
        },
      },
    });

    const defaultSlotsWrapper = wrapper.find("default-slots-stub");
    const spotlightWrapper = wrapper.find(".vue-stage-play__spotlight");
    const voiceOverWrapper = wrapper.find(".vue-stage-play__voice-over");
    const scrollMaskWrapper = wrapper.find(".vue-stage-play__scroll-mask");
    const clickMaskWrapper = wrapper.find(".vue-stage-play__click-mask");

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.classes()).toContain("vue-stage-play__scene");
    expect(wrapper.attributes("style")).toBe("position: relative;");

    expect(defaultSlotsWrapper.exists()).toBe(true);
    expect(defaultSlotsWrapper.attributes("style")).toBe(
      "pointer-events: auto;",
    );

    expect(spotlightWrapper.exists()).toBe(true);
    expect(spotlightWrapper.attributes("id")).toBe(
      `vue-stage-play__spotlight-${wrapper.props("actName")}-${wrapper.props(
        "scene",
      )}`,
    );
    expect(spotlightWrapper.attributes("style")).toBe(
      `position: absolute; scroll-margin: ${defaultOptions.cameraFollowOffset}px; top: -${defaultOptions.spotlightPadding}px; bottom: -${defaultOptions.spotlightPadding}px; left: -${defaultOptions.spotlightPadding}px; right: -${defaultOptions.spotlightPadding}px; pointer-events: none;`,
    );

    expect(voiceOverWrapper.exists()).toBe(false);
    expect(scrollMaskWrapper.exists()).toBe(false);
    expect(clickMaskWrapper.exists()).toBe(false);
  });

  it("render with global options", () => {
    const wrapper = shallowMount(StagePlayScene, {
      props: { actName, scene: scene1 },
      slots: { default: defaultSlots },
      global: {
        stubs: { Teleport: true, Transition: true },
        provide: {
          [`${InjectionGlobalOptions}`]: mockGlobalOptions,
          [`${InjectionSpotlightOptions}`]: {
            spotlightPadding: mockGlobalOptions.spotlightPadding,
          },
        },
      },
    });

    const defaultSlotsWrapper = wrapper.find("default-slots-stub");
    const spotlightWrapper = wrapper.find(".vue-stage-play__spotlight");
    const voiceOverWrapper = wrapper.find(".vue-stage-play__voice-over");
    const scrollMaskWrapper = wrapper.find(".vue-stage-play__scroll-mask");
    const clickMaskWrapper = wrapper.find(".vue-stage-play__click-mask");

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.classes()).toContain("vue-stage-play__scene");
    expect(wrapper.attributes("style")).toBe("position: relative;");

    expect(defaultSlotsWrapper.exists()).toBe(true);
    expect(defaultSlotsWrapper.attributes("style")).toBe(
      "pointer-events: auto;",
    );

    expect(spotlightWrapper.exists()).toBe(true);
    expect(spotlightWrapper.attributes("id")).toBe(
      `vue-stage-play__spotlight-${wrapper.props("actName")}-${wrapper.props(
        "scene",
      )}`,
    );
    expect(spotlightWrapper.attributes("style")).toBe(
      `position: absolute; scroll-margin: ${mockGlobalOptions.cameraFollowOffset}px; top: -${mockGlobalOptions.spotlightPadding}px; bottom: -${mockGlobalOptions.spotlightPadding}px; left: -${mockGlobalOptions.spotlightPadding}px; right: -${mockGlobalOptions.spotlightPadding}px; pointer-events: none;`,
    );

    expect(voiceOverWrapper.exists()).toBe(false);
    expect(scrollMaskWrapper.exists()).toBe(false);
    expect(clickMaskWrapper.exists()).toBe(false);
  });

  it("render with props", () => {
    const wrapper = shallowMount(StagePlayScene, {
      props: {
        actName,
        scene: scene1,
        cameraFollowOffset: 80,
      },
      slots: { default: defaultSlots },
      global: {
        stubs: { Teleport: true, Transition: true },
        provide: {
          [`${InjectionGlobalOptions}`]: mockGlobalOptions,
          [`${InjectionSpotlightOptions}`]: {
            spotlightPadding: mockGlobalOptions.spotlightPadding,
          },
        },
      },
    });

    const defaultSlotsWrapper = wrapper.find("default-slots-stub");
    const spotlightWrapper = wrapper.find(".vue-stage-play__spotlight");
    const voiceOverWrapper = wrapper.find(".vue-stage-play__voice-over");
    const scrollMaskWrapper = wrapper.find(".vue-stage-play__scroll-mask");
    const clickMaskWrapper = wrapper.find(".vue-stage-play__click-mask");

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.classes()).toContain("vue-stage-play__scene");
    expect(wrapper.attributes("style")).toBe("position: relative;");

    expect(defaultSlotsWrapper.exists()).toBe(true);
    expect(defaultSlotsWrapper.attributes("style")).toBe(
      "pointer-events: auto;",
    );

    expect(spotlightWrapper.exists()).toBe(true);
    expect(spotlightWrapper.attributes("id")).toBe(
      `vue-stage-play__spotlight-${wrapper.props("actName")}-${wrapper.props(
        "scene",
      )}`,
    );
    expect(spotlightWrapper.attributes("style")).toBe(
      `position: absolute; scroll-margin: ${wrapper.props(
        "cameraFollowOffset",
      )}px; top: -${mockGlobalOptions.spotlightPadding}px; bottom: -${
        mockGlobalOptions.spotlightPadding
      }px; left: -${mockGlobalOptions.spotlightPadding}px; right: -${
        mockGlobalOptions.spotlightPadding
      }px; pointer-events: none;`,
    );

    expect(voiceOverWrapper.exists()).toBe(false);
    expect(scrollMaskWrapper.exists()).toBe(false);
    expect(clickMaskWrapper.exists()).toBe(false);
  });
});

describe("StagePlayScene after action", () => {
  beforeEach(() => {
    config.global.renderStubDefaultSlot = true;
  });
  afterEach(() => {
    config.global.renderStubDefaultSlot = false;
    cut();
  });

  it("render with default options", async () => {
    const wrapper = shallowMount(StagePlayScene, {
      props: { actName, scene: scene1 },
      slots: { default: defaultSlots },
      global: {
        stubs: { Teleport: true, Transition: true },
        provide: {
          [`${InjectionSpotlightOptions}`]: {
            spotlightPadding: defaultOptions.spotlightPadding,
          },
        },
      },
    });

    action(actName, scene1);
    await nextTick();
    expect(isFloat.value).toBe(true);

    shallowMount(StagePlaySpotlight, {
      global: { stubs: { Teleport: true, Transition: true } },
    })
      .find(".vue-stage-play__spotlight-bulb")
      .trigger("transitionend");

    await nextTick();
    expect(isFloat.value).toBe(false);

    const defaultSlotsWrapper = wrapper.find("default-slots-stub");
    const spotlightWrapper = wrapper.find(".vue-stage-play__spotlight");
    const voiceOverWrapper = wrapper.find(".vue-stage-play__voice-over");
    const clickMaskWrapper = wrapper.find(".vue-stage-play__click-mask");

    expect(defaultSlotsWrapper.exists()).toBe(true);
    expect(defaultSlotsWrapper.attributes("style")).toBe(
      "pointer-events: none;",
    );

    expect(spotlightWrapper.exists()).toBe(true);
    expect(spotlightWrapper.attributes("id")).toBe(
      `vue-stage-play__spotlight-${wrapper.props("actName")}-${wrapper.props(
        "scene",
      )}`,
    );
    expect(spotlightWrapper.attributes("style")).toBe(
      `position: absolute; scroll-margin: ${defaultOptions.cameraFollowOffset}px; top: -${defaultOptions.spotlightPadding}px; bottom: -${defaultOptions.spotlightPadding}px; left: -${defaultOptions.spotlightPadding}px; right: -${defaultOptions.spotlightPadding}px; pointer-events: none;`,
    );

    expect(voiceOverWrapper.exists()).toBe(true);
    expect(voiceOverWrapper.attributes("style")).toBe(
      `position: absolute; z-index: 99996; color: #292929; pointer-events: auto; ${
        voiceOverStyle[defaultOptions.voiceOverPlacement][
          defaultOptions.voiceOverAlign
        ]
      }`,
    );
    expect(
      voiceOverWrapper.find(".default__voice-over").attributes("style"),
    ).toContain(`width: ${defaultOptions.voiceOverWidth}px;`);
    expect(
      voiceOverWrapper.find(".default__voice-over__header__content").text(),
    ).toBe(defaultOptions.voiceOverTitle);
    expect(voiceOverWrapper.find(".default__voice-over__body").text()).toBe(
      defaultOptions.voiceOverContent,
    );
    expect(
      voiceOverWrapper.find(".default__voice-over__footer__btn").text(),
    ).toBe(defaultOptions.voiceOverDoneButtonText);

    expect(clickMaskWrapper.exists()).toBe(true);
  });

  it("render with global options", async () => {
    const wrapper = shallowMount(StagePlayScene, {
      props: { actName, scene: scene1 },
      slots: { default: defaultSlots },
      global: {
        stubs: { Teleport: true, Transition: true },
        provide: {
          [`${InjectionGlobalOptions}`]: mockGlobalOptions,
          [`${InjectionSpotlightOptions}`]: {
            spotlightPadding: mockGlobalOptions.spotlightPadding,
          },
        },
      },
    });

    action(actName, scene1);
    await nextTick();
    expect(isFloat.value).toBe(true);

    shallowMount(StagePlaySpotlight, {
      global: { stubs: { Teleport: true, Transition: true } },
    })
      .find(".vue-stage-play__spotlight-bulb")
      .trigger("transitionend");

    await nextTick();
    expect(isFloat.value).toBe(false);

    const defaultSlotsWrapper = wrapper.find("default-slots-stub");
    const spotlightWrapper = wrapper.find(".vue-stage-play__spotlight");
    const voiceOverWrapper = wrapper.find(".vue-stage-play__voice-over");
    const clickMaskWrapper = wrapper.find(".vue-stage-play__click-mask");

    expect(defaultSlotsWrapper.exists()).toBe(true);
    expect(defaultSlotsWrapper.attributes("style")).toBe(
      "pointer-events: none;",
    );

    expect(spotlightWrapper.exists()).toBe(true);
    expect(spotlightWrapper.attributes("id")).toBe(
      `vue-stage-play__spotlight-${wrapper.props("actName")}-${wrapper.props(
        "scene",
      )}`,
    );
    expect(spotlightWrapper.attributes("style")).toBe(
      `position: absolute; scroll-margin: ${mockGlobalOptions.cameraFollowOffset}px; top: -${mockGlobalOptions.spotlightPadding}px; bottom: -${mockGlobalOptions.spotlightPadding}px; left: -${mockGlobalOptions.spotlightPadding}px; right: -${mockGlobalOptions.spotlightPadding}px; pointer-events: none;`,
    );

    expect(voiceOverWrapper.exists()).toBe(true);
    expect(voiceOverWrapper.attributes("style")).toBe(
      `position: absolute; z-index: 99996; color: #292929; pointer-events: auto; ${
        voiceOverStyle[mockGlobalOptions.voiceOverPlacement][
          mockGlobalOptions.voiceOverAlign
        ]
      }`,
    );
    expect(
      voiceOverWrapper.find(".default__voice-over").attributes("style"),
    ).toContain(`width: ${mockGlobalOptions.voiceOverWidth}px;`);
    expect(
      voiceOverWrapper.find(".default__voice-over__header__content").text(),
    ).toBe(mockGlobalOptions.voiceOverTitle);
    expect(voiceOverWrapper.find(".default__voice-over__body").text()).toBe(
      mockGlobalOptions.voiceOverContent,
    );
    expect(
      voiceOverWrapper.find(".default__voice-over__footer__btn").text(),
    ).toBe(mockGlobalOptions.voiceOverDoneButtonText);

    expect(clickMaskWrapper.exists()).toBe(true);
  });

  it("render with props", async () => {
    const wrapper = shallowMount(StagePlayScene, {
      props: {
        actName,
        scene: scene1,
        cameraFollowOffset: 80,
        voiceOverWidth: 500,
        voiceOverPlacement: "right",
        voiceOverAlign: "end",
        voiceOverTitle: "prop-title",
        voiceOverContent: "prop-content",
        voiceOverPrevButtonText: "prop-prev",
        voiceOverNextButtonText: "prop-next",
        voiceOverDoneButtonText: "prop-done",
      },
      slots: { default: defaultSlots },
      global: {
        stubs: { Teleport: true, Transition: true },
        provide: {
          [`${InjectionGlobalOptions}`]: mockGlobalOptions,
          [`${InjectionSpotlightOptions}`]: {
            spotlightPadding: mockGlobalOptions.spotlightPadding,
          },
        },
      },
    });

    action(actName, scene1);
    await nextTick();
    expect(isFloat.value).toBe(true);

    shallowMount(StagePlaySpotlight, {
      global: { stubs: { Teleport: true, Transition: true } },
    })
      .find(".vue-stage-play__spotlight-bulb")
      .trigger("transitionend");

    await nextTick();
    expect(isFloat.value).toBe(false);

    const defaultSlotsWrapper = wrapper.find("default-slots-stub");
    const spotlightWrapper = wrapper.find(".vue-stage-play__spotlight");
    const voiceOverWrapper = wrapper.find(".vue-stage-play__voice-over");
    const clickMaskWrapper = wrapper.find(".vue-stage-play__click-mask");

    expect(defaultSlotsWrapper.exists()).toBe(true);
    expect(defaultSlotsWrapper.attributes("style")).toBe(
      "pointer-events: none;",
    );

    expect(spotlightWrapper.exists()).toBe(true);
    expect(spotlightWrapper.attributes("id")).toBe(
      `vue-stage-play__spotlight-${wrapper.props("actName")}-${wrapper.props(
        "scene",
      )}`,
    );
    expect(spotlightWrapper.attributes("style")).toBe(
      `position: absolute; scroll-margin: ${wrapper.props(
        "cameraFollowOffset",
      )}px; top: -${mockGlobalOptions.spotlightPadding}px; bottom: -${
        mockGlobalOptions.spotlightPadding
      }px; left: -${mockGlobalOptions.spotlightPadding}px; right: -${
        mockGlobalOptions.spotlightPadding
      }px; pointer-events: none;`,
    );

    expect(voiceOverWrapper.exists()).toBe(true);
    expect(voiceOverWrapper.attributes("style")).toBe(
      `position: absolute; z-index: 99996; color: #292929; pointer-events: auto; ${
        voiceOverStyle[wrapper.props("voiceOverPlacement")][
          wrapper.props("voiceOverAlign")
        ]
      }`,
    );
    expect(
      voiceOverWrapper.find(".default__voice-over").attributes("style"),
    ).toContain(`width: ${wrapper.props("voiceOverWidth")}px;`);
    expect(
      voiceOverWrapper.find(".default__voice-over__header__content").text(),
    ).toBe(wrapper.props("voiceOverTitle"));
    expect(voiceOverWrapper.find(".default__voice-over__body").text()).toBe(
      wrapper.props("voiceOverContent"),
    );
    expect(
      voiceOverWrapper.find(".default__voice-over__footer__btn").text(),
    ).toBe(wrapper.props("voiceOverDoneButtonText"));

    expect(clickMaskWrapper.exists()).toBe(true);
  });

  it("voiceOver slots render", async () => {
    const wrapper = shallowMount(StagePlayScene, {
      props: { actName, scene: scene1 },
      slots: {
        default: defaultSlots,
        voiceOver: `<div class="voice-over-slots">voice-over-slots</div>`,
      },
      global: {
        stubs: { Teleport: true, Transition: true },
        provide: {
          [`${InjectionGlobalOptions}`]: mockGlobalOptions,
          [`${InjectionSpotlightOptions}`]: {
            spotlightPadding: mockGlobalOptions.spotlightPadding,
          },
        },
      },
    });

    action(actName, scene1);
    await nextTick();
    expect(isFloat.value).toBe(true);

    shallowMount(StagePlaySpotlight, {
      global: { stubs: { Teleport: true, Transition: true } },
    })
      .find(".vue-stage-play__spotlight-bulb")
      .trigger("transitionend");

    await nextTick();
    expect(isFloat.value).toBe(false);

    const voiceOverSlotsWrapper = wrapper.find(".voice-over-slots");
    expect(voiceOverSlotsWrapper.exists()).toBe(true);
    expect(voiceOverSlotsWrapper.text()).toBe("voice-over-slots");
  });

  it("voiceOver inner slots render", async () => {
    const wrapper = shallowMount(StagePlayScene, {
      props: { actName, scene: scene1 },
      slots: {
        default: defaultSlots,
        voHeader: `<div class="voice-over-header">voice-over-header</div>`,
        voCloseIcon: `<div class="voice-over-voCloseIcon">voice-over-voCloseIcon</div>`,
        voBody: `<div class="voice-over-body">voice-over-body</div>`,
        voFooter: `<div class="voice-over-footer">voice-over-footer</div>`,
        voFooterButton: `<div class="voice-over-voFooterButton">voice-over-voFooterButton</div>`,
      },
      global: {
        stubs: { Teleport: true, Transition: true },
        provide: {
          [`${InjectionGlobalOptions}`]: mockGlobalOptions,
          [`${InjectionSpotlightOptions}`]: {
            spotlightPadding: mockGlobalOptions.spotlightPadding,
          },
        },
      },
    });

    action(actName, scene1);
    await nextTick();
    expect(isFloat.value).toBe(true);

    shallowMount(StagePlaySpotlight, {
      global: { stubs: { Teleport: true, Transition: true } },
    })
      .find(".vue-stage-play__spotlight-bulb")
      .trigger("transitionend");

    await nextTick();
    expect(isFloat.value).toBe(false);

    const voiceOverHeaderSlotsWrapper = wrapper.find(".voice-over-header");
    expect(voiceOverHeaderSlotsWrapper.exists()).toBe(true);
    expect(voiceOverHeaderSlotsWrapper.text()).toBe("voice-over-header");

    const voiceOverCloseSlotsWrapper = wrapper.find(".voice-over-voCloseIcon");
    expect(voiceOverCloseSlotsWrapper.exists()).toBe(true);
    expect(voiceOverCloseSlotsWrapper.text()).toBe("voice-over-voCloseIcon");

    const voiceOverBodySlotsWrapper = wrapper.find(".voice-over-body");
    expect(voiceOverBodySlotsWrapper.exists()).toBe(true);
    expect(voiceOverBodySlotsWrapper.text()).toBe("voice-over-body");

    const voiceOverFooterSlotsWrapper = wrapper.find(".voice-over-footer");
    expect(voiceOverFooterSlotsWrapper.exists()).toBe(true);
    expect(voiceOverFooterSlotsWrapper.text()).toBe("voice-over-footer");

    const voiceOverFooterButtonSlotsWrapper = wrapper.find(
      ".voice-over-voFooterButton",
    );
    expect(voiceOverFooterButtonSlotsWrapper.exists()).toBe(true);
    expect(voiceOverFooterButtonSlotsWrapper.text()).toBe(
      "voice-over-voFooterButton",
    );
  });

  it("cut by done button", async () => {
    const wrapper = shallowMount(StagePlayScene, {
      props: { actName, scene: scene1 },
      slots: { default: defaultSlots },
      global: {
        stubs: { Teleport: true, Transition: true },
        provide: {
          [`${InjectionSpotlightOptions}`]: {
            spotlightPadding: defaultOptions.spotlightPadding,
          },
        },
      },
    });

    action(actName, scene1);
    await nextTick();
    expect(isFloat.value).toBe(true);

    shallowMount(StagePlaySpotlight, {
      global: { stubs: { Teleport: true, Transition: true } },
    })
      .find(".vue-stage-play__spotlight-bulb")
      .trigger("transitionend");

    await nextTick();
    expect(isFloat.value).toBe(false);

    const doneButtonWrapper = wrapper.find(".default__voice-over__footer__btn");
    doneButtonWrapper.trigger("click");
    expect(currentActName.value).toBeUndefined();
    expect(currentScene.value).toBeUndefined();

    await nextTick();
    expect(isFloat.value).toBe(true);
  });

  it("cut by click mask", async () => {
    const wrapper = shallowMount(StagePlayScene, {
      props: { actName, scene: scene1 },
      slots: { default: defaultSlots },
      global: {
        stubs: { Teleport: true, Transition: true },
        provide: {
          [`${InjectionSpotlightOptions}`]: {
            spotlightPadding: defaultOptions.spotlightPadding,
          },
        },
      },
    });

    action(actName, scene1);
    await nextTick();
    expect(isFloat.value).toBe(true);

    shallowMount(StagePlaySpotlight, {
      global: { stubs: { Teleport: true, Transition: true } },
    })
      .find(".vue-stage-play__spotlight-bulb")
      .trigger("transitionend");

    await nextTick();
    expect(isFloat.value).toBe(false);

    const clickMaskWrapper = wrapper.find(".vue-stage-play__click-mask");
    clickMaskWrapper.trigger("click");
    expect(currentActName.value).toBeUndefined();
    expect(currentScene.value).toBeUndefined();

    await nextTick();
    expect(isFloat.value).toBe(true);
  });

  it("should not cut by click mask when props.allowLeave is false", async () => {
    const wrapper = shallowMount(StagePlayScene, {
      props: { actName, scene: scene1, allowLeave: false },
      slots: { default: defaultSlots },
      global: {
        stubs: { Teleport: true, Transition: true },
        provide: {
          [`${InjectionGlobalOptions}`]: mockGlobalOptions,
          [`${InjectionSpotlightOptions}`]: {
            spotlightPadding: defaultOptions.spotlightPadding,
          },
        },
      },
    });

    action(actName, scene1);
    await nextTick();
    expect(isFloat.value).toBe(true);

    shallowMount(StagePlaySpotlight, {
      global: { stubs: { Teleport: true, Transition: true } },
    })
      .find(".vue-stage-play__spotlight-bulb")
      .trigger("transitionend");

    await nextTick();
    expect(isFloat.value).toBe(false);

    const clickMaskWrapper = wrapper.find(".vue-stage-play__click-mask");
    clickMaskWrapper.trigger("click");
    expect(currentActName.value).toBe(actName);
    expect(currentScene.value).toBe(scene1);

    expect(isFloat.value).toBe(false);
    expect(mockGlobalOptions.onDeactivated).toHaveBeenCalled();
  });
});
