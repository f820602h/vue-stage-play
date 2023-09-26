type ActOptions = {
  actName: string;
};

type SceneOptions = {
  sceneNumber: number;
};

export type SpotlightOptions = {
  spotlightPadding?: number;
  spotlightBorderRadius?: number;
  spotlightDarkZoneColor?: string;
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

export type GlobalOptions = SpotlightOptions & CameraOptions & VoiceOverOptions;

export type SpotlightProps = SpotlightOptions;

export type SceneProps = ActOptions &
  SceneOptions &
  CameraOptions &
  VoiceOverOptions;

export type ResolvedSpotlightProps = Required<SpotlightProps>;

export type ResolvedSceneProps = Required<SceneProps> &
  Required<SpotlightProps>;
