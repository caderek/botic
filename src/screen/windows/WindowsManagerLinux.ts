import { execSync } from "node:child_process";
import { getActiveWindow } from "@nut-tree/nut-js";
import { Window, WindowsManager } from "../../common/types";
import centerOf from "../helpers/centerOf.js";

const APPS_TO_SKIP = new Set(["gjs"]);
const WINDOWS_REGEX =
  /^(0x[0-9a-f]{8})\s+([-]*\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+([a-zA-Z0-9-_.]+)\s+([a-zA-Z0-9-_.]+)\s+(.+)$/gm;
const WINDOW_REGEX =
  /^(0x[0-9a-f]{8})\s+([-]*\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+([a-zA-Z0-9-_.]+)\s+([a-zA-Z0-9-_.]+)\s+(.+)$/;

const prepareAppName = (wmClass: string) => {
  const chunks = wmClass.split(".");

  if (chunks.length === 2) {
    return chunks[0].toLocaleLowerCase();
  }

  if (chunks.length % 2 !== 0) {
    return chunks[chunks.length].toLocaleLowerCase();
  }

  return chunks[chunks.length / 2 - 1].toLocaleLowerCase();
};

// @todo region and center should maybe be getters on window object to always get current stat
class WindowsManagerLinux implements WindowsManager {
  constructor() {}

  async list() {
    const out = execSync("wmctrl -l -G -x").toString();
    const [_, ...lines] = out.match(WINDOWS_REGEX) ?? [];
    const items = [];

    for (const line of lines) {
      const [_, ...values] = line.match(WINDOW_REGEX) ?? [];

      const handle = Number(values[0]);
      const workspace = Number(values[1]);
      const left = Number(values[2]);
      const top = Number(values[3]);
      const width = Number(values[4]);
      const height = Number(values[5]);
      const region = { left, top, width, height };
      const app = prepareAppName(values[6]);
      const title = values[8];

      const window = {
        handle,
        workspace,
        app,
        title,
        region,
        center: centerOf(region),
      };

      items.push(window);
    }

    return items.filter((win) => !APPS_TO_SKIP.has(win.app));
  }

  async active() {
    const current = await getActiveWindow();
    const currentTitle = await current.title;
    const windows = await this.list();
    return windows.find((win) => win.title === currentTitle) ?? null;
  }

  async activate(window: Window): Promise<void>;
  async activate(window: number): Promise<void>;
  async activate(window: string): Promise<void>;
  async activate(window: any) {
    if (typeof window === "number") {
      execSync(`wmctrl -i -a ${window}`);
    } else if (typeof window === "string") {
      execSync(`wmctrl -a ${window}`);
    } else {
      execSync(`wmctrl -i -a ${window.handle}`);
    }
  }
}

export default WindowsManagerLinux;
