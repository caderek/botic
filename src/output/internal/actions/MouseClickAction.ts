import { mouse, Button } from "@nut-tree/nut-js";
import { getType, types } from "@arrows/dispatch";
import wrapWithModifiers from "../helpers/wrapWithModifiers.js";

import { Point } from "../../types";

class MouseClickAction {
  #clicks: number = 1;
  #button: Button;
  #alt: boolean = false;
  #ctrl: boolean = false;
  #meta: boolean = false;
  #shift: boolean = false;

  constructor(button: Button) {
    this.#button = button;
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
      const point = args[0] as { x: number; y: number };
      await mouse.setPosition(point);
    } else if (args[0] !== undefined && args[1] !== undefined) {
      const [x, y] = args as number[];
      await mouse.setPosition({ x, y });
    }

    await wrapWithModifiers(async () => {
      while (this.#clicks--) {
        await mouse.click(this.#button);
      }
    }, [this.#alt, this.#ctrl, this.#meta, this.#shift]);
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

export default MouseClickAction;
