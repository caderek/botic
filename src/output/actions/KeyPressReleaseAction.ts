import { uIOhook, UiohookKey } from "uiohook-napi";

type Variant = "down" | "up";

class KeyPressReleaseAction {
  #keycode: number;
  #action: Variant;
  #alt: boolean = false;
  #ctrl: boolean = false;
  #meta: boolean = false;
  #shift: boolean = false;

  constructor(action: Variant, keycode: number) {
    this.#keycode = keycode;
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

  async send() {
    if (this.#alt) {
      uIOhook.keyToggle(UiohookKey.Alt, this.#action);
    }

    if (this.#ctrl) {
      uIOhook.keyToggle(UiohookKey.Ctrl, this.#action);
    }

    if (this.#meta) {
      uIOhook.keyToggle(UiohookKey.Meta, this.#action);
    }

    if (this.#shift) {
      uIOhook.keyToggle(UiohookKey.Shift, this.#action);
    }

    uIOhook.keyToggle(this.#keycode, this.#action);
  }
}

export default KeyPressReleaseAction;
