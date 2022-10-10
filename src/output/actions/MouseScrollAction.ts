import { mouse } from "@nut-tree/nut-js";
import { wrapWithModifiers } from "../helpers/modifiers.js";

type Action = "scrollDown" | "scrollUp" | "scrollLeft" | "scrollRight";

class MouseScrollAction {
  #action: Action;
  #alt: boolean = false;
  #ctrl: boolean = false;
  #meta: boolean = false;
  #shift: boolean = false;

  constructor(action: Action) {
    this.#action = action;
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

  async many(amount: number) {
    await wrapWithModifiers(async () => {
      await mouse[this.#action](amount);
    }, [this.#alt, this.#ctrl, this.#meta, this.#shift]);
  }

  async once() {
    await this.many(1);
  }
}

export default MouseScrollAction;
