import { keyboard } from "@nut-tree/nut-js";
import { Keys } from "../../common/constants.js";

const wrapWithModifiers = async (
  fn: () => Promise<void>,
  [alt, ctrl, meta, shift]: boolean[]
) => {
  const modifiers = [
    ...(alt ? [Keys.Alt] : []),
    ...(ctrl ? [Keys.Ctrl] : []),
    ...(meta ? [Keys.Meta] : []),
    ...(shift ? [Keys.Shift] : []),
  ];

  if (modifiers.length > 0) {
    await keyboard.pressKey(...modifiers);
  }

  await fn();

  if (modifiers.length > 0) {
    await keyboard.releaseKey(...modifiers);
  }
};

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

const releaseModifiers = async ([alt, ctrl, meta, shift]: boolean[]) => {
  const modifiers = [
    ...(alt ? [Keys.Alt] : []),
    ...(ctrl ? [Keys.Ctrl] : []),
    ...(meta ? [Keys.Meta] : []),
    ...(shift ? [Keys.Shift] : []),
  ];

  if (modifiers.length > 0) {
    await keyboard.releaseKey(...modifiers);
  }
};

export { wrapWithModifiers, pressModifiers, releaseModifiers };
