import { Point } from "../../common/types";

type Config = {
  start: Point;
  end: Point;
};

function* line({ start, end }: Config) {
  if (start.x === end.x && start.y === end.y) {
    return;
  }

  const deltaX = Math.abs(end.x - start.x);
  const deltaY = Math.abs(end.y - start.y);
  const steps = Math.max(deltaX, deltaY);
  const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
  const delayModifier = distance / steps;

  const signX = end.x > start.x ? 1 : -1;
  const signY = end.y > start.y ? 1 : -1;
  const incrementX = (deltaX / steps) * signX;
  const incrementY = (deltaY / steps) * signY;

  for (let i = 0; i <= steps; i++) {
    const x = start.x + Math.round(incrementX * i);
    const y = start.y + Math.round(incrementY * i);
    yield { x, y, mod: delayModifier };
  }
}

export default line;
