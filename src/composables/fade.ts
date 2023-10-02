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

export function useFadeTransition(duration) {
  function enterTransition(element: HTMLElement, done: () => void) {
    const keyframes = getEnterKeyframes();
    const options = { duration, easing: "ease" };
    animateTransition(element, done, keyframes, options);
  }

  function leaveTransition(element: HTMLElement, done: () => void) {
    const keyframes = getEnterKeyframes().reverse();
    const options = { duration, easing: "ease" };
    animateTransition(element, done, keyframes, options);
  }

  return {
    enterTransition,
    leaveTransition,
  };
}
