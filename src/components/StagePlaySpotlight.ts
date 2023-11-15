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
} from "vue";
import { SpotlightProps, ResolvedSpotlightProps } from "../types";
import {
  InjectionGlobalOptions,
  InjectionSpotlightOptions,
} from "../constants";
import { defaultOptions } from "../options";
import { useAct } from "../composables/act";
import { useBodyScrollFixed } from "../composables/bodyScrollFixed";
import { useFadeTransition } from "../composables/fade";
import { useElementBounding } from "@vueuse/core";

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
    const { isLocate, currentActor } = useAct();
    const { enterTransition, leaveTransition } = useFadeTransition(600);

    const { isFixed } = useBodyScrollFixed();

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
    });

    const { top, left, width, height } = useElementBounding(currentActor);

    watch(currentActor, () => {
      isLocate.value = true;
    });

    const bulbStyle = computed<StyleValue>(() => {
      return {
        position: "absolute",
        zIndex: 99995,

        top: isFixed.value
          ? `calc(-1 * ${document.body.style.top} + ${top.value}px)`
          : `calc(${window.scrollY}px + ${top.value}px)`,
        left: isFixed.value
          ? `calc(-1 * ${document.body.style.left} + ${left.value}px)`
          : `calc(${window.scrollX}px + ${left.value}px)`,

        width: width.value ? width.value + "px" : "100%",
        height: height.value ? height.value + "px" : "100%",

        borderRadius: `${options.value.spotlightBorderRadius}px ${
          options.value.spotlightBorderRadius
        }px ${options.value.spotlightBorderRadius}px ${
          options.value.spotlightBorderRadius - 0.001
        }px`,
        boxShadow: `${options.value.spotlightDarkZoneColor} 0px 0px 0px 3000px`,

        transition: !isLocate.value ? undefined : "all 0.35s ease",
        pointerEvents: "none",
      };
    });

    return () => {
      return [
        slots.default?.(),
        h(
          Teleport,
          { to: "body" },
          h(
            Transition as any,
            {
              css: false,
              onEnter: enterTransition,
              onLeave: leaveTransition,
            },
            () => [
              currentActor?.value
                ? h("div", {
                    class: "vue-stage-play__spotlight-bulb",
                    style: bulbStyle.value,
                    onTransitionend: () => {
                      isLocate.value = false;
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
