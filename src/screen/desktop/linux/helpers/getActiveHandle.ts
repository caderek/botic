import { execSync } from "node:child_process";

function getActiveHandle() {
  let handle;

  try {
    handle = execSync("xdotool getactivewindow");
  } catch {
    handle = 0;
  }

  return Number(handle);
}

export default getActiveHandle;
