import IOHandle from "./IOHandle.js";
import { GlobalMouseEvent, Hook } from "./types";
import { MouseButton } from "./constants.js";

class MouseClickHook implements Hook {
  #id: Symbol;
  #once: boolean = false;
  #all: boolean = false;
  #clicks: number = 1;
  #button: MouseButton = MouseButton.NONE;
  #alt: boolean = false;
  #ctrl: boolean = false;
  #meta: boolean = false;
  #shift: boolean = false;

  constructor() {
    this.#id = Symbol();
  }

  get once() {
    this.#once = true;
    return this;
  }

  get all() {
    this.#all = true;
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
    const predicate = (e: GlobalMouseEvent) =>
      (this.#button === MouseButton.NONE || e.button === this.#button) &&
      (this.#clicks === 1 || e.clicks === this.#clicks) &&
      (this.#all ||
        (e.alt === this.#alt &&
          e.ctrl === this.#ctrl &&
          e.meta === this.#meta &&
          e.shift === this.#shift));

    return new IOHandle(this.#id, "click", predicate, handler, this.#once);
  }
}

export default MouseClickHook;
