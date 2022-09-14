import IOHandle from "../handles/IOHandle.js";
import { GlobalScrollEvent, Hook } from "../../common/types";

class MouseScrollHook implements Hook {
  #id: Symbol;
  #once: boolean = false;
  #all: boolean = false;
  #alt: boolean = false;
  #ctrl: boolean = false;
  #meta: boolean = false;
  #shift: boolean = false;
  #rotation: "LEFT" | "RIGHT" | "UP" | "DOWN" | "ANY" = "ANY";
  #direction: "HORIZONTAL" | "VERTICAL" | "ANY" = "ANY";

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

  get up() {
    this.#rotation = "UP";
    return this;
  }

  get down() {
    this.#rotation = "DOWN";
    return this;
  }

  get left() {
    this.#rotation = "LEFT";
    return this;
  }

  get right() {
    this.#rotation = "RIGHT";
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

  do(handler: (e: GlobalScrollEvent) => void) {
    const predicate = (e: GlobalScrollEvent) =>
      (this.#rotation === "ANY" || e.rotation === this.#rotation) &&
      (this.#direction === "ANY" || e.direction === this.#direction) &&
      (this.#all ||
        (e.alt === this.#alt &&
          e.ctrl === this.#ctrl &&
          e.meta === this.#meta &&
          e.shift === this.#shift));

    return new IOHandle(this.#id, "wheel", predicate, handler, this.#once);
  }
}

export default MouseScrollHook;
