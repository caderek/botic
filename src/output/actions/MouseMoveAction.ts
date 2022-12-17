import { mouse } from "@nut-tree/nut-js";
import toPoint from "../helpers/toPoint.js";
import { pressModifiers, releaseModifiers } from "../helpers/modifiers.js";
import toCenterPoint from "../helpers/toCenterPoint.js";
import toRandomPoint from "../helpers/toRandomPoint.js";

import { Point, Region } from "../../common/types";
import circular from "../path-generators/circular.js";
import line from "../path-generators/line.js";
import delay from "../../utils/delay.js";

type OnCheckpointHandler =
  | ((point: Point, index: number) => Promise<void> | void)
  | null;

type CircularOptions = {
  angle?: number;
  startAngle?: number;
  segments?: number;
  clockwise?: boolean;
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

  async #getStartPoint() {
    return this.#from ?? (await mouse.getPosition());
  }

  async onCheckpoint(handler: OnCheckpointHandler) {
    this.#onCheckpoint = handler;
    return this;
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
    const start = await this.#getStartPoint();
    const end = toPoint(args);
    await this.path([start, end]);
  }

  async diagonal(pixelsX: number, pixelsY: number) {
    const start = await this.#getStartPoint();
    const end = { x: start.x + pixelsX, y: start.y + pixelsY };
    await this.path([start, end]);
  }

  async horizontal(pixelsX: number) {
    const start = await this.#getStartPoint();
    const end = { x: start.x + pixelsX, y: start.y };
    await this.path([start, end]);
  }

  async vertical(pixelsY: number) {
    const start = await this.#getStartPoint();
    const end = { x: start.x, y: start.y + pixelsY };
    await this.path([start, end]);
  }

  async left(pixels: number) {
    const start = await this.#getStartPoint();
    const end = { x: start.x - Math.abs(pixels), y: start.y };
    await this.path([start, end]);
  }

  async right(pixels: number) {
    const start = await this.#getStartPoint();
    const end = { x: start.x + Math.abs(pixels), y: start.y };
    await this.path([start, end]);
  }

  async up(pixels: number) {
    const start = await this.#getStartPoint();
    const end = { x: start.x, y: start.y - Math.abs(pixels) };
    await this.path([start, end]);
  }

  async down(pixels: number) {
    const start = await this.#getStartPoint();
    const end = { x: start.x, y: start.y + Math.abs(pixels) };
    await this.path([start, end]);
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

  async angular(radius: number, options: CircularOptions = {}) {
    const center = this.#from ?? (await mouse.getPosition());

    if (options.segments && options.segments === 0) {
      return;
    }

    await this.path(
      circular({
        center,
        radius,
        angle: options.angle,
        startAngle: options.startAngle,
        segments: options.segments,
        clockwise: options.clockwise,
      })
    );
  }

  async path(checkpoints: Point[] | Generator<Point>) {
    mouse.config.autoDelayMs = 0;

    let checkpointIndex = 0;

    let start: Point = { x: 0, y: 0 };

    for (const checkpoint of checkpoints) {
      if (checkpointIndex === 0) {
        await mouse.setPosition(checkpoint);
        await pressModifiers([this.#alt, this.#ctrl, this.#meta, this.#shift]);
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

    await releaseModifiers([this.#alt, this.#ctrl, this.#meta, this.#shift]);
  }
}

export default MouseMoveAction;
