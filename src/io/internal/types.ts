import { WheelDirection, UiohookKey } from "uiohook-napi";
import {
  KeyboardEventType,
  MouseEventType,
  WheelEventType,
  MouseButton,
} from "./constants.js";

export type GlobalMouseEvent = {
  type: keyof typeof MouseEventType;
  alt: boolean;
  ctrl: boolean;
  meta: boolean;
  shift: boolean;
  button: number;
  buttonName: keyof typeof MouseButton | "OTHER";
  clicks: number;
  x: number;
  y: number;
};

export type GlobalScrollEvent = {
  type: keyof typeof WheelEventType;
  alt: boolean;
  ctrl: boolean;
  meta: boolean;
  shift: boolean;
  direction: keyof typeof WheelDirection;
  rotation: number;
  x: number;
  y: number;
};

export type GlobalKeyboardEvent = {
  type: keyof typeof KeyboardEventType;
  alt: boolean;
  ctrl: boolean;
  meta: boolean;
  shift: boolean;
  key: number;
  keyName: keyof typeof UiohookKey | "OTHER";
};

export type GlobalInputEvent =
  | GlobalMouseEvent
  | GlobalScrollEvent
  | GlobalKeyboardEvent;

export type HookHandler = (e: GlobalInputEvent) => void;

export interface HookHandle {
  readonly isActive: boolean;
  start(): void;
  stop(): void;
  toggle(): void;
}

export interface Hook {
  readonly once: Hook;
  readonly alt: Hook;
  readonly ctrl: Hook;
  readonly meta: Hook;
  readonly shift: Hook;
  do(handler: HookHandler): HookHandle;
}
