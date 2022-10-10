import { mouse, left, right, up, down, straightTo } from "@nut-tree/nut-js";
import toPoint from "../helpers/toPoint.js";
import {
  wrapWithModifiers,
  pressModifiers,
  releaseModifiers,
} from "../helpers/modifiers.js";
import toCenterPoint from "../helpers/toCenterPoint.js";
import toRandomPoint from "../helpers/toRandomPoint.js";

import { Point, Region } from "../../common/types";
import polygon from "../path-generators/polygon.js";
import line from "../path-generators/line.js";
import delay from "../../utils/delay.js";

type OnCheckpointHandler =
  | ((point: Point, index: number) => Promise<void> | void)
  | null;

type CircularOptions = {
  angle?: number;
  startAngle?: number;
  segments?: number;
};

class MouseMoveAction {
  #alt: boolean = false;
  #ctrl: boolean = false;
  #meta: boolean = false;
  #shift: boolean = false;
  #delay: number = 2;
  #from?: Point;
  #onCheckpoint: OnCheckpointHandler = null;

  constructor() {}

  delay(ms: number) {
    this.#delay = ms;
    return this;
  }

  get fast() {
    this.#delay = 1;
    return this;
  }

  get veryFast() {
    this.#delay = 0;
    return this;
  }

  get slow() {
    this.#delay = 4;
    return this;
  }

  get verySlow() {
    this.#delay = 8;
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

  async onCheckpoint(handler: OnCheckpointHandler) {
    this.#onCheckpoint = handler;
  }

  from(point: Point): MouseMoveAction;
  from(x: number, y: number): MouseMoveAction;
  from(...args: any[]) {
    this.#from = toPoint(args);
    return this;
  }

  async to(point: Point): Promise<void>;
  async to(x: number, y: number): Promise<void>;
  async to(...args: any[]) {
    const point = toPoint(args);
    let start = this.#from ?? (await mouse.getPosition());

    await wrapWithModifiers(async () => {
      await this.path([start, point]);
    }, [this.#alt, this.#ctrl, this.#meta, this.#shift]);
  }

  async relative(pixelsX: number, pixelsY: number) {
    const currentPos = await mouse.getPosition();
    await this.to({ x: currentPos.x + pixelsX, y: currentPos.y + pixelsY });
  }

  async horizontal(pixelsX: number) {
    await wrapWithModifiers(async () => {
      await mouse.move(right(pixelsX));
    }, [this.#alt, this.#ctrl, this.#meta, this.#shift]);
  }

  async vertical(pixelsY: number) {
    await wrapWithModifiers(async () => {
      await mouse.move(down(pixelsY));
    }, [this.#alt, this.#ctrl, this.#meta, this.#shift]);
  }

  async left(pixels: number) {
    await wrapWithModifiers(async () => {
      await mouse.move(left(Math.abs(pixels)));
    }, [this.#alt, this.#ctrl, this.#meta, this.#shift]);
  }

  async right(pixels: number) {
    await wrapWithModifiers(async () => {
      await mouse.move(right(Math.abs(pixels)));
    }, [this.#alt, this.#ctrl, this.#meta, this.#shift]);
  }

  async up(pixels: number) {
    await wrapWithModifiers(async () => {
      await mouse.move(up(Math.abs(pixels)));
    }, [this.#alt, this.#ctrl, this.#meta, this.#shift]);
  }

  async down(pixels: number) {
    await wrapWithModifiers(async () => {
      await mouse.move(down(Math.abs(pixels)));
    }, [this.#alt, this.#ctrl, this.#meta, this.#shift]);
  }

  async center(region?: Region): Promise<void>;
  async center(region: { region: Region }): Promise<void>;
  async center(arg?: any) {
    const point = await toCenterPoint(arg);
    await this.to(point);
  }

  async random(region?: Region): Promise<void>;
  async random(region: { region: Region }): Promise<void>;
  async random(arg?: any) {
    const point = await toRandomPoint(arg);
    await this.to(point);
  }

  async circular(radius: number, options: CircularOptions = {}) {
    const center = this.#from ?? (await mouse.getPosition());

    if (options.segments && options.segments === 0) {
      return;
    }

    await this.path(
      polygon({
        center,
        radius,
        angle: options.angle,
        startAngle: options.startAngle,
        segments: options.segments,
      })
    );

    // await mouse.setPosition(center);
  }

  async path(checkpoints: Point[] | Generator<Point>) {
    let checkpointIndex = 0;

    let start: Point = { x: 0, y: 0 };

    for (const checkpoint of checkpoints) {
      if (checkpointIndex === 0) {
        await mouse.setPosition(checkpoint);
        await pressModifiers([this.#alt, this.#ctrl, this.#meta, this.#shift]);
        await mouse.pressButton(0);
      } else {
        const points = line({ start, end: checkpoint });

        for (const point of points) {
          await mouse.setPosition(point);

          if (this.#delay > 0) {
            await delay(this.#delay);
          }
        }
      }

      if (this.#onCheckpoint) {
        await this.#onCheckpoint(checkpoint, checkpointIndex);
      }

      start = checkpoint;
      checkpointIndex++;
    }

    await mouse.releaseButton(0);
    await releaseModifiers([this.#alt, this.#ctrl, this.#meta, this.#shift]);
  }
}

export default MouseMoveAction;
