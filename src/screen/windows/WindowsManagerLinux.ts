import { execSync, spawn } from "node:child_process";
import { getActiveWindow } from "@nut-tree/nut-js";
import { Window, WindowsManager } from "../../common/types";
import centerOf from "../helpers/centerOf.js";
import delay from "../../utils/delay.js";

const APPS_TO_SKIP = new Set(["gjs"]);
const WINDOWS_REGEX =
  /^(0x[0-9a-f]{8})\s+([-]*\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+([a-zA-Z0-9-_.]+)\s+([a-zA-Z0-9-_.]+)\s+(.+)$/gm;
const WINDOW_REGEX =
  /^(0x[0-9a-f]{8})\s+([-]*\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+([a-zA-Z0-9-_.]+)\s+([a-zA-Z0-9-_.]+)\s+(.+)$/;

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
    const out = execSync("wmctrl -l -G -x -p").toString();
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

      const window = {
        handle,
        pid,
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

  async getActive() {
    const current = await getActiveWindow();
    const currentTitle = await current.title;
    const windows = await this.list();
    return windows.find((win) => win.title === currentTitle) ?? null;
  }

  async activate(window: Window): Promise<Window>;
  async activate(window: number): Promise<Window>;
  async activate(window: string): Promise<Window>;
  async activate(window: any) {
    if (typeof window === "number") {
      execSync(`wmctrl -i -a ${window}`);
    } else if (typeof window === "string") {
      execSync(`wmctrl -a ${window}`);
    } else {
      execSync(`wmctrl -i -a ${window.handle}`);
    }

    return this.getActive();
  }

  open(urlOrFile: string) {
    execSync(`open ${urlOrFile}`);
  }

  async run(app: string, ...args: string[]) {
    const child = spawn(app, args, {
      detached: true,
      stdio: ["ignore", "ignore", "ignore"],
    });
    child.unref();

    await delay(2000);
    const windows = await this.list();
    const win = windows.find((w) => w.pid === child.pid);
    console.log({ pid: child.pid });
    console.log({ newWindow: win });
  }
}

export default WindowsManagerLinux;
