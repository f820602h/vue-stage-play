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

    const oldTop = ref(0);
    const oldLeft = ref(0);
    const oldWidth = ref("100%");
    const oldHeight = ref("100%");
    const root = isClient
      ? document.documentElement || document.body
      : undefined;

    const isFloat = ref<boolean>(true);
    const isSpotlightShow = ref(false);

    watch(currentActName, () => {
      if (currentActName.value) isSpotlightShow.value = true;
    });

    watch(currentActor, (newVal) => {
      isFloat.value = true;
      if (newVal) {
        const { top, left, width, height } = useElementBounding(
          currentActor.value,
        );
        oldTop.value = top.value;
        oldLeft.value = left.value;
        oldWidth.value = `${width.value}px`;
        oldHeight.value = `${height.value}px`;
      } else if (!newVal && currentActName.value === undefined) {
        nextTick(() => {
          isSpotlightShow.value = false;
          oldTop.value = 0;
          oldLeft.value = 0;
          oldWidth.value = "100%";
          oldHeight.value = "100%";
        });
      }
    });

    const bulbStyle = computed<StyleValue>(() => {
      return {
        position: "absolute",

        top: `${oldTop.value + (root?.scrollTop || 0)}px`,
        left: `${oldLeft.value + (root?.scrollLeft || 0)}px`,
        zIndex: 99995,

        width: oldWidth.value,
        height: oldHeight.value,
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
          h(Transition, { name: "fade" }, () => [
            isSpotlightShow.value
              ? h("div", {
                  class: "vue-stage-play__spotlight-bulb",
                  style: bulbStyle.value,
                  onTransitionend: () => {
                    isFloat.value = false;
                  },
                })
              : null,
          ]),
        ),
      ];
    };
  },
}) as DefineComponent<SpotlightProps>;
