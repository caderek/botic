import { uIOhook, UiohookWheelEvent } from "uiohook-napi";
import IOHandle from "./IOHandle.js";
import { GlobalScrollEvent, Hook } from "./types";

class MouseScrollHook implements Hook {
  #id: Symbol;
  #once: boolean = false;
  #alt: boolean = false;
  #ctrl: boolean = false;
  #meta: boolean = false;
  #shift: boolean = false;
  #rotation: number = 0;
  #direction: "HORIZONTAL" | "VERTICAL" | "ANY" = "ANY";

  constructor() {
    this.#id = Symbol();
  }

  get once() {
    this.#once = true;
    return this;
  }

  get up() {
    this.#rotation = -1;
    return this;
  }

  get down() {
    this.#rotation = 1;
    return this;
  }

  get vertical() {
    this.#direction = "VERTICAL";
    return this;
  }

  get horizontal() {
    this.#direction = "HORIZONTAL";
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

  do(handler: (e: GlobalScrollEvent) => void) {
    const predicate = (e: GlobalScrollEvent) =>
      (this.#rotation === 0 || e.rotation === this.#rotation) &&
      (this.#direction === "ANY" || e.direction === this.#direction) &&
      e.alt === this.#alt &&
      e.ctrl === this.#ctrl &&
      e.meta === this.#meta &&
      e.shift === this.#shift;

    return new IOHandle(this.#id, "wheel", predicate, handler, this.#once);
  }
}

export default MouseScrollHook;
