import { WheelDirection } from "uiohook-napi";
import {
  KeyboardEventType,
  MouseEventType,
  WheelEventType,
  MouseButton,
  VerticalScroll,
  HorizontalScroll,
  Keys,
  KeysInput,
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

export type KeyName = keyof typeof Keys;
export type KeyInputName = keyof typeof KeysInput;

export type GlobalKeyboardEvent = {
  type: keyof typeof KeyboardEventType;
  alt: boolean;
  ctrl: boolean;
  meta: boolean;
  shift: boolean;
  key: KeyInputName | "Other";
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
  do(handler: HookHandler): HookHandle;
}

export interface Point {
  x: number;
  y: number;
}

export interface Region {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface Window {
  handle: number;
  workspace: number;
  type: string;
  name: string;
  region: Region;
  center: Point;
}

export interface WindowsManager {
  list(): Promise<Window[]>;
  active(): Promise<Window | null>;
}
