export enum EventType {
  KEY_PRESSED = 4,
  KEY_RELEASED = 5,
  MOUSE_CLICKED = 6,
  MOUSE_PRESSED = 7,
  MOUSE_RELEASED = 8,
  MOUSE_MOVED = 9,
  MOUSE_WHEEL = 11,
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
  MOUSE_WHEEL = 11,
}

export const InputEventType = {
  ...KeyboardEventType,
  ...MouseEventType,
  ...WheelEventType,
};

type InputEventType = KeyboardEventType | MouseEventType | WheelEventType;
