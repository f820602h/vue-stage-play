/* eslint-disable vue/require-default-prop */
import type { PropType, SlotsType } from "vue";
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
  Transition,
} from "vue";
import { ResolvedSceneProps, GlobalOptions, ScopedProps } from "../types";
import {
  InjectionGlobalOptions,
  InjectionSpotlightOptions,
} from "../constants";
import { defaultOptions } from "../options";
import { useAct } from "../composables/act";
import { useBodyScrollFixed } from "../composables/bodyScrollFixed";
import { useFadeTransition } from "../composables/fade";
import { useWindowSize, useElementBounding } from "@vueuse/core";
import { smoothScroll, getPlacementStyle } from "../utils";

export const StagePlayScene = defineComponent({
  slots: Object as SlotsType<{
    default?: ScopedProps;
    voiceOver?: ScopedProps;
    voHeader?: ScopedProps;
    voCloseIcon?: ScopedProps;
    voBody?: ScopedProps;
    voFooter?: ScopedProps;
    voFooterButton?: ScopedProps;
  }>,
  name: "StagePlayScene",
  props: {
    actName: {
      type: String,
      required: true,
    },
    scene: {
      type: Number,
      required: true,
      validator: (val: number) => val >= 0,
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

    const { fixed, reset } = useBodyScrollFixed();
    const { enterTransition } = useFadeTransition(250);

    const globalOptions = inject(InjectionGlobalOptions, {});
    const spotlightOptions = inject(InjectionSpotlightOptions);
    const localOptions = ref<GlobalOptions>({});
    const options = computed<ResolvedSceneProps>(() => ({
      ...defaultOptions,
      ...globalOptions,
      ...spotlightOptions,
      ...localOptions.value,
      actName: props.actName,
      scene: props.scene,
      skip: props.skip,
      tag: props.tag,
    }));

    function setLocalOptions(options: GlobalOptions = {}): void {
      const _options: { [key: string]: any } = { ...options };
      for (const key in _options) {
        if (_options[key] === undefined) delete _options[key];
      }
      localOptions.value = _options;
    }

    watch(
      () => props,
      async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { actName, scene, skip, tag, ...other } = props;
        setLocalOptions(other);
      },
      { deep: true, immediate: true },
    );

    const {
      isFloat,
      currentActName,
      currentActSceneList,
      currentScene,
      currentSceneOrder,
      currentActor,
      hasPrevScene,
      hasNextScene,
      totalSceneCount,

      action: _action,
      cut: _cut,
      addScene,
      removeScene,
      prevScene,
      nextScene,
      jumpToScene,
    } = useAct();

    const isCurrentScene = computed(() => {
      return (
        currentActName.value === options.value.actName &&
        currentScene.value === options.value.scene
      );
    });

    function action(actName?: string, scene?: number): void {
      _action(actName || options.value.actName, scene);
    }

    async function cut(): Promise<void> {
      await options.value.onBeforeCut(scopedProps);
      _cut();
      await options.value.onAfterCut(scopedProps);
    }

    const scopedProps: ScopedProps = reactive({
      actName: options.value.actName,
      scene: options.value.scene,
      currentActName,
      currentActSceneList,
      currentScene,
      currentSceneOrder,
      currentActor,
      hasPrevScene,
      hasNextScene,
      totalSceneCount,
      isCurrentScene,
      action,
      cut,
      prevScene,
      nextScene,
      jumpToScene,
    });

    const {
      top: spotlightTop,
      bottom: spotlightBottom,
      left: spotlightLeft,
      right: spotlightRight,
    } = useElementBounding(spotlight);
    const { width: voWidth, height: voHeight } = useElementBounding(voiceOver);
    const { width: windowWidth, height: windowHeight } = useWindowSize();

    const voiceOverPlacement = computed<string>(() => {
      if (slots.default === undefined) {
        return "center";
      }

      if (!options.value.voiceOverAutoPlacement) {
        return options.value.voiceOverPlacement;
      }

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

    watch(
      () => ({
        actName: options.value.actName,
        scene: options.value.scene,
        skip: options.value.skip,
      }),
      (newVal, oldVal) => {
        if (JSON.stringify(newVal) === JSON.stringify(oldVal)) return;
        if (oldVal?.actName && oldVal?.scene) {
          removeScene(oldVal.actName, oldVal.scene);
        }
        if (newVal?.actName && newVal?.scene && !newVal?.skip) {
          addScene(newVal.actName, newVal.scene, spotlight);
        }
      },
      { deep: true, immediate: true },
    );

    watch(isCurrentScene, async (val) => {
      if (val) await options.value.onActivated(scopedProps);
      else await options.value.onDeactivated(scopedProps);
    });

    watch(isFloat, async (val) => {
      reset();
      if (val) return;
      else {
        if (
          isCurrentScene.value &&
          options.value.cameraFollow &&
          spotlight.value
        ) {
          await smoothScroll(
            spotlight.value,
            options.value.cameraFollowOptions,
          );
          if (options.value.cameraFixAfterFollow) fixed();
        }
      }
    });

    onBeforeUnmount(() => {
      if (isCurrentScene.value) cut();
      removeScene(options.value.actName, options.value.scene);
    });

    const isIconHover = ref(false);
    const isPrevButtonHover = ref(false);
    const isNextButtonHover = ref(false);
    const isDoneButtonHover = ref(false);

    return () => {
      return h(
        options.value.tag,
        {
          class: "vue-stage-play__scene",
          style: {
            position: slots.default
              ? isCurrentScene.value
                ? "relative"
                : undefined
              : "fixed",
            top: slots.default ? undefined : "50%",
            left: slots.default ? undefined : "50%",
            zIndex: slots.default
              ? isCurrentScene.value
                ? "99998"
                : undefined
              : "99998",
            transform: slots.default ? undefined : "translate(-50%, -50%)",
          },
        },
        [
          slots.default?.(scopedProps),
          h(
            "div",
            {
              id: `vue-stage-play__spotlight-${options.value.actName}-${options.value.scene}`,
              class: "vue-stage-play__spotlight",
              ref: spotlight,
              style: {
                position: "absolute",
                scrollMargin: `${options.value.cameraFollowOffset}px`,
                top: slots.default
                  ? `-${options.value.spotlightPadding || 0}px`
                  : "-1px",
                bottom: slots.default
                  ? `-${options.value.spotlightPadding || 0}px`
                  : "-1px",
                left: slots.default
                  ? `-${options.value.spotlightPadding || 0}px`
                  : "-1px",
                right: slots.default
                  ? `-${options.value.spotlightPadding || 0}px`
                  : "-1px",
                pointerEvents:
                  isCurrentScene.value && !options.value.allowInteract
                    ? undefined
                    : "none",
              },
            },
            [
              h(
                Transition as any,
                {
                  css: false,
                  onEnter: enterTransition,
                },
                () => [
                  isCurrentScene.value && !isFloat.value
                    ? h(
                        "div",
                        {
                          class: "vue-stage-play__voice-over",
                          style: {
                            position: "absolute",
                            zIndex: "99996",
                            color: "#292929",
                            pointerEvents: "auto",
                            ...getPlacementStyle(
                              voiceOverPlacement.value,
                              options.value.voiceOverAlign,
                            ),
                          },
                          ref: voiceOver,
                        },
                        [
                          slots.voiceOver?.(scopedProps) ||
                            h(
                              "div",
                              {
                                class: "default__voice-over",
                                style: {
                                  width: `${options.value.voiceOverWidth}px`,
                                  margin: "8px",
                                  borderRadius: "8px",
                                  boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
                                  backgroundColor: "#fff",
                                },
                              },
                              [
                                h(
                                  "div",
                                  {
                                    class: "default__voice-over__header",
                                    style: {
                                      position: "relative",
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      padding: "8px 12px",
                                      borderBottom: "1px solid #ddd",
                                      fontSize: "16px",
                                      fontWeight: "bold",
                                      lineHeight: "1",
                                    },
                                  },
                                  [
                                    slots.voHeader?.(scopedProps) ||
                                      h(
                                        "div",
                                        {
                                          class:
                                            "default__voice-over__header__content",
                                          style: {
                                            flexGrow: "1",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            lineHeight: "1.5",
                                          },
                                        },
                                        options.value.voiceOverTitle,
                                      ),
                                    slots.voCloseIcon?.(scopedProps) ||
                                      h(
                                        "svg",
                                        {
                                          class:
                                            "default__voice-over__header__close",
                                          style: {
                                            position: "relative",
                                            flexShrink: "0",
                                            right: "-4px",
                                            display: "block",
                                            width: "24px",
                                            height: "24px",
                                            color: isIconHover.value
                                              ? "#292929"
                                              : "#7e7e7e",
                                            cursor: "pointer",
                                            transition: "all 0.2s ease-in-out",
                                          },
                                          xmlns: "http://www.w3.org/2000/svg",
                                          width: "16",
                                          height: "16",
                                          viewBox: "0 0 16 16",
                                          fill: "currentColor",
                                          onMouseenter: () => {
                                            isIconHover.value = true;
                                          },
                                          onMouseleave: () => {
                                            isIconHover.value = false;
                                          },
                                          onClick: () => cut(),
                                        },
                                        [
                                          h("path", {
                                            d: "M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z",
                                          }),
                                        ],
                                      ),
                                  ],
                                ),
                                h(
                                  "div",
                                  {
                                    class: "default__voice-over__body",
                                    style: {
                                      position: "relative",
                                      boxSizing: "border-box",
                                      minHeight: "60px",
                                      padding: "12px",
                                      fontSize: "14px",
                                      lineHeight: "1.5",
                                      textAlign: "center",
                                      whiteSpace: "pre-wrap",
                                    },
                                  },
                                  [
                                    slots.voBody?.(scopedProps) ||
                                      options.value.voiceOverContent,
                                  ],
                                ),
                                h(
                                  "div",
                                  {
                                    class: "default__voice-over__footer",
                                    style: {
                                      position: "relative",
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      padding: "8px 12px",
                                      borderTop: "1px solid #ddd",
                                    },
                                  },
                                  [
                                    slots.voFooter?.(scopedProps) ||
                                      h(
                                        "div",
                                        {
                                          class:
                                            "default__voice-over__footer__scene",
                                          style: {
                                            fontSize: "14px",
                                            color: "#7e7e7e",
                                          },
                                        },
                                        `${currentSceneOrder.value + 1} / ${
                                          totalSceneCount.value
                                        }`,
                                      ),
                                    slots.voFooterButton?.(scopedProps) ||
                                      h(
                                        "div",
                                        {
                                          class:
                                            "default__voice-over__footer__btns",
                                          style: {
                                            display: "flex",
                                            gap: "8px",
                                          },
                                        },
                                        [
                                          hasPrevScene.value &&
                                            h(
                                              "button",
                                              {
                                                class:
                                                  "default__voice-over__footer__btn",
                                                style: {
                                                  padding: "6px 16px",
                                                  border: "1px solid #ddd",
                                                  borderRadius: "4px",
                                                  fontSize: "14px",
                                                  fontWeight: "normal",
                                                  lineHeight: "16px",
                                                  color: "#292929",
                                                  backgroundColor:
                                                    isPrevButtonHover.value
                                                      ? "#ddd"
                                                      : "#f1f1f1",
                                                  transition:
                                                    "all 0.2s ease-in-out",
                                                  cursor: "pointer",
                                                },
                                                onClick: () => prevScene(),
                                              },
                                              options.value
                                                .voiceOverPrevButtonText,
                                            ),
                                          hasNextScene.value &&
                                            h(
                                              "button",
                                              {
                                                class:
                                                  "default__voice-over__footer__btn",
                                                style: {
                                                  padding: "6px 16px",
                                                  border: "1px solid #ddd",
                                                  borderRadius: "4px",
                                                  fontSize: "14px",
                                                  fontWeight: "normal",
                                                  lineHeight: "16px",
                                                  color: "#292929",
                                                  backgroundColor:
                                                    isNextButtonHover.value
                                                      ? "#ddd"
                                                      : "#f1f1f1",
                                                  transition:
                                                    "all 0.2s ease-in-out",
                                                  cursor: "pointer",
                                                },
                                                onClick: () => nextScene(),
                                              },
                                              options.value
                                                .voiceOverNextButtonText,
                                            ),
                                          !hasNextScene.value &&
                                            h(
                                              "button",
                                              {
                                                class:
                                                  "default__voice-over__footer__btn",
                                                style: {
                                                  padding: "6px 16px",
                                                  border: "1px solid #ddd",
                                                  borderRadius: "4px",
                                                  fontSize: "14px",
                                                  fontWeight: "normal",
                                                  lineHeight: "16px",
                                                  color: "#292929",
                                                  backgroundColor:
                                                    isDoneButtonHover.value
                                                      ? "#ddd"
                                                      : "#f1f1f1",
                                                  transition:
                                                    "all 0.2s ease-in-out",
                                                  cursor: "pointer",
                                                },
                                                onClick: () => cut(),
                                              },
                                              options.value
                                                .voiceOverDoneButtonText,
                                            ),
                                        ],
                                      ),
                                  ],
                                ),
                              ],
                            ),
                        ],
                      )
                    : undefined,
                ],
              ),
            ],
          ),
          isCurrentScene.value && isFloat.value
            ? h(Teleport, { to: "body" }, [
                h(
                  "div",
                  {
                    class: "vue-stage-play__scroll-mask",
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
                ),
              ])
            : undefined,
          isCurrentScene.value
            ? h(Teleport, { to: "body" }, [
                h("div", {
                  class: "vue-stage-play__click-mask",
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
});
