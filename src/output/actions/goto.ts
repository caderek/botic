import { getType, types } from "@arrows/dispatch";
import { mouse } from "@nut-tree/nut-js";
import { Point } from "../../common/types";

async function goto(point: Point): Promise<void>;
async function goto(x: number, y: number): Promise<void>;
async function goto(...args: any[]) {
  const point =
    getType(args[0]) === types.Object ? args[0] : { x: args[0], y: args[1] };

  await mouse.setPosition(point);
}

export default goto;
