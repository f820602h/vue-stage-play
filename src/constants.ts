import type { InjectionKey } from "vue";
import type { GlobalOptions, SpotlightOptions } from "./types";

export const InjectionGlobalOptions =
  "vue-trailer-global" as unknown as InjectionKey<GlobalOptions>;
export const InjectionSpotlightOptions =
  "vue-trailer-spotlight" as unknown as InjectionKey<SpotlightOptions>;
