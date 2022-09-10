import { mouse, Button, Point as NutPoint } from "@nut-tree/nut-js";
import { getType, types } from "@arrows/dispatch";
import toCenterPoint from "../helpers/toCenterPoint.js";

import { Point, Region } from "../../types";
import wrapWithModifiers from "../helpers/wrapWithModifiers.js";

type Action = "pressButton" | "releaseButton";

class MousePressReleaseAction {
  #button: Button;
  #action: Action;
  #alt: boolean = false;
  #ctrl: boolean = false;
  #meta: boolean = false;
  #shift: boolean = false;

  constructor(button: Button, action: Action) {
    this.#button = button;
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

    await wrapWithModifiers(async () => {
      await mouse[this.#action](this.#button);
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

export default MousePressReleaseAction;
