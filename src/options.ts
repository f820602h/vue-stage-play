import type { GlobalOptions } from "./types";

export const defaultOptions: Required<GlobalOptions> = {
  spotlightPadding: 10,
  spotlightBorderRadius: 10,
  spotlightDarkZoneColor: "rgba(66, 66, 66, 0.5)",

  allowInteract: false,
  allowLeave: true,

  cameraFollow: true,
  cameraFollowOffset: 24,
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
  voiceOverTitle: "Act 3 Scene 2",
  voiceOverContent: "To be, or not to be; that's the question.",
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
