import { WheelDirection, UiohookKey } from "uiohook-napi";
import {
  KeyboardEventType,
  MouseEventType,
  WheelEventType,
  MouseButton,
  VerticalScroll,
  HorizontalScroll,
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
  rotation: keyof typeof VerticalScroll | keyof typeof HorizontalScroll;
  x: number;
  y: number;
};

export type KeyName = keyof typeof UiohookKey;

export type GlobalKeyboardEvent = {
  type: keyof typeof KeyboardEventType;
  alt: boolean;
  ctrl: boolean;
  meta: boolean;
  shift: boolean;
  key: number;
  keyName: KeyName | "OTHER";
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
