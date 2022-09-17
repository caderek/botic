import { uIOhook, UiohookKey } from "uiohook-napi";

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
    const modifiers = [
      ...(this.#alt ? [UiohookKey.Alt] : []),
      ...(this.#ctrl ? [UiohookKey.Ctrl] : []),
      ...(this.#meta ? [UiohookKey.Meta] : []),
      ...(this.#shift ? [UiohookKey.Shift] : []),
    ];

    uIOhook.keyTap(this.#keycode, modifiers);
  }
}

export default KeyTapAction;
