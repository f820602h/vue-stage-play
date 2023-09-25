export type SpotlightOptions = {
  padding?: number;
  borderRadius?: number;
  darkZoneColor?: string;
};

type ActOptions = {
  actName?: string;
  sceneNumber: number;
};

type CameraOptions = {
  cameraFollow?: boolean;
  cameraFollowOptions?: ScrollIntoViewOptions;
  cameraFixAfterFollow?: boolean;
};

type VoiceOverOptions = {
  voiceOverPlacement?: "top" | "bottom" | "left" | "right";
  voiceOverAutoPlacement?: boolean;
  voiceOverAlign?: "start" | "center" | "end";
  voiceOverWidth?: number;
  voiceOverTitle?: string;
  voiceOverContent?: string;
  voiceOverPrevButtonText?: string;
  voiceOverNextButtonText?: string;
  voiceOverDoneButtonText?: string;
};

export type GlobalOptions = SpotlightOptions &
  SpotlightOptions &
  VoiceOverOptions;
export type SpotlightProps = SpotlightOptions;
export type SceneProps = ActOptions & CameraOptions & VoiceOverOptions;
