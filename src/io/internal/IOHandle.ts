import {
  uIOhook,
  UiohookMouseEvent,
  UiohookWheelEvent,
  UiohookKeyboardEvent,
  EventType,
  WheelDirection,
} from "uiohook-napi";

import {
  KeyboardEventType,
  MouseEventType,
  WheelEventType,
  MouseButton,
  KeysNames,
} from "./constants.js";

import {
  HookHandle,
  GlobalInputEvent,
  GlobalMouseEvent,
  GlobalKeyboardEvent,
  GlobalScrollEvent,
} from "./types";

type UiohookInputEvent =
  | UiohookMouseEvent
  | UiohookWheelEvent
  | UiohookKeyboardEvent;

type Predicate =
  | ((e: GlobalMouseEvent) => boolean)
  | ((e: GlobalKeyboardEvent) => boolean)
  | ((e: GlobalScrollEvent) => boolean);

let isRunning = false;
const listeners = new Set();

const mainHook = {
  stop(listenerId: Symbol) {
    listeners.delete(listenerId);

    if (listeners.size === 0 && isRunning) {
      isRunning = false;
      uIOhook.stop();
    }
  },

  start(listenerId: Symbol) {
    listeners.add(listenerId);

    if (!isRunning) {
      isRunning = true;
      uIOhook.start();
    }
  },

  toggle(listenerId: Symbol) {
    if (listeners.has(listenerId)) {
      this.stop(listenerId);
    } else {
      this.start(listenerId);
    }
  },
};

const prepareEvent = (e: UiohookInputEvent): GlobalInputEvent => {
  switch (e.type) {
    case EventType.EVENT_KEY_PRESSED:
    case EventType.EVENT_KEY_RELEASED:
      return {
        type: KeyboardEventType[e.type] as keyof typeof KeyboardEventType,
        alt: e.altKey,
        ctrl: e.ctrlKey,
        meta: e.metaKey,
        shift: e.shiftKey,
        key: e.keycode,
        keyName: KeysNames.get(e.keycode) ?? "OTHER",
      };
    case EventType.EVENT_MOUSE_WHEEL:
      return {
        type: WheelEventType[e.type] as keyof typeof WheelEventType,
        alt: e.altKey,
        ctrl: e.ctrlKey,
        meta: e.metaKey,
        shift: e.shiftKey,
        direction: WheelDirection[e.direction] as keyof typeof WheelDirection,
        rotation: e.rotation,
        x: e.x,
        y: e.y,
      };
    case EventType.EVENT_MOUSE_CLICKED:
    case EventType.EVENT_MOUSE_PRESSED:
    case EventType.EVENT_MOUSE_RELEASED:
    case EventType.EVENT_MOUSE_MOVED:
      return {
        type: MouseEventType[e.type] as keyof typeof MouseEventType,
        alt: e.altKey,
        ctrl: e.ctrlKey,
        meta: e.metaKey,
        shift: e.shiftKey,
        button: e.button as number,
        buttonName:
          (MouseButton[e.button as number] as keyof typeof MouseButton) ??
          "OTHER",
        x: e.x,
        y: e.y,
        clicks: e.clicks,
      };
  }
};

class IOHandle implements HookHandle {
  #isActive: boolean = false;
  #id: Symbol;
  #eventType: string;
  #fn: (event: UiohookInputEvent) => void;

  constructor(
    id: Symbol,
    eventType: string,
    predicate: (event: GlobalInputEvent) => boolean,
    handler: (event: GlobalInputEvent) => void,
    once: boolean
  ) {
    const fn = (e: UiohookInputEvent) => {
      const event = prepareEvent(e);

      if (predicate(event)) {
        handler(event);

        if (once) {
          this.stop();
        }
      }
    };

    this.#id = id;
    this.#eventType = eventType;
    this.#fn = fn;
    this.start();
  }

  get isActive() {
    return this.#isActive;
  }
  stop() {
    if (this.#isActive) {
      mainHook.stop(this.#id);
      uIOhook.off(this.#eventType, this.#fn);
      this.#isActive = false;
    }
  }
  start() {
    if (!this.#isActive) {
      mainHook.start(this.#id);
      // @ts-ignore
      uIOhook.on(this.#eventType, this.#fn);
      this.#isActive = true;
    }
  }
  toggle() {
    const type = this.#isActive ? "off" : "on";
    // @ts-ignore
    uIOhook[type](this.#eventType, this.#fn);
    this.#isActive = !this.#isActive;
  }
}

export default IOHandle;