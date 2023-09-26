import type { Plugin } from "vue";
import { VueTrailerScene } from "./components/VueTrailerScene";
import { VueTrailerSpotlight } from "./components/VueTrailerSpotlight";
import { InjectionGlobalOptions } from "./constants";
import type { GlobalOptions } from "./types";

export const defaultOptions: Required<GlobalOptions> = {
  spotlightPadding: 10,
  spotlightBorderRadius: 10,
  spotlightDarkZoneColor: "rgba(66, 66, 66, 0.5)",
  cameraFollow: true,
  cameraFollowOptions: {
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  },
  cameraFixAfterFollow: true,
  voiceOverPlacement: "bottom",
  voiceOverAutoPlacement: true,
  voiceOverAlign: "center",
  voiceOverWidth: 300,
  voiceOverTitle: "Voice Over",
  voiceOverContent:
    "It takes a strong man to save himself,\nand a great man to save another.",
  voiceOverPrevButtonText: "Back",
  voiceOverNextButtonText: "Next",
  voiceOverDoneButtonText: "Done",
};

export function VueTrailerPlugin(globalOptions: GlobalOptions): Plugin {
  return {
    install(app) {
      app.provide(InjectionGlobalOptions, globalOptions);
      app.component("VueTrailerScene", VueTrailerScene);
      app.component("VueTrailerSpotlight", VueTrailerSpotlight);
    },
  };
}
