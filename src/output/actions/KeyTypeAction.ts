import clipboard from "clipboardy";
import { keyboard } from "@nut-tree/nut-js";
import { RegularKeys, ShiftedKeys, Keys } from "../../common/constants.js";
import delay from "../../utils/delay.js";
import { randomInt } from "../helpers/random.js";

class KeyTypeAction {
  #delay: number = 100;
  #natural: boolean = false;

  constructor() {}

  delay(ms: number) {
    this.#delay = ms;
    return this;
  }

  get natural() {
    this.#natural = true;
    return this;
  }

  get instant() {
    this.#delay = 0;
    return this;
  }

  get fast() {
    this.#delay = 50;
    return this;
  }

  get veryFast() {
    this.#delay = 25;
    return this;
  }

  get slow() {
    this.#delay = 200;
    return this;
  }

  get verySlow() {
    this.#delay = 400;
    return this;
  }

  async #pasteChar(char: string) {
    clipboard.writeSync(char);
    await keyboard.pressKey(Keys.Ctrl);
    await keyboard.pressKey(Keys.V);
    await keyboard.releaseKey(Keys.V);
    await keyboard.releaseKey(Keys.Ctrl);
  }

  async #typeKey(keycode: number) {
    await keyboard.pressKey(keycode);
    await keyboard.releaseKey(keycode);
  }

  async #typeShiftedKey(keycode: number) {
    await keyboard.pressKey(Keys.Shift);
    await keyboard.pressKey(keycode);
    await keyboard.releaseKey(keycode);
    await keyboard.releaseKey(Keys.Shift);
  }

  async #sendInstant(phrase: string) {
    clipboard.writeSync(phrase);
    await keyboard.pressKey(Keys.Ctrl);
    await keyboard.pressKey(Keys.V);
    await keyboard.releaseKey(Keys.V);
    await keyboard.releaseKey(Keys.Ctrl);
  }

  async #sendDelayed(phrase: string) {
    keyboard.config.autoDelayMs = 0;

    for (const char of phrase) {
      const ms = this.#natural
        ? randomInt(Math.round(this.#delay * 0.2), Math.round(this.#delay * 2))
        : this.#delay;

      if (RegularKeys.hasOwnProperty(char)) {
        await this.#typeKey(RegularKeys[char as keyof typeof RegularKeys]);
      } else if (ShiftedKeys.hasOwnProperty(char)) {
        await this.#typeShiftedKey(
          ShiftedKeys[char as keyof typeof ShiftedKeys]
        );
      } else {
        await this.#pasteChar(char);
      }

      await delay(ms);
    }
  }

  async send(phrase: string) {
    const temp = clipboard.readSync();

    this.#delay === 0
      ? await this.#sendInstant(phrase)
      : await this.#sendDelayed(phrase);

    clipboard.writeSync(temp);
  }
}

export default KeyTypeAction;
