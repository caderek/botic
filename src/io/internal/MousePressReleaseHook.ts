import { uIOhook, UiohookMouseEvent } from "uiohook-napi";
import { MouseButton } from "./constants.js";
import { HooksState } from "./types";

class MousePressReleaseHook {
  #once: boolean = false;
  #button: MouseButton = MouseButton.ANY;
  #state: HooksState;
  #alt: boolean = false;
  #ctrl: boolean = false;
  #meta: boolean = false;
  #shift: boolean = false;
  #variant: "mousedown" | "mouseup";

  constructor(state: HooksState, variant: "mousedown" | "mouseup") {
    this.#state = state;
    this.#variant = variant;
  }

  get once() {
    this.#once = true;
    return this;
  }

  get left() {
    this.#button = MouseButton.LEFT;
    return this;
  }

  get right() {
    this.#button = MouseButton.RIGHT;
    return this;
  }

  get middle() {
    this.#button = MouseButton.MIDDLE;
    return this;
  }

  get alt() {
    this.#alt = true;
    return this;
  }

  get ctrl() {
    this.#ctrl = true;
    return this;
  }

  get meta() {
    this.#meta = true;
    return this;
  }

  get shift() {
    this.#shift = true;
    return this;
  }

  do(handler: (e: UiohookMouseEvent) => void) {
    let _isActive = true;
    const variant = this.#variant;

    const fn = (e: UiohookMouseEvent) => {
      if (
        (this.#button === MouseButton.ANY || e.button === this.#button) &&
        e.altKey === this.#alt &&
        e.ctrlKey === this.#ctrl &&
        e.metaKey === this.#meta &&
        e.shiftKey === this.#shift
      ) {
        handler(e);

        if (this.#once) {
          uIOhook.off(variant, fn);
          _isActive = false;
        }
      }
    };

    // @ts-ignore
    uIOhook.on(variant, fn);

    if (!this.#state.isRunning) {
      uIOhook.start();
      this.#state.isRunning = true;
    }

    return {
      get isActive() {
        return _isActive;
      },
      stop() {
        if (_isActive) {
          uIOhook.off(variant, fn);
          _isActive = false;
        }
      },
      start() {
        if (!this.isActive) {
          // @ts-ignore
          uIOhook.on(variant, fn);
          _isActive = true;
        }
      },
      toggle() {
        const type = this.isActive ? "off" : "on";
        // @ts-ignore
        uIOhook[type](variant, fn);
        _isActive = !_isActive;
      },
    };
  }
}

export default MousePressReleaseHook;
