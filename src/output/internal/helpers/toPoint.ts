import { getType, types } from "@arrows/dispatch";
import { Point } from "../../types";

function toPoint(point: [Point]): Point;
function toPoint(point: number[]): Point;
function toPoint(args: any[]) {
  const [a, b] = args;
  const isObject = getType(a) === types.Object;

  if (
    (isObject && (typeof a.x !== "number" || typeof a.y !== "number")) ||
    (!isObject && (typeof a !== "number" || typeof b !== "number"))
  ) {
    throw new Error(
      "Arguments have to be either two number coordinates, or an object with x and y properties."
    );
  }

  return isObject ? args[0] : { x: a, y: b };
}

export default toPoint;
