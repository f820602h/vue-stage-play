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

  onBeforeCut: () => {
    return;
  },
  onAfterCut: () => {
    return;
  },
  onActivated: () => {
    return;
  },
  onDeactivated: () => {
    return;
  },
};
