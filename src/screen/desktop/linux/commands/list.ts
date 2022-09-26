import { Window } from "../../../../common/types";
import centerOf from "../../../helpers/centerOf.js";
import delay from "../../../../utils/delay.js";
import execute from "../../../helpers/execute.js";
import { WindowsListError } from "../../../../common/errors/errors.js";
import prepareAppName from "../helpers/prepareAppName.js";
import getActiveHandle from "../helpers/getActiveHandle.js";

const APPS_TO_SKIP = new Set(["gjs"]);
const WINDOWS_REGEX =
  /^(0x[0-9a-f]{8})\s+([-]*\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+([a-zA-Z0-9-_.]+)\s+([a-zA-Z0-9-_.]+)\s+(.+)$/gm;
const WINDOW_REGEX =
  /^(0x[0-9a-f]{8})\s+([-]*\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+([a-zA-Z0-9-_.]+)\s+([a-zA-Z0-9-_.]+)\s+(.+)$/;

/**
 * Lists the available windows
 */
async function list(): Promise<Window[]> {
  let out: string;

  try {
    const std = await execute("wmctrl -l -G -x -p");
    out = std.out;

    if (std.err !== "") {
      throw new WindowsListError();
    }
  } catch (e) {
    // Retry if window list is in the process of updating
    if (e instanceof Error && e.message.includes("BadWindow")) {
      await delay(250);
      return list();
    }

    throw e;
  }

  const currentHandle = getActiveHandle();
  const [_, ...lines] = out.match(WINDOWS_REGEX) ?? [];
  const items = [];

  for (const line of lines) {
    const [_, ...values] = line.match(WINDOW_REGEX) ?? [];

    const handle = Number(values[0]);
    const workspace = Number(values[1]);
    const pid = Number(values[2]);
    const left = Number(values[3]);
    const top = Number(values[4]);
    const width = Number(values[5]);
    const height = Number(values[6]);
    const region = { left, top, width, height };
    const app = prepareAppName(values[7]);
    const title = values[9];
    const isActive = currentHandle === handle;

    const window = {
      handle,
      pid,
      workspace,
      app,
      title,
      region,
      center: centerOf(region),
      isActive: isActive,
    };

    items.push(window);
  }

  return items.filter((win) => !APPS_TO_SKIP.has(win.app));
}

export default list;
