import { getWindows, centerOf, Region, Point, Window } from "@nut-tree/nut-js";

const windows = async () => {
  const refs = await getWindows();
  const items: { ref: Window; title: string; region: Region; center: Point }[] =
    [];

  for (const ref of refs) {
    const title = await ref.title;
    const region = await ref.region;
    const center = await centerOf(region);

    items.push({ ref, title, region, center });
  }

  return items;
};

export default windows;
