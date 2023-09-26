/* eslint-disable vue/require-default-prop */
import type { DefineComponent, PropType, StyleValue } from "vue";
import {
  h,
  defineComponent,
  computed,
  inject,
  onBeforeUnmount,
  reactive,
  ref,
  watch,
  Teleport,
} from "vue";
import { SceneProps, ResolvedSceneProps, GlobalOptions } from "../types";
import {
  InjectionGlobalOptions,
  InjectionSpotlightOptions,
} from "../constants";
import { defaultOptions } from "../options";
import { useAct } from "../composables/act";
import { useBodyScrollFixed } from "../composables/bodyScrollFixed";
import { useWindowSize, useElementBounding } from "@vueuse/core";
import "../scene.scss";

export const StagePlayScene = defineComponent({
  name: "StagePlayScene",
  props: {
    actName: {
      type: String,
      required: true,
    },
    sceneNumber: {
      type: Number,
      required: true,
    },
    tag: {
      type: String,
      required: false,
      default: "div",
    },
    skip: {
      type: Boolean,
      required: false,
      default: false,
    },

    allowInteract: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    allowLeave: {
      type: Boolean,
      required: false,
      default: undefined,
    },

    cameraFollow: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    cameraFollowOffset: {
      type: Number,
      required: false,
    },
    cameraFollowOptions: {
      type: Object as () => ScrollIntoViewOptions,
      required: false,
    },
    cameraFixAfterFollow: {
      type: Boolean,
      required: false,
      default: undefined,
    },

    voiceOverPlacement: {
      type: String as () => "top" | "bottom" | "left" | "right",
      required: false,
    },
    voiceOverAutoPlacement: {
      type: Boolean,
      required: false,
      default: undefined,
    },
    voiceOverAlign: {
      type: String as () => "start" | "center" | "end",
      required: false,
    },
    voiceOverWidth: {
      type: Number,
      required: false,
    },
    voiceOverTitle: {
      type: String,
      required: false,
    },
    voiceOverContent: {
      type: String,
      required: false,
    },
    voiceOverPrevButtonText: {
      type: String,
      required: false,
    },
    voiceOverNextButtonText: {
      type: String,
      required: false,
    },
    voiceOverDoneButtonText: {
      type: String,
      required: false,
    },

    onBeforeCut: {
      type: Function as PropType<() => void>,
      required: false,
    },
    onAfterCut: {
      type: Function as PropType<() => void>,
      required: false,
    },
    onActivated: {
      type: Function as PropType<() => void>,
      required: false,
    },
    onDeactivated: {
      type: Function as PropType<() => void>,
      required: false,
    },
  },
  setup(props, { slots }) {
    const spotlight = ref<HTMLElement | null>(null);
    const voiceOver = ref<HTMLElement | null>(null);

    const globalOptions = inject(InjectionGlobalOptions, {});
    const spotlightOptions = inject(InjectionSpotlightOptions);
    const localOptions = ref<GlobalOptions>({});
    const options = computed<ResolvedSceneProps>(() => ({
      ...defaultOptions,
      ...globalOptions,
      ...spotlightOptions,
      ...localOptions.value,
      actName: props.actName,
      sceneNumber: props.sceneNumber,
      skip: props.skip,
      tag: props.tag,
    }));

    function setLocalOptions(options: GlobalOptions = {}) {
      localOptions.value = JSON.parse(JSON.stringify(options));
    }

    watch(
      () => props,
      async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { actName, sceneNumber, skip, tag, ...options } = props;
        setLocalOptions(options);
      },
      { deep: true, immediate: true },
    );

    const {
      currentActName,
      currentAct,
      currentSceneIndex,
      currentSceneNumber,
      hasPrevScene,
      hasNextScene,
      totalSceneCount,

      actorWalkIn,
      action,
      cut: _cut,
      addScene,
      removeScene,
      nextScene,
      prevScene,
      jumpToScene,
    } = useAct();

    function cut() {
      options.value.onBeforeCut({
        currentActName: currentActName.value,
        currentAct: currentAct.value,
        currentSceneIndex: currentSceneIndex.value,
        currentSceneNumber: currentSceneNumber.value,
        hasPrevScene: hasPrevScene.value,
        hasNextScene: hasNextScene.value,
        totalSceneCount: totalSceneCount.value,
      });
      _cut();
      options.value.onAfterCut({
        currentActName: currentActName.value,
        currentAct: currentAct.value,
        currentSceneIndex: currentSceneIndex.value,
        currentSceneNumber: currentSceneNumber.value,
        hasPrevScene: hasPrevScene.value,
        hasNextScene: hasNextScene.value,
        totalSceneCount: totalSceneCount.value,
      });
    }

    const slotProp = reactive({
      currentActName,
      currentAct,
      currentSceneIndex,
      currentSceneNumber,
      hasPrevScene,
      hasNextScene,
      totalSceneCount,
      action,
      cut,
      nextScene,
      prevScene,
      jumpToScene,
    });

    const isScrollFixed = ref(false);

    const isCurrentScene = computed(() => {
      return (
        currentActName.value === options.value.actName &&
        currentSceneNumber.value === options.value.sceneNumber
      );
    });

    const sceneStyle = computed<StyleValue>(() => {
      return {
        zIndex: isCurrentScene.value ? "99998" : "",
      };
    });

    const spotlightStyle = computed<StyleValue>(() => {
      return {
        scrollMargin: `${options.value.cameraFollowOffset}px`,
        inset: `-${options.value.spotlightPadding || 0}px`,
        borderRadius: `${options.value.spotlightBorderRadius || 0}px`,
        overflow: "none",
      };
    });

    const defaultVoiceOverStyle = computed<StyleValue>(() => {
      return {
        width: `${options.value.voiceOverWidth}px`,
      };
    });

    const {
      top: spotlightTop,
      bottom: spotlightBottom,
      left: spotlightLeft,
      right: spotlightRight,
    } = useElementBounding(spotlight);

    const { width: voWidth, height: voHeight } = useElementBounding(voiceOver);

    const { width: windowWidth, height: windowHeight } = useWindowSize();

    const autoVoiceOverPlacement = computed<string>(() => {
      if (!options.value.voiceOverAutoPlacement)
        return options.value.voiceOverPlacement;

      let possiblePositions: string[] = [];
      switch (options.value.voiceOverPlacement) {
        case "top":
          possiblePositions = ["top", "bottom", "left", "right"];
          break;
        case "bottom":
          possiblePositions = ["bottom", "top", "left", "right"];
          break;
        case "left":
          possiblePositions = ["left", "top", "bottom", "right"];
          break;
        case "right":
          possiblePositions = ["right", "top", "bottom", "left"];
          break;
      }

      if (spotlightBottom.value + voHeight.value > windowHeight.value) {
        possiblePositions = possiblePositions.filter(
          (position) => position !== "bottom",
        );
      }

      if (spotlightTop.value - voHeight.value < 0) {
        possiblePositions = possiblePositions.filter(
          (position) => position !== "top",
        );
      }

      if (spotlightLeft.value - voWidth.value < 0) {
        possiblePositions = possiblePositions.filter(
          (position) => position !== "left",
        );
      }

      if (spotlightRight.value + voWidth.value > windowWidth.value) {
        possiblePositions = possiblePositions.filter(
          (position) => position !== "right",
        );
      }

      if (
        spotlightTop.value < 0 ||
        spotlightBottom.value > windowHeight.value
      ) {
        possiblePositions = possiblePositions.filter(
          (position) => position !== "right" && position !== "left",
        );
      }

      if (spotlightLeft.value < 0 || spotlightRight.value > windowWidth.value) {
        possiblePositions = possiblePositions.filter(
          (position) => position !== "top" && position !== "bottom",
        );
      }

      return possiblePositions[0] || options.value.voiceOverPlacement;
    });

    const { fixed, reset } = useBodyScrollFixed();

    function smoothScroll(el: HTMLElement): Promise<void> {
      return new Promise((resolve) => {
        let same = 0;
        let lastPos: number;

        el.scrollIntoView(
          options.value.cameraFollowOptions as ScrollIntoViewOptions,
        );
        requestAnimationFrame(check);

        function check() {
          const newPos = el.getBoundingClientRect().top;
          if (newPos === lastPos) {
            if (same++ > 2) {
              return resolve();
            }
          } else {
            same = 0;
            lastPos = newPos;
          }

          requestAnimationFrame(check);
        }
      });
    }

    watch(
      () => ({
        actName: options.value.actName,
        sceneNumber: options.value.sceneNumber,
        skip: options.value.skip,
      }),
      (newVal, oldVal) => {
        if (oldVal?.actName && oldVal?.sceneNumber) {
          removeScene(oldVal.actName, oldVal.sceneNumber);
        }
        if (newVal?.actName && newVal?.sceneNumber && !newVal?.skip) {
          addScene(newVal.actName, newVal.sceneNumber);
        }
      },
      { deep: true, immediate: true },
    );

    watch(spotlight, async (val) => {
      reset();
      if (!val) {
        options.value.onDeactivated({
          currentActName: currentActName.value,
          currentAct: currentAct.value,
          currentSceneIndex: currentSceneIndex.value,
          currentSceneNumber: currentSceneNumber.value,
          hasPrevScene: hasPrevScene.value,
          hasNextScene: hasNextScene.value,
          totalSceneCount: totalSceneCount.value,
        });
        return;
      }

      actorWalkIn(val);
      if (options.value.cameraFollow) {
        isScrollFixed.value = true;
        await smoothScroll(val);
        isScrollFixed.value = false;
      }

      if (options.value.cameraFixAfterFollow) fixed();
      options.value.onActivated({
        currentActName: currentActName.value,
        currentAct: currentAct.value,
        currentSceneIndex: currentSceneIndex.value,
        currentSceneNumber: currentSceneNumber.value,
        hasPrevScene: hasPrevScene.value,
        hasNextScene: hasNextScene.value,
        totalSceneCount: totalSceneCount.value,
      });
    });

    onBeforeUnmount(() => {
      cut();
      removeScene(options.value.actName, options.value.sceneNumber);
    });

    return () => {
      return h(
        options.value.tag,
        {
          class: [
            "vue-stage-play__scene",
            isCurrentScene.value && !options.value.allowInteract
              ? "noInteract"
              : "",
          ],
          style: sceneStyle.value,
        },
        [
          slots.default?.(slotProp),
          isCurrentScene.value
            ? h(
                "div",
                {
                  id: `vue-stage-play__spotlight-${options.value.actName}-${options.value.sceneNumber}`,
                  class: "vue-stage-play__spotlight",
                  ref: spotlight,
                  style: spotlightStyle.value,
                },
                [
                  h(
                    "div",
                    {
                      class: [
                        "vue-stage-play__voice-over",
                        autoVoiceOverPlacement.value,
                        options.value.voiceOverAlign,
                      ],
                      ref: voiceOver,
                    },
                    [
                      slots.voiceOver?.() ||
                        h(
                          "div",
                          {
                            class: "default__voice-over",
                            style: defaultVoiceOverStyle.value,
                          },
                          [
                            h("div", { class: "default__voice-over__header" }, [
                              slots.voHeader?.() ||
                                h(
                                  "div",
                                  {
                                    class:
                                      "efault__voice-over__header__content",
                                  },
                                  options.value.voiceOverTitle,
                                ),
                              slots.voCloseIcon?.() ||
                                h(
                                  "svg",
                                  {
                                    class: "default__voice-over__header__close",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    width: "16",
                                    height: "16",
                                    viewBox: "0 0 16 16",
                                    fill: "currentColor",
                                    onClick: () => cut(),
                                  },
                                  [
                                    h("path", {
                                      d: "M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z",
                                    }),
                                  ],
                                ),
                            ]),
                            h("div", { class: "default__voice-over__body" }, [
                              slots.voBody?.() ||
                                options.value.voiceOverContent,
                            ]),
                            h("div", { class: "default__voice-over__footer" }, [
                              slots.voFooterScene?.() ||
                                h(
                                  "div",
                                  {
                                    class: "default__voice-over__footer__scene",
                                  },
                                  currentSceneIndex.value !== undefined &&
                                    `${currentSceneIndex.value + 1} / ${
                                      totalSceneCount.value
                                    }`,
                                ),
                              slots.voFooterButton?.() ||
                                h(
                                  "div",
                                  {
                                    class: "default__voice-over__footer__btns",
                                  },
                                  [
                                    hasPrevScene.value &&
                                      h(
                                        "button",
                                        {
                                          class:
                                            "default__voice-over__footer__btn",
                                          onClick: () => prevScene(),
                                        },
                                        options.value.voiceOverPrevButtonText,
                                      ),
                                    hasNextScene.value &&
                                      h(
                                        "button",
                                        {
                                          class:
                                            "default__voice-over__footer__btn",
                                          onClick: () => nextScene(),
                                        },
                                        options.value.voiceOverNextButtonText,
                                      ),
                                    !hasNextScene.value &&
                                      h(
                                        "button",
                                        {
                                          class:
                                            "default__voice-over__footer__btn",
                                          onClick: () => cut(),
                                        },
                                        options.value.voiceOverDoneButtonText,
                                      ),
                                  ],
                                ),
                            ]),
                          ],
                        ),
                    ],
                  ),
                ],
              )
            : undefined,
          isCurrentScene.value && isScrollFixed.value
            ? h(
                "div",
                {
                  class: "vue-stage-play__scene__scroll-mask",
                  style: {
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "150vw",
                    height: "100vh",
                    zIndex: "99999",
                    overflow: "auto",
                    overscrollBehavior: "none",
                  },
                },
                [h("div", { style: { width: "100%", height: "300%" } })],
              )
            : undefined,
          isCurrentScene.value
            ? h(Teleport, { to: "body" }, [
                h("div", {
                  style: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: 99997,
                    width: "100vw",
                    height: "100vh",
                  },
                  onClick: () => {
                    options.value.allowLeave && cut();
                  },
                }),
              ])
            : undefined,
        ],
      );
    };
  },
}) as DefineComponent<SceneProps>;
