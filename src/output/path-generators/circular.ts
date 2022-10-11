import { Point } from "../../common/types";
import ignoreUndefinedProps from "../helpers/ignoreUndefinedProps.js";

type Config = {
  center: Point;
  radius: number;
  angle?: number;
  startAngle?: number;
  segments?: number;
  clockwise?: boolean;
};

const defaults = {
  angle: 360,
  startAngle: 0,
  segments: Infinity,
  clockwise: true,
};

function pointOnCircle(
  radius: number,
  angle: number,
  cx: number,
  cy: number,
  clockwise: boolean
) {
  const angleRadians = ((clockwise ? -angle : angle) + 180) * (Math.PI / 180);
  const x = cx + radius * Math.sin(angleRadians);
  const y = cy + radius * Math.cos(angleRadians);
  return { x, y };
}

// @todo start from top not bottom, handle angle > 360 degrees (loop or error)
function* circular(options: Config) {
  const config = { ...defaults, ...(ignoreUndefinedProps(options) as Config) };

  const segments =
    config.segments === Infinity
      ? Math.round(config.radius * Math.PI)
      : config.segments;

  const angleIncrease = config.angle / segments;
  const steps = Math.ceil(config.angle / angleIncrease);
  const center = config.center;

  for (let i = 0; i <= steps; i++) {
    yield pointOnCircle(
      config.radius,
      config.startAngle + angleIncrease * i,
      center.x,
      center.y,
      config.clockwise
    );
  }
}

export default circular;
