import {
  mouse,
  left,
  right,
  up,
  down,
  straightTo,
  Key,
  Button,
} from "@nut-tree/nut-js";
import { getType, types } from "@arrows/dispatch";

import { Point } from "../../types";
import toPoint from "../helpers/toPoint.js";
import wrapWithModifiers from "../helpers/wrapWithModifiers.js";

class MouseMoveAction {
  #alt: boolean = false;
  #ctrl: boolean = false;
  #meta: boolean = false;
  #shift: boolean = false;
  #speed: number = 2000;
  #delay: number = 0;

  constructor() {}

  delay(ms: number) {
    this.#delay = ms;
    return this;
  }

  speed(value: number) {
    this.#speed = value;
    return this;
  }

  get fast() {
    this.#speed = 4000;
    return this;
  }

  get veryFast() {
    this.#speed = 16000;
    return this;
  }

  get slow() {
    this.#speed = 1000;
    return this;
  }

  get verySlow() {
    this.#speed = 250;
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

  async to(point: Point): Promise<void>;
  async to(x: number, y: number): Promise<void>;
  async to(...args: any[]) {
    const point = toPoint(args);

    await wrapWithModifiers(async () => {
      mouse.config.mouseSpeed = this.#speed;
      mouse.config.autoDelayMs = this.#delay;
      await mouse.move(straightTo(point));
    }, [this.#alt, this.#ctrl, this.#meta, this.#shift]);
  }
}

export default MouseMoveAction;
