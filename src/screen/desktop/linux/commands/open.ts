import { spawn, execSync } from "node:child_process";
import delay from "../../../../utils/delay.js";
import findNewWindow from "../helpers/findNewWindow.js";
import list from "./list.js";

const open = {
  async app(appOrPath: string, ...args: string[]) {
    const prevWindows = await list();
    const child = spawn(appOrPath, args, {
      detached: true,
      stdio: ["ignore", "ignore", "ignore"],
    });
    child.unref();

    return findNewWindow(prevWindows, child.pid);
  },

  async file(path: string) {
    const prevWindows = await list();
    execSync(`open ${path}`);

    return findNewWindow(prevWindows);
  },

  async url(path: string) {
    const prevWindows = await list();
    const trimmed = path.trim();
    const isFullUrl = /^http[s]?:\/\//.test(trimmed);
    const fullUrl = isFullUrl ? trimmed : `https://${trimmed}`;

    execSync(`open ${fullUrl}`);
    await delay(1000); // Slight delay for window title to get loaded
    return findNewWindow(prevWindows);
  },
};

export default open;
