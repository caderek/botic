import { mouse, left, right, up, down, straightTo } from "@nut-tree/nut-js";
import toPoint from "../helpers/toPoint.js";
import wrapWithModifiers from "../helpers/wrapWithModifiers.js";
import toCenterPoint from "../helpers/toCenterPoint.js";
import toRandomPoint from "../helpers/toRandomPoint.js";

import { Point, Region } from "../../common/types";
import polygon from "../path-generators/polygon.js";
import line from "../path-generators/line.js";
import delay from "../../utils/delay.js";

type OnStepHandler =
  | ((point: Point, index: number) => Promise<void> | void)
  | null;

type CircularOptions = {
  angle?: number;
  startAngle?: number;
  segments?: number;
};

const defaultCircularOptions: Required<CircularOptions> = {
  angle: 360,
  startAngle: 0,
  segments: Infinity,
};

function pointsOnCircle(radius: number, angle: number, cx: number, cy: number) {
  angle = angle * (Math.PI / 180);
  const x = cx + radius * Math.sin(angle);
  const y = cy + radius * Math.cos(angle);
  return { x, y };
}

class MouseMoveAction {
  #alt: boolean = false;
  #ctrl: boolean = false;
  #meta: boolean = false;
  #shift: boolean = false;
  #delay: number = 2;
  #from?: Point;
  #onStep: OnStepHandler = null;

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

  async onStep(handler: OnStepHandler) {
    this.#onStep = handler;
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

    await wrapWithModifiers(async () => {
      if (this.#from) {
        await mouse.setPosition(this.#from);
      }

      await mouse.move(straightTo(point));
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

  async circle(radius: number, options: CircularOptions = {}) {
    const center = this.#from ?? (await mouse.getPosition());

    await this.path(
      polygon({
        center,
        radius,
        angle: options.angle,
        startAngle: options.startAngle,
        segments: options.segments,
      }),
      true
    );

    await mouse.setPosition(center);
  }

  async path(
    checkpoints: Point[] | Generator<Point>,
    jumpToFirst: boolean = true
  ) {
    let i = 0;
    let start = await mouse.getPosition();

    for (const checkpoint of checkpoints) {
      if (i === 0 && jumpToFirst) {
        await mouse.setPosition(checkpoint);
      } else {
        const points = line({ start, end: checkpoint });

        for (const point of points) {
          await mouse.setPosition(point);

          if (this.#delay > 0) {
            await delay(this.#delay);
          }
        }
      }

      if (this.#onStep) {
        await this.#onStep(checkpoint, i);
      }

      i++;
      start = checkpoint;
    }
  }
}

export default MouseMoveAction;
