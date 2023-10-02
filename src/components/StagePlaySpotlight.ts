/* eslint-disable vue/require-default-prop */
import type { DefineComponent, StyleValue } from "vue";
import {
  h,
  defineComponent,
  computed,
  provide,
  ref,
  watch,
  Teleport,
  inject,
  Transition,
  nextTick,
} from "vue";
import { SpotlightProps, ResolvedSpotlightProps } from "../types";
import {
  InjectionGlobalOptions,
  InjectionSpotlightOptions,
} from "../constants";
import { defaultOptions } from "../options";
import { useStagePlay } from "../composables/act";
import { isClient, useElementBounding } from "@vueuse/core";

export const StagePlaySpotlight = defineComponent({
  name: "StagePlaySpotlight",
  props: {
    spotlightPadding: {
      type: Number,
      required: false,
    },
    spotlightBorderRadius: {
      type: Number,
      required: false,
    },
    spotlightDarkZoneColor: {
      type: String,
      required: false,
    },
  },
  setup(props, { slots }) {
    const { currentActName, currentActor } = useStagePlay();

    const globalOptions = inject(InjectionGlobalOptions, {});
    const localOptions = ref<SpotlightProps>({});
    const options = computed<ResolvedSpotlightProps>(() => ({
      ...defaultOptions,
      ...globalOptions,
      ...localOptions.value,
    }));

    function setLocalOptions(options: SpotlightProps = {}) {
      localOptions.value = JSON.parse(JSON.stringify(options));
    }

    watch(
      () => props,
      () => {
        setLocalOptions(props);
      },
      { deep: true, immediate: true },
    );

    provide(InjectionSpotlightOptions, {
      spotlightPadding: options.value.spotlightPadding,
      spotlightBorderRadius: options.value.spotlightBorderRadius,
    });

    const root = isClient
      ? document.documentElement || document.body
      : undefined;

    const isFloat = ref<boolean>(true);
    const isSpotlightShow = ref(false);

    watch(currentActName, () => {
      if (currentActName.value) isSpotlightShow.value = true;
    });

    const currentActorRef = ref<HTMLElement | null>(null);
    const { top, left, width, height } = useElementBounding(currentActorRef);

    watch(currentActor, (newVal) => {
      isFloat.value = true;
      if (newVal) {
        currentActorRef.value = newVal;
      } else if (!newVal && currentActName.value === undefined) {
        nextTick(() => {
          currentActorRef.value = null;
          isSpotlightShow.value = false;
        });
      }
    });

    function getEnterKeyframes() {
      return [{ opacity: 0 }, { opacity: 1 }];
    }

    function animateTransition(
      element: HTMLElement,
      done: () => void,
      keyframes: Keyframe[],
      options: KeyframeAnimationOptions & {
        duration: number;
        easing: string;
      },
    ) {
      const animation = element.animate(keyframes, options);
      animation.onfinish = () => {
        done();
      };
    }

    function enterTransition(element: HTMLElement, done: () => void) {
      const keyframes = getEnterKeyframes();
      const options = { duration: 600, easing: "ease" };
      animateTransition(element, done, keyframes, options);
    }

    function leaveTransition(element: HTMLElement, done: () => void) {
      const keyframes = getEnterKeyframes().reverse();
      const options = { duration: 600, easing: "ease" };
      animateTransition(element, done, keyframes, options);
    }

    const bulbStyle = computed<StyleValue>(() => {
      return {
        position: "absolute",

        top:
          !isFloat.value && currentActor.value
            ? "0"
            : `${top.value + (root?.scrollTop || 0)}px`,
        left:
          !isFloat.value && currentActor.value
            ? "0"
            : `${left.value + (root?.scrollLeft || 0)}px`,
        zIndex: 99995,

        width: width.value ? width.value + "px" : "100%",
        height: height.value ? height.value + "px" : "100%",
        borderRadius: `${options.value.spotlightBorderRadius}px`,

        boxShadow: `${options.value.spotlightDarkZoneColor} 0px 0px 0px 5000px`,
        transition: "all 0.6s ease",
        pointerEvents: "none",
      };
    });

    return () => {
      return [
        slots.default?.(),
        h(
          Teleport,
          {
            to:
              !isFloat.value && currentActor.value
                ? currentActor.value
                : "body",
          },
          h(
            Transition as any,
            {
              css: false,
              onEnter: enterTransition,
              onLeave: leaveTransition,
            },
            () => [
              isSpotlightShow.value
                ? h("div", {
                    class: "vue-stage-play__spotlight-bulb",
                    style: bulbStyle.value,
                    onTransitionend: () => {
                      isFloat.value = false;
                    },
                  })
                : null,
            ],
          ),
        ),
      ];
    };
  },
}) as DefineComponent<SpotlightProps>;
