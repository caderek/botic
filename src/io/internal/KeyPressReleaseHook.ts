import IOHandle from "./IOHandle.js";
import { GlobalKeyboardEvent, Hook } from "./types";

const ANY_KEY = -1;

class KeyPressReleaseHook implements Hook {
  #id: Symbol;
  #once: boolean = false;
  #all: boolean = false;
  #alt: boolean = false;
  #ctrl: boolean = false;
  #meta: boolean = false;
  #shift: boolean = false;
  #keycode: number;
  #variant: "keydown" | "keyup";

  constructor(variant: "keydown" | "keyup", keycode: number = ANY_KEY) {
    this.#id = Symbol();
    this.#keycode = keycode;
    this.#variant = variant;
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

  do(handler: (e: GlobalKeyboardEvent) => void) {
    const predicate = (e: GlobalKeyboardEvent) =>
      (this.#keycode === ANY_KEY || e.key === this.#keycode) &&
      (this.#all ||
        (e.alt === this.#alt &&
          e.ctrl === this.#ctrl &&
          e.meta === this.#meta &&
          e.shift === this.#shift));

    return new IOHandle(
      this.#id,
      this.#variant,
      predicate,
      handler,
      this.#once
    );
  }
}

export default KeyPressReleaseHook;
