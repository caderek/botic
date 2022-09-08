import { getWindows, centerOf, Region, Point, Window } from "@nut-tree/nut-js";

const SYSTEM_WINDOWS = new Set(["gnome-shell"]);

const windows = async () => {
  const refs = await getWindows();
  const items: { ref: Window; title: string; region: Region; center: Point }[] =
    [];

  for (const ref of refs) {
    const title = (await ref.title).trim();
    const region = await ref.region;
    const center = await centerOf(region);

    if (
      title !== "" &&
      !SYSTEM_WINDOWS.has(title)
      // region.left >= 0 &&
      // region.top >= 0 &&
      // region.width > 10 &&
      // region.height > 10
    ) {
      items.push({ ref, title, region, center });
    }
  }

  return items;
};

export default windows;
