import { execSync } from "node:child_process";
import { Window } from "../../../../common/types";
import getActive from "./getActive.js";

async function activate(window: Window): Promise<Window>;
async function activate(window: number): Promise<Window>;
async function activate(window: string): Promise<Window>;
async function activate(window: any) {
  if (typeof window === "number") {
    execSync(`wmctrl -i -a ${window}`);
  } else if (typeof window === "string") {
    execSync(`wmctrl -a ${window}`);
  } else {
    execSync(`wmctrl -i -a ${window.handle}`);
  }

  return getActive();
}

export default activate;
