import type { Plugin } from "vue";
import { VueTrailerScene } from "./components/VueTrailerScene";
import { VueTrailerSpotlight } from "./components/VueTrailerSpotlight";
import { InjectionGlobalOptions } from "./constants";
import type { GlobalOptions } from "./types";

export function VueTrailerPlugin(defaultOptions: GlobalOptions = {}): Plugin {
  return {
    install(app) {
      app.provide(InjectionGlobalOptions, defaultOptions);
      app.component("VueTrailerScene", VueTrailerScene);
      app.component("VueTrailerSpotlight", VueTrailerSpotlight);
    },
  };
}
