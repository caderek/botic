import { Point, Region } from "../../common/types";
import { screen } from "@nut-tree/nut-js";
import { randomInt } from "./random.js";

async function toRandomPoint(region?: Region): Promise<Point>;
async function toRandomPoint(region: { region: Region }): Promise<Point>;
async function toRandomPoint(arg?: any) {
  let region: Region;

  if (!arg) {
    region = {
      left: 0,
      top: 0,
      width: await screen.width(),
      height: await screen.height(),
    };
  } else if (arg.region) {
    region = arg.region;
  } else {
    region = arg;
  }

  return {
    x: randomInt(region.left, region.left + region.width),
    y: randomInt(region.top, region.top + region.height),
  };
}

export default toRandomPoint;
