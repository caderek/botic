import { Region } from "../../common/types";

function centerOf(region: Region) {
  return {
    x: region.left + Math.round(region.width / 2),
    y: region.top + Math.round(region.height / 2),
  };
}

export default centerOf;
