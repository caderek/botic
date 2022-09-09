import { keyboard, Key } from "@nut-tree/nut-js";

const wrapWithModifiers = async (
  fn: () => Promise<void>,
  [alt, ctrl, meta, shift]: boolean[]
) => {
  const modifiers = [
    ...(alt ? [Key.LeftAlt] : []),
    ...(ctrl ? [Key.LeftControl] : []),
    ...(meta ? [Key.LeftSuper] : []),
    ...(shift ? [Key.LeftShift] : []),
  ];

  if (modifiers.length > 0) {
    await keyboard.pressKey(...modifiers);
  }

  await fn();

  if (modifiers.length > 0) {
    await keyboard.releaseKey(...modifiers);
  }
};

export default wrapWithModifiers;
