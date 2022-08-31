import {
  uIOhook,
  UiohookMouseEvent,
  UiohookWheelEvent,
  UiohookKeyboardEvent,
} from "uiohook-napi";
import { HooksState } from "./types";

class UniversalHook {
  #once: boolean = false;
  #state: HooksState;
  #alt: boolean = false;
  #ctrl: boolean = false;
  #meta: boolean = false;
  #shift: boolean = false;

  constructor(state: HooksState) {
    this.#state = state;
  }

  get once() {
    this.#once = true;
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

  do(
    handler: (
      e: UiohookMouseEvent | UiohookWheelEvent | UiohookKeyboardEvent
    ) => void
  ) {
    let _isActive = true;

    const fn = (
      e: UiohookMouseEvent | UiohookWheelEvent | UiohookKeyboardEvent
    ) => {
      if (
        (!this.#alt && !this.#ctrl && !this.#meta && !this.#shift) ||
        (e.altKey === this.#alt &&
          e.ctrlKey === this.#ctrl &&
          e.metaKey === this.#meta &&
          e.shiftKey === this.#shift)
      ) {
        handler(e);

        if (this.#once) {
          uIOhook.off("input", fn);
          _isActive = false;
        }
      }
    };

    uIOhook.on("input", fn);

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
          uIOhook.off("input", fn);
          _isActive = false;
        }
      },
      start() {
        if (!this.isActive) {
          uIOhook.on("input", fn);
          _isActive = true;
        }
      },
      toggle() {
        const type = this.isActive ? "off" : "on";
        uIOhook[type]("input", fn);
        _isActive = !_isActive;
      },
    };
  }
}

export default UniversalHook;
