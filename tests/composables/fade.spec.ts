import { useFadeTransition } from "../../src/composables/fade";

const { enterTransition, leaveTransition } = useFadeTransition(100);

let mockAnimation: { onfinish: (() => void) | undefined };

const element = {
  style: { opacity: "" },
  animate: vi.fn(function (keyframes: Keyframe[]): {
    onfinish: (() => void) | undefined;
  } {
    this.style.opacity = keyframes[keyframes.length - 1].opacity + "";
    const result = { onfinish: undefined };
    mockAnimation = result;
    return result;
  }),
} as unknown as HTMLElement;

describe("useFadeTransition", () => {
  it("enterTransition should set element style", () => {
    const done = vi.fn();
    enterTransition(element, done);

    expect(element.style.opacity).toEqual("1");
    expect(element.animate).toBeCalledWith([{ opacity: 0 }, { opacity: 1 }], {
      duration: 100,
      easing: "ease",
    });
    mockAnimation.onfinish?.();
    expect(done).toBeCalled();
  });

  it("leaveTransition should set element style", () => {
    const done = vi.fn();
    leaveTransition(element, done);

    expect(element.style.opacity).toEqual("0");
    expect(element.animate).toBeCalledWith([{ opacity: 0 }, { opacity: 1 }], {
      duration: 100,
      easing: "ease",
    });
    mockAnimation.onfinish?.();
    expect(done).toBeCalled();
  });
});
