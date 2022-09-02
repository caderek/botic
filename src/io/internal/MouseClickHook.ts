import { uIOhook } from "uiohook-napi";
import { MouseButton } from "./constants.js";
import { MainHook, Hook, GlobalMouseEvent } from "./types";

class MouseClickHook implements Hook {
  #once: boolean = false;
  #clicks: number = 1;
  #button: MouseButton = MouseButton.NONE;
  #mainHook: MainHook;
  #alt: boolean = false;
  #ctrl: boolean = false;
  #meta: boolean = false;
  #shift: boolean = false;
  #id: Symbol;

  constructor(mainHook: MainHook) {
    this.#mainHook = mainHook;
    this.#id = Symbol();
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

  do(handler: (e: GlobalMouseEvent) => void) {
    let _isActive = true;
    this.#mainHook.start(this.#id);

    const fn = (e: GlobalMouseEvent) => {
      if (
        (this.#button === MouseButton.NONE || e.button === this.#button) &&
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

    return {
      get isActive() {
        return _isActive;
      },
      stop: () => {
        if (_isActive) {
          this.#mainHook.stop(this.#id);
          uIOhook.off("click", fn);
          _isActive = false;
        }
      },
      start: () => {
        if (!_isActive) {
          this.#mainHook.start(this.#id);
          uIOhook.on("click", fn);
          _isActive = true;
        }
      },
      toggle: () => {
        const type = _isActive ? "off" : "on";
        uIOhook[type]("click", fn);
        _isActive = !_isActive;
      },
    };
  }
}

export default MouseClickHook;
