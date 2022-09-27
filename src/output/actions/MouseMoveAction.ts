import { mouse, left, right, up, down, straightTo } from "@nut-tree/nut-js";
import toPoint from "../helpers/toPoint.js";
import wrapWithModifiers from "../helpers/wrapWithModifiers.js";
import toCenterPoint from "../helpers/toCenterPoint.js";
import toRandomPoint from "../helpers/toRandomPoint.js";

import { Point, Region } from "../../common/types";
import circular from "../path-generators/circular.js";

type OnStep = ((point: Point) => Promise<void> | void) | null;

type CircularOptions = {
  angle?: number;
  startAngle?: number;
  onStep?: OnStep;
};

const defaultCircularOptions: Required<CircularOptions> = {
  angle: 360,
  startAngle: 0,
  onStep: null,
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
  #speed: number = 2000;
  #delay: number = 0;
  #from?: Point;

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
    mouse.config.mouseSpeed = this.#speed;
    mouse.config.autoDelayMs = this.#delay;

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

  async circular(radius: number, options: CircularOptions = {}) {
    const center = this.#from ?? (await mouse.getPosition());

    await this.path(
      circular({
        center,
        radius,
        angle: options.angle,
        startAngle: options.startAngle,
      }),
      options.onStep ?? null,
      true
    );

    await mouse.setPosition(center);
  }

  async path(
    points: Point[] | Generator<Point>,
    onStep: OnStep,
    jumpToFirst: boolean = false
  ) {
    let first = true;
    for (const point of points) {
      if (first && jumpToFirst) {
        await mouse.setPosition(point);
        first = false;
      } else {
        await mouse.move(straightTo(point));
      }

      if (onStep) {
        await onStep(point);
      }
    }
  }
}

export default MouseMoveAction;
