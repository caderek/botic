import { uIOhook, UiohookMouseEvent } from "uiohook-napi";
import { MouseButton } from "./constants.js";
import { HooksState } from "./types";

class MouseClickHook {
  #once: boolean = false;
  #clicks: number = 1;
  #button: MouseButton = MouseButton.ANY;
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

  get double() {
    this.#clicks = 2;
    return this;
  }

  get triple() {
    this.#clicks = 3;
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

    const fn = (e: UiohookMouseEvent) => {
      if (
        (this.#button === MouseButton.ANY || e.button === this.#button) &&
        (this.#clicks === 1 || e.clicks === this.#clicks) &&
        e.altKey === this.#alt &&
        e.ctrlKey === this.#ctrl &&
        e.metaKey === this.#meta &&
        e.shiftKey === this.#shift
      ) {
        handler(e);

        if (this.#once) {
          uIOhook.off("click", fn);
          _isActive = false;
        }
      }
    };

    uIOhook.on("click", fn);

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
          uIOhook.off("click", fn);
          _isActive = false;
        }
      },
      start() {
        if (!this.isActive) {
          uIOhook.on("click", fn);
          _isActive = true;
        }
      },
      toggle() {
        const type = this.isActive ? "off" : "on";
        uIOhook[type]("click", fn);
        _isActive = !_isActive;
      },
    };
  }
}

export default MouseClickHook;
