import { mouse, keyboard, Key, Point as NutPoint } from "@nut-tree/nut-js";

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
    const modifiers = [
      ...(this.#alt ? [Key.LeftAlt] : []),
      ...(this.#ctrl ? [Key.LeftControl] : []),
      ...(this.#meta ? [Key.LeftSuper] : []),
      ...(this.#shift ? [Key.LeftShift] : []),
    ];

    if (modifiers.length > 0) {
      await keyboard.pressKey(...modifiers);
    }

    await mouse[this.#action](amount);

    if (modifiers.length > 0) {
      await keyboard.releaseKey(...modifiers);
    }
  }

  async once() {
    await this.many(1);
  }
}

export default MouseScrollAction;
