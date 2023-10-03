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
import { useAct } from "../composables/act";
import { useFadeTransition } from "../composables/fade";
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
    const { isFloat, currentActName, currentActor } = useAct();
    const { enterTransition, leaveTransition } = useFadeTransition(600);

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

    const currentActorRef = ref<HTMLElement | null>(null);
    const { top, left, width, height } = useElementBounding(currentActorRef);

    watch(currentActor, (newVal) => {
      isFloat.value = true;
      if (newVal) {
        nextTick(() => {
          currentActorRef.value = newVal;
        });
      } else if (!newVal && currentActName.value === undefined) {
        nextTick(() => {
          currentActorRef.value = null;
        });
      }
    });

    const root = isClient
      ? document.documentElement || document.body
      : undefined;

    const bulbStyle = computed<StyleValue>(() => {
      return {
        position: "absolute",
        zIndex: 99995,

        top:
          !isFloat.value && currentActor.value
            ? "0"
            : `${top.value + (root?.scrollTop || 0)}px`,
        left:
          !isFloat.value && currentActor.value
            ? "0"
            : `${left.value + (root?.scrollLeft || 0)}px`,

        width: width.value ? width.value + "px" : "100%",
        height: height.value ? height.value + "px" : "100%",

        borderRadius: `${options.value.spotlightBorderRadius}px`,
        boxShadow: `${options.value.spotlightDarkZoneColor} 0px 0px 0px 5000px`,

        transition: "all 0.35s ease",
        pointerEvents: "none",
      };
    });

    return () => {
      return [
        slots.default?.(),
        h(
          Teleport,
          { to: (!isFloat.value && currentActor.value) || "body" },
          h(
            Transition as any,
            {
              css: false,
              onEnter: enterTransition,
              onLeave: leaveTransition,
            },
            () => [
              currentActorRef.value
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
