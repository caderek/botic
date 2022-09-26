import { execSync } from "node:child_process";
import { Window } from "../../../../common/types";

async function close(window: Window): Promise<void>;
async function close(window: number): Promise<void>;
async function close(window: string): Promise<void>;
async function close(window: any) {
  if (typeof window === "number") {
    execSync(`wmctrl -i -c ${window}`);
  } else if (typeof window === "string") {
    execSync(`wmctrl -c ${window}`);
  } else {
    execSync(`wmctrl -i -c ${window.handle}`);
  }
}

export default close;
