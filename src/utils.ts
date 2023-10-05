const provider = "[Vue Stage Play]";

export const errorMessages: Record<string, (...arg: any) => string> = {
  alreadyPlayingAct: (actName: string) =>
    `${provider} "${actName}" is already playing.`,
  noSceneInAct: (actName: string) => `${provider} No scene in "${actName}"`,
  noSpecifiedSceneInAct: (actName: string, scene: number) =>
    `${provider} No scene "${scene}" in "${actName}"`,
  noPlayingAct: () => `${provider} No playing act.`,
  noPreviousScene: () => `${provider} No previous scene.`,
  noNextScene: () => `${provider} No next scene.`,
  noSpecifiedScene: () => `${provider} No such scene`,

  sceneNumberShouldBePositive: () =>
    `${provider} Scene number should be positive`,
  canNotRemoveCurrentScene: () => `${provider} Can't remove current scene`,
};

// findLastIndex polyfill
export function findLastIndex<T>(
  arr: T[],
  predicate: (value: T, index: number, obj: T[]) => unknown,
  thisArg?: any,
): number {
  const len = arr.length;
  if (len === 0) return -1;
  let i = len - 1;
  while (i >= 0) {
    if (predicate.call(thisArg, arr[i], i, arr)) return i;
    i--;
  }
  return -1;
}

export function smoothScroll(
  el: HTMLElement,
  options: ScrollIntoViewOptions,
): Promise<void> {
  return new Promise((resolve) => {
    let same = 0;
    let lastPos: number;

    el.scrollIntoView(options);
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

export function getPlacementStyle(placement: string, align: string) {
  let top = "",
    bottom = "",
    left = "",
    right = "",
    transform = "";

  switch (placement) {
    case "center":
      {
        top = "50%";
        left = "50%";
        transform = "translate(-50%, -50%)";
      }
      break;
    case "top":
      {
        top = "0";
        left = "0";
        transform = "translate(0, -100%)";

        switch (align) {
          case "start":
            left = "0";
            break;
          case "center":
            left = "50%";
            transform = "translate(-50%, -100%)";
            break;
          case "end":
            left = "unset";
            right = "0";
            break;
          default:
            break;
        }
      }
      break;
    case "bottom":
      {
        bottom = "0";
        left = "0";
        transform = "translate(0, 100%)";

        switch (align) {
          case "start":
            left = "0";
            break;
          case "center":
            left = "50%";
            transform = "translate(-50%, 100%)";
            break;
          case "end":
            left = "unset";
            right = "0";
            break;
          default:
            break;
        }
      }
      break;
    case "left":
      {
        top = "0";
        left = "0";
        transform = "translate(-100%, 0)";

        switch (align) {
          case "start":
            top = "0";
            break;
          case "center":
            top = "50%";
            transform = "translate(-100%, -50%)";
            break;
          case "end":
            top = "unset";
            bottom = "0";
            break;
          default:
            break;
        }
      }
      break;
    case "right":
      {
        top = "0";
        right = "0";
        transform = "translate(100%, 0)";

        switch (align) {
          case "start":
            top = "0";
            break;
          case "center":
            top = "50%";
            transform = "translate(100%, -50%)";
            break;
          case "end":
            top = "unset";
            bottom = "0";
            break;
          default:
            break;
        }
      }
      break;
    default:
      break;
  }

  return {
    top,
    bottom,
    left,
    right,
    transform,
  };
}
