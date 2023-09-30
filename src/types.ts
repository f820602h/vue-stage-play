type ActOptions = {
  actName: string;
};

type SceneOptions = {
  scene: number;
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

export type ScopedProps = {
  currentActName: string | undefined;
  currentActSceneList: number[];
  currentScene: number | undefined;
  currentSceneOrder: number;
  hasPrevScene: boolean;
  hasNextScene: boolean;
  totalSceneCount: number;
  isCurrentScene: boolean;
  action: (actName?: string, scene?: number) => void;
  cut: () => void;
  prevScene: () => void;
  nextScene: () => void;
  jumpToScene: (scene: number) => void;
};

type HookOptions = {
  onBeforeCut?: (scopedProps: ScopedProps) => void | Promise<void>;
  onAfterCut?: (scopedProps: ScopedProps) => void | Promise<void>;
  onActivated?: (scopedProps: ScopedProps) => void | Promise<void>;
  onDeactivated?: (scopedProps: ScopedProps) => void | Promise<void>;
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
