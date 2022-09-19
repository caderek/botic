import IOHandle from "../handles/IOHandle.js";
import { MouseButton } from "../../common/constants.js";
import { GlobalMouseEvent, Hook } from "../../common/types";

class MousePressReleaseHook implements Hook {
  #id: Symbol;
  #once: boolean = false;
  #all: boolean = false;
  #alt: boolean = false;
  #ctrl: boolean = false;
  #meta: boolean = false;
  #shift: boolean = false;
  #button: MouseButton;
  #variant: "mousedown" | "mouseup";

  constructor(variant: "mousedown" | "mouseup", button: MouseButton) {
    this.#variant = variant;
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
      (this.#button === MouseButton.None || e.button === this.#button) &&
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

export default MousePressReleaseHook;
