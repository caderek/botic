import { Point, Region } from "../../types";
import { screen } from "@nut-tree/nut-js";

async function toCenterPoint(region?: Region): Promise<Point>;
async function toCenterPoint(region: { region: Region }): Promise<Point>;
async function toCenterPoint(arg?: any) {
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
    x: region.left + region.width / 2,
    y: region.top + region.height / 2,
  };
}

export default toCenterPoint;
