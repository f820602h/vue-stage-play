import { useBodyScrollFixed } from "../../src/composables/bodyScrollFixed";

const { fixed, reset } = useBodyScrollFixed();

//set body default style
document.body.style.position = "";
document.body.style.top = "";
document.body.style.width = "auto";

const scrollY = 100;
const scrollTo = vi.fn();
vi.stubGlobal("scrollY", scrollY);
vi.stubGlobal("scrollTo", scrollTo);

describe("useBodyScrollFixed", () => {
  beforeEach(() => {
    scrollTo.mockClear();
  });

  afterEach(() => {
    reset();
  });

  it("check default value", () => {
    expect(document.body.style.position).toEqual("");
    expect(document.body.style.top).toEqual("");
    expect(document.body.style.width).toEqual("auto");
  });

  it("fixed should set body style", () => {
    fixed();

    expect(document.body.style.position).toEqual("fixed");
    expect(document.body.style.top).toEqual(`-${scrollY}px`);
    expect(document.body.style.width).toEqual("100%");
  });

  it("reset should reset body style", () => {
    fixed();
    reset();

    expect(scrollTo).toBeCalledWith(0, scrollY);
    expect(document.body.style.position).toEqual("");
    expect(document.body.style.top).toEqual("");
    expect(document.body.style.width).toEqual("auto");
  });

  it("reset should not reset body style when not fixed", () => {
    reset();
    expect(scrollTo).not.toBeCalled();
  });

  it("resizeHandler should call resetBody and fixedBody", () => {
    fixed();
    window.dispatchEvent(new Event("resize"));

    expect(scrollTo).toBeCalledWith(0, scrollY);
    expect(document.body.style.position).toEqual("fixed");
    expect(document.body.style.top).toEqual(`-${scrollY}px`);
    expect(document.body.style.width).toEqual("100%");
  });

  it("resizeHandler should not call resetBody and fixedBody when not fixed", () => {
    fixed();
    reset();
    expect(scrollTo).toBeCalledTimes(1);

    window.dispatchEvent(new Event("resize"));
    expect(scrollTo).toBeCalledTimes(1);
    expect(document.body.style.position).toEqual("");
    expect(document.body.style.top).toEqual("");
    expect(document.body.style.width).toEqual("auto");
  });
});
