import { UiohookKey } from "uiohook-napi";

export enum MouseButton {
  ANY = -1,
  NONE,
  LEFT,
  RIGHT,
  MIDDLE,
}

export enum VerticalScroll {
  UP = -1,
  DOWN = 1,
}

export enum HorizontalScroll {
  LEFT = -1,
  RIGHT = 1,
}

export enum KeyboardEventType {
  KEY_PRESSED = 4,
  KEY_RELEASED = 5,
}

export enum MouseEventType {
  MOUSE_CLICKED = 6,
  MOUSE_PRESSED = 7,
  MOUSE_RELEASED = 8,
  MOUSE_MOVED = 9,
}

export enum WheelEventType {
  MOUSE_SCROLL = 11,
}

export enum InputEventType {
  KEY_PRESSED = 4,
  KEY_RELEASED = 5,
  MOUSE_CLICKED = 6,
  MOUSE_PRESSED = 7,
  MOUSE_RELEASED = 8,
  MOUSE_MOVED = 9,
  MOUSE_SCROLL = 11,
}

export const KeycodeByName = UiohookKey;

export const KeysNames = new Map(
  Object.entries(UiohookKey).map(([key, code]) => [code, key])
) as Map<number, keyof typeof UiohookKey>;
