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
  #rotation: "left" | "right" | "up" | "down" | "any" = "any";
  #direction: "horizontal" | "vertical" | "any" = "any";

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
    this.#rotation = "up";
    return this;
  }

  get down() {
    this.#rotation = "down";
    return this;
  }

  get left() {
    this.#rotation = "left";
    return this;
  }

  get right() {
    this.#rotation = "right";
    return this;
  }

  get vertical() {
    this.#direction = "vertical";
    return this;
  }

  get horizontal() {
    this.#direction = "horizontal";
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
      (this.#rotation === "any" || e.rotation === this.#rotation) &&
      (this.#direction === "any" || e.direction === this.#direction) &&
      (this.#all ||
        (e.alt === this.#alt &&
          e.ctrl === this.#ctrl &&
          e.meta === this.#meta &&
          e.shift === this.#shift));

    return new IOHandle(this.#id, "wheel", predicate, handler, this.#once);
  }
}

export default MouseScrollHook;
