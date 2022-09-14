import { mouse, Button } from "@nut-tree/nut-js";
import { getType, types } from "@arrows/dispatch";
import wrapWithModifiers from "../helpers/wrapWithModifiers.js";
import toCenterPoint from "../helpers/toCenterPoint.js";

import { Point, Region } from "../../../common/types";

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

  async center(region?: Region): Promise<void>;
  async center(region: { region: Region }): Promise<void>;
  async center(arg?: any) {
    const point = await toCenterPoint(arg);
    await this.#exec(point);
  }
}

export default MouseClickAction;
