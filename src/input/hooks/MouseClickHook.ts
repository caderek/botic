import IOHandle from "../handles/IOHandle.js";
import { MouseButton } from "../../common/constants.js";
import { GlobalMouseEvent, Hook } from "../../common/types";

class MouseClickHook implements Hook {
  #id: Symbol;
  #once: boolean = false;
  #all: boolean = false;
  #clicks: number = 1;
  #button: MouseButton;
  #alt: boolean = false;
  #ctrl: boolean = false;
  #meta: boolean = false;
  #shift: boolean = false;

  constructor(button: MouseButton) {
    this.#id = Symbol();
    this.#button = button;
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

  get Alt() {
    this.#alt = true;
    return this;
  }

  get Ctrl() {
    this.#ctrl = true;
    return this;
  }

  get Meta() {
    this.#meta = true;
    return this;
  }

  get Shift() {
    this.#shift = true;
    return this;
  }

  do(handler: (e: GlobalMouseEvent) => void) {
    const predicate = (e: GlobalMouseEvent) =>
      (this.#button === MouseButton.Any || e.button === this.#button) &&
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
