import { Point } from "../../common/types";
import ignoreUndefinedProps from "../helpers/ignoreUndefinedProps.js";

type Config = {
  center: Point;
  radius: number;
  angle?: number;
  startAngle?: number;
};

const defaults = {
  angle: 360,
  startAngle: 0,
};

function pointsOnCircle(radius: number, angle: number, cx: number, cy: number) {
  angle = angle * (Math.PI / 180);
  const x = cx + radius * Math.sin(angle);
  const y = cy + radius * Math.cos(angle);
  return { x, y };
}

function* circular(options: Config) {
  const config = { ...defaults, ...(ignoreUndefinedProps(options) as Config) };

  const slices = config.radius;
  const angleIncrease = 360 / slices;
  const steps = Math.ceil(config.angle / angleIncrease);
  const fluidAngleIncrease = config.angle / steps;
  const center = config.center;

  for (let i = 0; i < steps; i++) {
    yield pointsOnCircle(
      config.radius,
      fluidAngleIncrease * i + config.startAngle,
      center.x,
      center.y
    );
  }
}

export default circular;
