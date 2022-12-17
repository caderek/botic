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
  VerticalScroll,
  HorizontalScroll,
  KeyCodesInput,
  ScrollDirection,
} from "../../common/constants.js";

import { HookHandle, GlobalInputEvent } from "../../common/types";

type UiohookInputEvent =
  | UiohookMouseEvent
  | UiohookWheelEvent
  | UiohookKeyboardEvent;

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
        key: KeyCodesInput[e.keycode] ?? "Other",
      };

    case EventType.EVENT_MOUSE_WHEEL:
      return {
        type: WheelEventType[e.type] as keyof typeof WheelEventType,
        alt: e.altKey,
        ctrl: e.ctrlKey,
        meta: e.metaKey,
        shift: e.shiftKey,
        direction: ScrollDirection[e.direction] as keyof typeof ScrollDirection,
        rotation:
          e.direction === WheelDirection.VERTICAL
            ? (VerticalScroll[e.rotation] as keyof typeof VerticalScroll)
            : (HorizontalScroll[e.rotation] as keyof typeof HorizontalScroll),
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
    predicate: (e: any) => boolean,
    handler: (e: any) => void,
    once: boolean
  ) {
    const fn = (rawEvent: UiohookInputEvent) => {
      const event = prepareEvent(rawEvent);

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

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.toggle = this.toggle.bind(this);
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
