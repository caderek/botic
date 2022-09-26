import { execSync } from "node:child_process";

import list from "./commands/list.js";
import open from "./commands/open.js";
import close from "./commands/close.js";
import getActive from "./commands/getActive.js";
import activate from "./commands/activate.js";

try {
  execSync("which wmctrl");
} catch {
  console.error("Please install wmctrl package.");
  process.exit(1);
}

try {
  execSync("which xdotool");
} catch {
  console.error("Please install xdotool package.");
  process.exit(1);
}

const WindowsManagerLinux = {
  list,
  open,
  close,
  getActive,
  activate,
};

export default WindowsManagerLinux;
