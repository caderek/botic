import { getActiveWindow, centerOf } from "@nut-tree/nut-js";

const window = async () => {
  const ref = await getActiveWindow();

  const title = await ref.title;
  const region = await ref.region;
  const center = await centerOf(region);

  return { ref, title, region, center };
};

export default window;
