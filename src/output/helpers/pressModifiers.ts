import { keyboard } from "@nut-tree/nut-js";
import { Keys } from "../../common/constants.js";

const pressModifiers = async ([alt, ctrl, meta, shift]: boolean[]) => {
  const modifiers = [
    ...(alt ? [Keys.Alt] : []),
    ...(ctrl ? [Keys.Ctrl] : []),
    ...(meta ? [Keys.Meta] : []),
    ...(shift ? [Keys.Shift] : []),
  ];

  if (modifiers.length > 0) {
    await keyboard.pressKey(...modifiers);
  }
};

export default pressModifiers;
