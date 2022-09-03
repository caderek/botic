import IOHandle from "./IOHandle.js";
import { MouseButton } from "./constants.js";
import { GlobalMouseEvent, Hook } from "./types";

class MousePressReleaseHook implements Hook {
  #id: Symbol;
  #once: boolean = false;
  #all: boolean = false;
  #alt: boolean = false;
  #ctrl: boolean = false;
  #meta: boolean = false;
  #shift: boolean = false;
  #button: MouseButton = MouseButton.NONE;
  #variant: "mousedown" | "mouseup";

  constructor(variant: "mousedown" | "mouseup") {
    this.#variant = variant;
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
