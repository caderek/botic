import IOHandle from "../handles/IOHandle.js";
import { GlobalKeyboardEvent, Hook } from "../../common/types";
import { KeyCodesInput, KeysInput } from "../../common/constants.js";

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

  do(handler: (e: GlobalKeyboardEvent) => void) {
    const predicate = (e: GlobalKeyboardEvent) =>
      (this.#keycode === ANY_KEY || e.key === KeyCodesInput[this.#keycode]) &&
      (this.#all ||
        ((e.alt === this.#alt || this.#keycode === KeysInput.Alt) &&
          (e.ctrl === this.#ctrl || this.#keycode === KeysInput.Ctrl) &&
          (e.meta === this.#meta || this.#keycode === KeysInput.Meta) &&
          (e.shift === this.#shift || this.#keycode === KeysInput.Shift)));

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
