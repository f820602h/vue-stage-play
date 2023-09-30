import type { Plugin } from "vue";
import { StagePlayScene } from "./components/StagePlayScene";
import { StagePlaySpotlight } from "./components/StagePlaySpotlight";
import { InjectionGlobalOptions } from "./constants";
import type { GlobalOptions } from "./types";

export function StagePlayPlugin(globalOptions?: GlobalOptions): Plugin {
  return {
    install(app) {
      app.provide(InjectionGlobalOptions, globalOptions || {});
      app.component("StagePlayScene", StagePlayScene);
      app.component("StagePlaySpotlight", StagePlaySpotlight);
    },
  };
}
