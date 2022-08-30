import { keyboard, Key } from "@nut-tree/nut-js";

const tap = async (...keys: Key[]) => {
  await keyboard.pressKey(...keys);
  await keyboard.releaseKey(...keys);
};

export default tap;
