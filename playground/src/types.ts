import type { MaybeRef } from "vue";

export type Actor = MaybeRef<HTMLElement | null>;

export type SceneConfig = {
  scrollFixed?: boolean;
  autoScrollTo?: boolean;
};

export type Scene = {
  actor: Actor;
  config?: SceneConfig;
};
