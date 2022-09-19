import { execSync } from "node:child_process";
import { getActiveWindow } from "@nut-tree/nut-js";
import { Window, WindowsManager } from "../../common/types";
import centerOf from "../helpers/centerOf.js";

const WINDOWS_TO_SKIP = new Set(["gjs"]);

class WindowsManagerLinux implements WindowsManager {
  constructor() {}

  async list() {
    const out = execSync("wmctrl -l -G -x").toString();
    const lines = out
      .split("\n")
      // @todo Handle the case when there are multiple spaces in the title
      .map((line) => line.split(" ").filter((v) => v.trim() !== ""))
      .filter((line) => line.length >= 9);

    const items = [];

    for (const line of lines) {
      const handle = Number(line[0]);
      const workspace = Number(line[1]);
      const left = Number(line[2]);
      const top = Number(line[3]);
      const width = Number(line[4]);
      const height = Number(line[5]);
      const region = { left, top, width, height };
      const type = line[6].split(".")[0];
      const name = line.slice(8).join(" ");

      const window = {
        handle,
        workspace,
        type,
        name,
        region,
        center: centerOf(region),
      };

      items.push(window);
    }

    return items.filter((win) => !WINDOWS_TO_SKIP.has(win.type));
  }

  async active() {
    // @todo Find a better way to match the current window
    // (it is private prop) - maybe by name?
    const current = await getActiveWindow();
    // @ts-ignore
    const currentHandle = current?.windowHandle;
    const windows = await this.list();
    return windows.find((win) => win.handle === currentHandle) ?? null;
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
