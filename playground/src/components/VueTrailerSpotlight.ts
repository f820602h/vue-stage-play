import type { DefineComponent, StyleValue } from "vue";
import {
  h,
  defineComponent,
  computed,
  provide,
  ref,
  watch,
  Teleport,
} from "vue";
import { SpotlightProps } from "../types";
import { InjectionSpotlightOptions } from "../constants";
import { useActs } from "../composables/act";
import { isClient, useElementBounding } from "@vueuse/core";

export const VueTrailerSpotlight = defineComponent({
  name: "VueTrailerSpotlight",
  props: {
    padding: {
      type: Number,
      default: 10,
    },
    borderRadius: {
      type: Number,
      default: 10,
    },
    darkZoneColor: {
      type: String,
      default: "rgba(33, 33, 33, 0.5)",
    },
  },
  setup(props, { slots }) {
    const { currentActName, currentSceneNumber, currentActor } = useActs();

    provide(InjectionSpotlightOptions, {
      padding: props.padding,
      borderRadius: props.borderRadius,
    });

    const oldTop = ref(0);
    const oldLeft = ref(0);
    const oldWidth = ref(0);
    const oldHeight = ref(0);
    const root = isClient
      ? document.documentElement || document.body
      : undefined;

    const isFloat = ref<boolean>(false);

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
        borderRadius: `${props.borderRadius}px`,

        opacity: currentActName.value ? 1 : 0,
        boxShadow: currentActName.value
          ? `${props.darkZoneColor} 0px 0px 0px 5000px`
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
            disabled: !currentActName.value || !currentSceneNumber.value,
            onTransitionend: () => {
              isFloat.value = false;
            },
          },
          h("div", {
            class: "vue-trailer__spotlight-bulb",
            style: bulbStyle.value,
          }),
        ),
      ];
    };
  },
}) as DefineComponent<SpotlightProps>;
