type ActOptions = {
  actName: string;
};

type SceneOptions = {
  sceneNumber: number;
  tag?: string;
  skip?: boolean;
};

type SpotlightOptions = {
  spotlightPadding?: number;
  spotlightBorderRadius?: number;
  spotlightDarkZoneColor?: string;
};

type AudienceOptions = {
  allowInteract?: boolean;
  allowLeave?: boolean;
};

type CameraOptions = {
  cameraFollow?: boolean;
  cameraFollowOffset?: number;
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

type HookParams = {
  currentActName: string | undefined;
  currentAct: number[];
  currentSceneIndex: number | undefined;
  currentSceneNumber: number | undefined;
  hasPrevScene: boolean;
  hasNextScene: boolean;
  totalSceneCount: number;
};

type HookOptions = {
  onBeforeCut?: (currentActInfo: HookParams) => void;
  onAfterCut?: (currentActInfo: HookParams) => void;
  onActivated?: (currentActInfo: HookParams) => void;
  onDeactivated?: (currentActInfo: HookParams) => void;
};

export type GlobalOptions = SpotlightOptions &
  AudienceOptions &
  CameraOptions &
  VoiceOverOptions &
  HookOptions;

export type SpotlightProps = SpotlightOptions;

export type SceneProps = ActOptions &
  SceneOptions &
  AudienceOptions &
  CameraOptions &
  VoiceOverOptions &
  HookOptions;

export type ResolvedSpotlightProps = Required<SpotlightProps>;

export type ResolvedSceneProps = Required<SceneProps> &
  Required<SpotlightProps>;
