import IOHandle from "./IOHandle.js";
import { GlobalMouseEvent, Hook } from "./types";

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
      this.#all ||
      (e.alt === this.#alt &&
        e.ctrl === this.#ctrl &&
        e.meta === this.#meta &&
        e.shift === this.#shift);

    return new IOHandle(this.#id, "mousemove", predicate, handler, this.#once);
  }
}

export default MouseMoveHook;
