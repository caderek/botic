import { Window } from "../../../../common/types";
import delay from "../../../../utils/delay.js";
import list from "../commands/list.js";

async function findNewWindow(prevWindows: Window[], pid?: number) {
  const prevActive = prevWindows.find((win) => win.isActive);

  const recur = async (i: number): Promise<Window> => {
    const windows = await list();
    const windowWithPID = windows.find((w) => w.pid === pid);

    if (windowWithPID) {
      return windowWithPID;
    }

    const oldHandles = new Set(prevWindows.map((w) => w.handle));
    const newWindow = windows.find((w) => !oldHandles.has(w.handle));

    if (newWindow) {
      return newWindow;
    }

    if (pid === undefined) {
      const active = windows.find((win) => win.isActive);

      if (active && active?.handle !== prevActive?.handle) {
        return active;
      }

      if (active && active.title !== prevActive?.title) {
        return active;
      }

      if (active && i > 10) {
        return active;
      }
    }

    await delay(250);
    return recur(i + 1);
  };

  return recur(0);
}

export default findNewWindow;
