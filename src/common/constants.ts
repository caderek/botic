import { UiohookKey } from "uiohook-napi";
import { Keys, KeyCodes } from "./Keys.js";
import { KeysInput, KeyCodesInput } from "./KeysInput.js";

export { Keys, KeyCodes, KeysInput, KeyCodesInput };

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

export const RegularKeys = {
  "0": Keys.Digit0,
  "1": Keys.Digit1,
  "2": Keys.Digit2,
  "3": Keys.Digit3,
  "4": Keys.Digit4,
  "5": Keys.Digit5,
  "6": Keys.Digit6,
  "7": Keys.Digit7,
  "8": Keys.Digit8,
  "9": Keys.Digit9,
  a: Keys.A,
  b: Keys.B,
  c: Keys.C,
  d: Keys.D,
  e: Keys.E,
  f: Keys.F,
  g: Keys.G,
  h: Keys.H,
  i: Keys.I,
  j: Keys.J,
  k: Keys.K,
  l: Keys.L,
  m: Keys.M,
  n: Keys.N,
  o: Keys.O,
  p: Keys.P,
  q: Keys.Q,
  r: Keys.R,
  s: Keys.S,
  t: Keys.T,
  u: Keys.U,
  v: Keys.V,
  w: Keys.W,
  x: Keys.X,
  y: Keys.Y,
  z: Keys.Z,
  "`": Keys.Backquote,
  "-": Keys.Minus,
  "=": Keys.Equal,
  "[": Keys.BracketLeft,
  "]": Keys.BracketRight,
  "\\": Keys.Backslash,
  ";": Keys.Semicolon,
  "'": Keys.Quote,
  ",": Keys.Comma,
  ".": Keys.Period,
  "/": Keys.Slash,
  " ": Keys.Space,
  "\t": Keys.Tab,
  "\n": Keys.Enter,
};

export const ShiftedKeys = {
  ")": Keys.Digit0,
  "!": Keys.Digit1,
  "@": Keys.Digit2,
  "#": Keys.Digit3,
  $: Keys.Digit4,
  "%": Keys.Digit5,
  "^": Keys.Digit6,
  "&": Keys.Digit7,
  "*": Keys.Digit8,
  "(": Keys.Digit9,
  A: Keys.A,
  B: Keys.B,
  C: Keys.C,
  D: Keys.D,
  E: Keys.E,
  F: Keys.F,
  G: Keys.G,
  H: Keys.H,
  I: Keys.I,
  J: Keys.J,
  K: Keys.K,
  L: Keys.L,
  M: Keys.M,
  N: Keys.N,
  O: Keys.O,
  P: Keys.P,
  Q: Keys.Q,
  R: Keys.R,
  S: Keys.S,
  T: Keys.T,
  U: Keys.U,
  V: Keys.V,
  W: Keys.W,
  X: Keys.X,
  Y: Keys.Y,
  Z: Keys.Z,
  "~": Keys.Backquote,
  _: Keys.Minus,
  "+": Keys.Equal,
  "{": Keys.BracketLeft,
  "}": Keys.BracketRight,
  "|": Keys.Backslash,
  ":": Keys.Semicolon,
  '"': Keys.Quote,
  "<": Keys.Comma,
  ">": Keys.Period,
  "?": Keys.Slash,
};
