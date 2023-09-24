<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useAct } from "../composables";

const props = defineProps({
  actName: {
    type: String,
    required: true,
  },
  step: {
    type: Number,
    required: true,
  },
  tipPlacement: {
    type: String,
    default: "left",
  },
  tipAlign: {
    type: String,
    default: "center",
  },
});

const actor = ref<HTMLElement | null>(null);
const { currentScene, addScene, nextScene, prevScene, jumpToScene, cut } =
  useAct(props.actName);

const slotProp = reactive({
  nextScene,
  prevScene,
  jumpToScene,
  cut,
});

onMounted(() => {
  if (actor.value)
    addScene(props.step, {
      actor: actor.value,
    });
});
</script>

<template>
  <div ref="actor" class="actor">
    <slot v-bind="slotProp" />

    <Teleport
      v-if="actor === currentScene?.actor"
      :disabled="actor !== currentScene.actor"
      to="#spot-light"
    >
      <div id="actor__tip" :class="[tipPlacement, tipAlign]">
        <slot name="tip">
          <div class="default__tip">
            <div class="default__tip__header">
              <slot name="tipHeader">
                <div>Header</div>
              </slot>

              <slot name="tipCloseIcon">
                <svg
                  class="default__tip__header__close"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  @click="cut"
                >
                  <path
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </slot>
            </div>

            <div class="default__tip__body">
              <slot name="tipBody">
                <div>Hello World!</div>
              </slot>
            </div>

            <div class="default__tip__footer">
              <slot name="tipFooter">
                <button class="default__tip__footer__btn" @click="prevScene">
                  Back
                </button>
                <button class="default__tip__footer__btn" @click="nextScene">
                  Next
                </button>
              </slot>
            </div>
          </div>
        </slot>
      </div>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.actor {
  position: relative;

  #actor__tip {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    padding: 0;

    &.top {
      top: 0;
      left: 0;
      transform: translate(0, -100%);

      &.start {
        left: 0;
        transform: translate(0, -100%);
      }

      &.center {
        left: 50%;
        transform: translate(-50%, -100%);
      }

      &.end {
        left: unset;
        right: 0;
        transform: translate(0, -100%);
      }
    }

    &.right {
      top: 0;
      right: 0;
      transform: translate(100%, 0);

      &.start {
        top: 0;
        right: 0;
        transform: translate(100%, 0);
      }

      &.center {
        top: 50%;
        right: 0;
        transform: translate(100%, -50%);
      }

      &.end {
        top: unset;
        bottom: 0;
        right: 0;
        transform: translate(100%, 0);
      }
    }

    &.bottom {
      bottom: 0;
      left: 0;
      transform: translate(0, 100%);

      &.start {
        bottom: 0;
        left: 0;
        transform: translate(0, 100%);
      }

      &.center {
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 100%);
      }

      &.end {
        bottom: unset;
        top: 0;
        left: 0;
        transform: translate(0, 100%);
      }
    }

    &.left {
      top: 0;
      left: 0;
      transform: translate(-100%, 0);

      &.start {
        top: 0;
        left: 0;
        transform: translate(-100%, 0);
      }

      &.center {
        top: 50%;
        left: 0;
        transform: translate(-100%, -50%);
      }

      &.end {
        top: unset;
        bottom: 0;
        left: 0;
        transform: translate(-100%, 0);
      }
    }
  }

  .default__tip {
    min-width: 300px;
    margin: 8px;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);

    &__header {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      border-bottom: 1px #ddd solid;
      font-size: 20px;
      line-height: 1;
      font-weight: bold;

      &__close {
        position: relative;
        right: -4px;
        display: block;
        width: 24px;
        height: 24px;
        color: #7e7e7e;
        transition: all 0.2s ease-in-out;
        cursor: pointer;

        &:hover {
          color: #292929;
        }
      }
    }

    &__body {
      position: relative;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60px;
      padding: 12px;
      font-size: 14px;
    }

    &__footer {
      position: relative;
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding: 8px 12px;
      border-top: 1px #ddd solid;

      &__btn {
        padding: 6px 12px;
        border: 1px #ddd solid;
        border-radius: 4px;
        font-size: 14px;
        font-weight: normal;
        color: #292929;
        background: #f1f1f1;
        transition: all 0.2s ease-in-out;
        cursor: pointer;

        &:hover {
          background: #ddd;
        }
      }
    }
  }
}
</style>
