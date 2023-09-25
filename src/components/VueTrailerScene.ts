import type { DefineComponent, StyleValue } from "vue";
import {
  h,
  defineComponent,
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { SceneProps } from "../types";
import { InjectionSpotlightOptions } from "../constants";
import { useAct } from "../composables/act";
import { useBodyScrollFixed } from "../composables/bodyScrollFixed";
import { useWindowSize, useElementBounding } from "@vueuse/core";
import "../scene.scss";

export const VueTrailerScene = defineComponent({
  name: "VueTrailerScene",
  props: {
    actName: {
      type: String,
      required: true,
    },
    sceneNumber: {
      type: Number,
      required: true,
    },

    cameraFollow: {
      type: Boolean,
      default: true,
    },
    cameraFollowOptions: {
      type: Object as () => ScrollIntoViewOptions,
      default: () => ({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      }),
    },
    cameraFixAfterFollow: {
      type: Boolean,
      default: true,
    },

    voiceOverPlacement: {
      type: String as () => "top" | "bottom" | "left" | "right",
      default: "left",
    },
    voiceOverAutoPlacement: {
      type: Boolean,
      default: true,
    },
    voiceOverAlign: {
      type: String as () => "start" | "center" | "end",
      default: "center",
    },
    voiceOverWidth: {
      type: Number,
      default: 300,
    },
    voiceOverTitle: {
      type: String,
      default: "Voice Over",
    },
    voiceOverContent: {
      type: String,
      default:
        "It takes a strong man to save himself,\nand a great man to save another.",
    },
    voiceOverPrevButtonText: {
      type: String,
      default: "Back",
    },
    voiceOverNextButtonText: {
      type: String,
      default: "Next",
    },
    voiceOverDoneButtonText: {
      type: String,
      default: "Done",
    },
  },
  setup(props, { slots }) {
    const spotlight = ref<HTMLElement | null>(null);
    const voiceOver = ref<HTMLElement | null>(null);

    const {
      actorWalkIn,
      currentActName,
      hasPrevScene,
      hasNextScene,
      currentSceneNumber,
      currentSceneIndex,
      totalSceneCount,
      addScene,
      removeScene,
      nextScene,
      prevScene,
      jumpToScene,
      cut,
    } = useAct(props.actName);

    const slotProp = reactive({
      hasPrevScene,
      hasNextScene,
      currentSceneNumber,
      currentSceneIndex,
      totalSceneCount,
      addScene,
      removeScene,
      nextScene,
      prevScene,
      jumpToScene,
      cut,
    });

    const isCurrentScene = computed(() => {
      return (
        currentActName.value === props.actName &&
        currentSceneNumber.value === props.sceneNumber
      );
    });

    const defaultVoiceOverStyle = computed<StyleValue>(() => {
      return {
        width: `${props.voiceOverWidth}px`,
      };
    });

    const spotlightConfig = inject(InjectionSpotlightOptions);
    const spotlightStyle = computed<StyleValue>(() => {
      return {
        inset: `-${spotlightConfig?.padding || 0}px`,
        borderRadius: `${spotlightConfig?.borderRadius || 0}px`,
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
      if (!props.voiceOverAutoPlacement) return props.voiceOverPlacement;

      let possiblePositions: string[] = [];
      switch (props.voiceOverPlacement) {
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

      return possiblePositions[0] || props.voiceOverPlacement;
    });

    const isScrollFixed = ref(false);
    const { fixed, reset } = useBodyScrollFixed();

    function smoothScroll(el: HTMLElement): Promise<void> {
      return new Promise((resolve) => {
        let same = 0;
        let lastPos: number;

        el.scrollIntoView(props.cameraFollowOptions as ScrollIntoViewOptions);
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

    watch(spotlight, async (val) => {
      reset();
      if (!val) return;

      actorWalkIn(val);
      if (props.cameraFollow) {
        isScrollFixed.value = true;
        await smoothScroll(val);
        isScrollFixed.value = false;
      }

      if (props.cameraFixAfterFollow) fixed();
    });

    onMounted(() => {
      addScene(props.sceneNumber);
    });

    onBeforeUnmount(() => {
      cut();
      removeScene(props.sceneNumber);
    });

    return () => {
      return h(
        "div",
        {
          class: "vue-trailer__scene",
          style: { position: "relative" },
        },
        [
          slots.default?.(slotProp),
          isCurrentScene.value &&
            h(
              "div",
              {
                id: `vue-trailer__spotlight-${props.actName}-${props.sceneNumber}`,
                class: "vue-trailer__spotlight",
                ref: spotlight,
                style: spotlightStyle.value,
              },
              [
                h(
                  "div",
                  {
                    class: [
                      "vue-trailer__voice-over",
                      autoVoiceOverPlacement.value,
                      props.voiceOverAlign,
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
                                  class: "efault__voice-over__header__content",
                                },
                                props.voiceOverTitle,
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
                              h("div", null, props.voiceOverContent),
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
                                { class: "default__voice-over__footer__btns" },
                                [
                                  hasPrevScene.value &&
                                    h(
                                      "button",
                                      {
                                        class:
                                          "default__voice-over__footer__btn",
                                        onClick: () => prevScene(),
                                      },
                                      props.voiceOverPrevButtonText,
                                    ),
                                  hasNextScene.value &&
                                    h(
                                      "button",
                                      {
                                        class:
                                          "default__voice-over__footer__btn",
                                        onClick: () => nextScene(),
                                      },
                                      props.voiceOverNextButtonText,
                                    ),
                                  !hasNextScene.value &&
                                    h(
                                      "button",
                                      {
                                        class:
                                          "default__voice-over__footer__btn",
                                        onClick: () => cut(),
                                      },
                                      props.voiceOverDoneButtonText,
                                    ),
                                ],
                              ),
                          ]),
                        ],
                      ),
                  ],
                ),
              ],
            ),
        ],
      );
    };
  },
}) as DefineComponent<SceneProps>;
