import { uIOhook, UiohookMouseEvent } from "uiohook-napi";
import { HooksState } from "./types";

class MouseMoveHook {
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

  do(handler: (e: UiohookMouseEvent) => void) {
    let _isActive = true;

    const fn = (e: UiohookMouseEvent) => {
      if (
        e.altKey === this.#alt &&
        e.ctrlKey === this.#ctrl &&
        e.metaKey === this.#meta &&
        e.shiftKey === this.#shift
      ) {
        handler(e);

        if (this.#once) {
          uIOhook.off("mousemove", fn);
          _isActive = false;
        }
      }
    };

    uIOhook.on("mousemove", fn);

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
          uIOhook.off("mousemove", fn);
          _isActive = false;
        }
      },
      start() {
        if (!this.isActive) {
          uIOhook.on("mousemove", fn);
          _isActive = true;
        }
      },
      toggle() {
        const type = this.isActive ? "off" : "on";
        uIOhook[type]("mousemove", fn);
        _isActive = !_isActive;
      },
    };
  }
}

export default MouseMoveHook;
