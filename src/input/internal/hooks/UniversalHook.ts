import IOHandle from "../handles/IOHandle.js";
import { Hook, GlobalInputEvent } from "../../types";

class UniversalHook implements Hook {
  #id: Symbol;
  #once: boolean = false;

  constructor() {
    this.#id = Symbol();
  }

  get once() {
    this.#once = true;
    return this;
  }

  do(handler: (e: GlobalInputEvent) => void) {
    const predicate = (e: GlobalInputEvent) => true;

    return new IOHandle(this.#id, "input", predicate, handler, this.#once);
  }
}

export default UniversalHook;
