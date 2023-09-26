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
} from "vue";
import { SpotlightProps, ResolvedSpotlightProps } from "../types";
import {
  InjectionGlobalOptions,
  InjectionSpotlightOptions,
} from "../constants";
import { defaultOptions } from "../options";
import { useActs } from "../composables/act";
import { isClient, useElementBounding } from "@vueuse/core";

export const VueTrailerSpotlight = defineComponent({
  name: "VueTrailerSpotlight",
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
    const { currentActName, currentSceneIndex, currentActor } = useActs();

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
    const oldWidth = ref(0);
    const oldHeight = ref(0);
    const root = isClient
      ? document.documentElement || document.body
      : undefined;

    const isFloat = ref<boolean>(true);

    watch(currentActor, (newVal) => {
      isFloat.value = true;
      if (newVal) {
        const { top, left, width, height } = useElementBounding(currentActor);
        oldTop.value = top.value;
        oldLeft.value = left.value;
        oldWidth.value = width.value;
        oldHeight.value = height.value;
      }
    });

    const bulbStyle = computed<StyleValue>(() => {
      return {
        position: "absolute",

        top: `${oldTop.value + (root?.scrollTop || 0)}px`,
        left: `${oldLeft.value + (root?.scrollLeft || 0)}px`,

        width: `${oldWidth.value}px`,
        height: `${oldHeight.value}px`,
        borderRadius: `${options.value.spotlightBorderRadius}px`,

        opacity: currentActName.value ? 1 : 0,
        boxShadow: currentActName.value
          ? `${options.value.spotlightDarkZoneColor} 0px 0px 0px 5000px`
          : "",
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
          currentActName.value !== undefined ||
            currentSceneIndex.value !== undefined
            ? h("div", {
                class: "vue-trailer__spotlight-bulb",
                style: bulbStyle.value,
                onTransitionend: () => {
                  isFloat.value = false;
                },
              })
            : null,
        ),
      ];
    };
  },
}) as DefineComponent<SpotlightProps>;
