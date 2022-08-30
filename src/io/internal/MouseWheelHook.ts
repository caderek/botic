import { uIOhook, UiohookMouseEvent, UiohookWheelEvent } from "uiohook-napi";
import { MouseButton } from "./constants.js";
import { HooksState } from "./types";

class MouseUpDownHook {
  #once: boolean = false;
  #button: MouseButton = MouseButton.ANY;
  #state: HooksState;
  #alt: boolean = false;
  #ctrl: boolean = false;
  #meta: boolean = false;
  #shift: boolean = false;
  #rotation: number = 0;

  constructor(state: HooksState) {
    this.#state = state;
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

  get up() {
    this.#rotation = -1;
    return this;
  }

  get down() {
    this.#rotation = 1;
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

  do(handler: (e: UiohookWheelEvent) => void) {
    let _isActive = true;

    const fn = (e: UiohookWheelEvent) => {
      if (
        (this.#rotation === 0 || e.rotation === this.#rotation) &&
        e.altKey === this.#alt &&
        e.ctrlKey === this.#ctrl &&
        e.metaKey === this.#meta &&
        e.shiftKey === this.#shift
      ) {
        handler(e);

        if (this.#once) {
          uIOhook.off("wheel", fn);
          _isActive = false;
        }
      }
    };

    uIOhook.on("wheel", fn);

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
          uIOhook.off("wheel", fn);
          _isActive = false;
        }
      },
      start() {
        if (!this.isActive) {
          uIOhook.on("wheel", fn);
          _isActive = true;
        }
      },
      toggle() {
        const type = this.isActive ? "off" : "on";
        uIOhook[type]("wheel", fn);
        _isActive = !_isActive;
      },
    };
  }
}

export default MouseUpDownHook;
