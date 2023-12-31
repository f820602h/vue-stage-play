import { ref } from "vue";

const isFixed = ref(false);

function fixedBody() {
  const top = window.scrollY;
  const left = window.scrollX;
  document.body.style.position = "fixed";
  document.body.style.top = `-${top}px`;
  document.body.style.left = `-${left}px`;
  document.body.style.width = "100%";
}

function resetBody() {
  const scrollY = document.body.style.top;
  const scrollX = document.body.style.left;
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.width = "auto";
  window.scrollTo(parseInt(scrollX || "0") * -1, parseInt(scrollY || "0") * -1);
}

function resizeHandler() {
  resetBody();
  fixedBody();
}

function fixed() {
  if (isFixed.value) return;
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

export function useBodyScrollFixed() {
  return {
    isFixed,
    fixed,
    reset,
  };
}
