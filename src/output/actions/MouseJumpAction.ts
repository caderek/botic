import { mouse } from "@nut-tree/nut-js";
import toPoint from "../helpers/toPoint.js";
import toCenterPoint from "../helpers/toCenterPoint.js";
import toRandomPoint from "../helpers/toRandomPoint.js";

import { Point, Region } from "../../common/types";
import circular from "../path-generators/circular.js";

type OnCheckpointHandler =
  | ((point: Point, index: number) => Promise<void> | void)
  | null;

type CircularOptions = {
  angle?: number;
  startAngle?: number;
  segments?: number;
  clockwise?: boolean;
};

class MouseJumpAction {
  #from?: Point;
  #onCheckpoint: OnCheckpointHandler = null;

  constructor() {}

  async #getStartPoint() {
    return this.#from ?? (await mouse.getPosition());
  }

  async onCheckpoint(handler: OnCheckpointHandler) {
    this.#onCheckpoint = handler;
  }

  from(point: Point): MouseJumpAction;
  from(x: number, y: number): MouseJumpAction;
  from(...args: any[]) {
    this.#from = toPoint(args);
    return this;
  }

  async to(point: Point): Promise<void>;
  async to(x: number, y: number): Promise<void>;
  async to(...args: any[]) {
    const end = toPoint(args);
    await this.path([end]);
  }

  async diagonal(pixelsX: number, pixelsY: number) {
    const start = await this.#getStartPoint();
    const end = { x: start.x + pixelsX, y: start.y + pixelsY };
    await this.path([end]);
  }

  async horizontal(pixelsX: number) {
    const start = await this.#getStartPoint();
    const end = { x: start.x + pixelsX, y: start.y };
    await this.path([end]);
  }

  async vertical(pixelsY: number) {
    const start = await this.#getStartPoint();
    const end = { x: start.x, y: start.y + pixelsY };
    await this.path([end]);
  }

  async left(pixels: number) {
    const start = await this.#getStartPoint();
    const end = { x: start.x - Math.abs(pixels), y: start.y };
    await this.path([end]);
  }

  async right(pixels: number) {
    const start = await this.#getStartPoint();
    const end = { x: start.x + Math.abs(pixels), y: start.y };
    await this.path([end]);
  }

  async up(pixels: number) {
    const start = await this.#getStartPoint();
    const end = { x: start.x, y: start.y - Math.abs(pixels) };
    await this.path([end]);
  }

  async down(pixels: number) {
    const start = await this.#getStartPoint();
    const end = { x: start.x, y: start.y + Math.abs(pixels) };
    await this.path([end]);
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

    for (const checkpoint of checkpoints) {
      await mouse.setPosition(checkpoint);

      if (this.#onCheckpoint) {
        await this.#onCheckpoint(checkpoint, checkpointIndex);
      }

      checkpointIndex++;
    }
  }
}

export default MouseJumpAction;
