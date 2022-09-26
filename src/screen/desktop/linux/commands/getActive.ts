import list from "./list.js";

async function getActive() {
  const windows = await list();
  return windows.find((win) => win.isActive) ?? null;
}

export default getActive;
