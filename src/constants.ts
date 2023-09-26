import type { InjectionKey } from "vue";
import type { GlobalOptions, SpotlightOptions } from "./types";

export const InjectionGlobalOptions =
  "vue-stage-play-global" as unknown as InjectionKey<GlobalOptions>;
export const InjectionSpotlightOptions =
  "vue-stage-play-spotlight" as unknown as InjectionKey<SpotlightOptions>;
