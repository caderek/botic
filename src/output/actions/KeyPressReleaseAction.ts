import { keyboard } from "@nut-tree/nut-js";
import { Keys } from "../../common/constants.js";

type Action = "down" | "up";

class KeyPressReleaseAction {
  #keycode: number;
  #action: Action;
  #methodName: "pressKey" | "releaseKey";
  #alt: boolean = false;
  #ctrl: boolean = false;
  #meta: boolean = false;
  #shift: boolean = false;

  constructor(action: Action, keycode: number) {
    this.#keycode = keycode;
    this.#action = action;
    this.#methodName = action === "down" ? "pressKey" : "releaseKey";
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

  async #toggleModifiers() {
    if (this.#alt) {
      await keyboard[this.#methodName](Keys.Alt);
    }

    if (this.#ctrl) {
      await keyboard[this.#methodName](Keys.Ctrl);
    }

    if (this.#meta) {
      await keyboard[this.#methodName](Keys.Meta);
    }

    if (this.#shift) {
      await keyboard[this.#methodName](Keys.Shift);
    }
  }

  async #press() {
    await this.#toggleModifiers();
    await keyboard[this.#methodName](this.#keycode);
  }

  async #release() {
    await keyboard[this.#methodName](this.#keycode);
    await this.#toggleModifiers();
  }

  async send() {
    keyboard.config.autoDelayMs = 0;
    this.#action === "down" ? await this.#press() : await this.#release();
  }
}

export default KeyPressReleaseAction;
