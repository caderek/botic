import {
  mouse,
  keyboard,
  Key,
  Button,
  down,
  Point as NutPoint,
} from "@nut-tree/nut-js";
import { getType, types } from "@arrows/dispatch";

interface Point {
  x: number;
  y: number;
}

class MouseAction {
  #clicks: number = 1;
  #button: Button;
  #action: "click" | "pressButton" | "releaseButton";
  #alt: boolean = false;
  #ctrl: boolean = false;
  #meta: boolean = false;
  #shift: boolean = false;

  constructor(
    button: Button,
    action: "click" | "pressButton" | "releaseButton"
  ) {
    this.#button = button;
    this.#action = action;
  }

  get double() {
    this.#clicks = 2;
    return this;
  }

  get triple() {
    this.#clicks = 3;
    return this;
  }

  get alt() {
    this.#alt = true;
    return this;
  }

  get ctrl() {
    this.#ctrl = true;
    return this;
  }

  get meta() {
    this.#meta = true;
    return this;
  }

  get shift() {
    this.#shift = true;
    return this;
  }

  async #exec(x?: number, y?: number): Promise<void>;
  async #exec(point: Point): Promise<void>;
  async #exec(...args: any[]) {
    if (getType(args[0]) === types.Object) {
      const { x, y } = args[0] as { x: number; y: number };
      await mouse.setPosition(new NutPoint(x, y));
    } else if (args[0] !== undefined && args[1] !== undefined) {
      const [x, y] = args as number[];
      await mouse.setPosition(new NutPoint(x, y));
    }

    const modifiers = [
      ...(this.#alt ? [Key.LeftAlt] : []),
      ...(this.#ctrl ? [Key.LeftControl] : []),
      ...(this.#meta ? [Key.LeftSuper] : []),
      ...(this.#shift ? [Key.LeftShift] : []),
    ];

    if (modifiers.length > 0) {
      await keyboard.pressKey(...modifiers);
    }

    await mouse[this.#action](this.#button);

    if (modifiers.length > 0) {
      await keyboard.releaseKey(...modifiers);
    }
  }

  async at(x: number, y: number): Promise<void>;
  async at(point: Point): Promise<void>;
  async at(...args: any[]) {
    return this.#exec(...args);
  }

  async here() {
    await this.#exec();
  }
}

export default MouseAction;

const x = new MouseAction(Button.LEFT, "click").at({ x: 1, y: 2 });

new MouseAction(Button.LEFT, "click").at(2);
