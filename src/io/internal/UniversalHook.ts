import IOHandle from "./IOHandle.js";
import { Hook, GlobalInputEvent } from "./types";

class UniversalHook implements Hook {
  #id: Symbol;
  #once: boolean = false;
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

  do(handler: (e: GlobalInputEvent) => void) {
    const predicate = (e: GlobalInputEvent) =>
      (!this.#alt && !this.#ctrl && !this.#meta && !this.#shift) ||
      (e.alt === this.#alt &&
        e.ctrl === this.#ctrl &&
        e.meta === this.#meta &&
        e.shift === this.#shift);

    return new IOHandle(this.#id, "input", predicate, handler, this.#once);
  }
}

export default UniversalHook;
