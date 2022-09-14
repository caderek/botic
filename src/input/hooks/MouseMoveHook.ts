import IOHandle from "../handles/IOHandle.js";
import { GlobalMouseEvent, Hook } from "../../common/types";

class MouseMoveHook implements Hook {
  #id: Symbol;
  #once: boolean = false;
  #all: boolean = false;
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
      this.#all ||
      (e.alt === this.#alt &&
        e.ctrl === this.#ctrl &&
        e.meta === this.#meta &&
        e.shift === this.#shift);

    return new IOHandle(this.#id, "mousemove", predicate, handler, this.#once);
  }
}

export default MouseMoveHook;
