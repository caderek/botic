import { keyboard } from "@nut-tree/nut-js";
import { wrapWithModifiers } from "../helpers/modifiers.js";

class KeyTapAction {
  #keycode: number;
  #alt: boolean = false;
  #ctrl: boolean = false;
  #meta: boolean = false;
  #shift: boolean = false;

  constructor(keycode: number) {
    this.#keycode = keycode;
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

  async send() {
    keyboard.config.autoDelayMs = 0;
    await wrapWithModifiers(async () => {
      await keyboard.type(this.#keycode);
    }, [this.#alt, this.#ctrl, this.#meta, this.#shift]);
  }
}

export default KeyTapAction;
