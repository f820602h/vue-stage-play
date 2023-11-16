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
