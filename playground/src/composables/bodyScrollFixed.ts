import { ref } from "vue";

const isFixed = ref(false);

export function useBodyScrollFixed() {
  function fixedBody() {
    const top = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${top}px`;
    document.body.style.width = "100%";
  }

  function resetBody() {
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "auto";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  }

  function resizeHandler() {
    resetBody();
    fixedBody();
  }

  function fixed() {
    isFixed.value = true;
    window.addEventListener("resize", resizeHandler);
    fixedBody();
  }

  function reset() {
    if (!isFixed.value) return;
    isFixed.value = false;
    window.removeEventListener("resize", resizeHandler);
    resetBody();
  }

  return {
    fixed,
    reset,
  };
}
