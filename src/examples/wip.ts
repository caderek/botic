import { GlobalKeyboardEvent } from "../common/types";
import { KeysNames } from "../common/constants.js";
import logUpdate from "log-update";
import { Key, keyboard } from "@nut-tree/nut-js";
import $ from "../index.js";
import activeWin from "active-win";

// $.listen.any.do((event) => {
//   if (event.type === "KEY_PRESSED" && event.keyName === "Z") {
//     process.exit();
//   }

//   if (event.type === "MOUSE_CLICKED" || event.type === "MOUSE_SCROLL") {
//     console.log(event);
//   }
//   // logUpdate(JSON.stringify(event, null, 2));
// });

const win = await $.window();

// $.loop.times(100).do(async () => {
//   await $.mouse.move.fast.random(win);
// });

// var twoPI = Math.PI * 2.0;
// var screenSize = robot.getScreenSize();
// var height = (screenSize.height / 2) - 10;
// var width = screenSize.width;

// for (var x = 0; x < width; x++)
// {
// 	y = height * Math.sin((twoPI * x) / width) + height;
// 	robot.moveMouse(x, y);
// }

const entries = {
  Space: 0,
  Escape: 1,
  Tab: 2,
  LeftAlt: 3,
  LeftControl: 4,
  RightAlt: 5,
  RightControl: 6,
  LeftShift: 7,
  LeftSuper: 8,
  RightShift: 9,
  RightSuper: 10,
  // F1: 11,
  // F2: 12,
  // F3: 13,
  // F4: 14,
  // F5: 15,
  // F6: 16,
  // F7: 17,
  // F8: 18,
  // F9: 19,
  // F10: 20,
  // F11: 21,
  // F12: 22,
  // F13: 23,
  // F14: 24,
  // F15: 25,
  // F16: 26,
  // F17: 27,
  // F18: 28,
  // F19: 29,
  // F20: 30,
  // F21: 31,
  // F22: 32,
  // F23: 33,
  // F24: 34,
  Num0: 35,
  Num1: 36,
  Num2: 37,
  Num3: 38,
  Num4: 39,
  Num5: 40,
  Num6: 41,
  Num7: 42,
  Num8: 43,
  Num9: 44,
  A: 45,
  B: 46,
  C: 47,
  D: 48,
  E: 49,
  F: 50,
  G: 51,
  H: 52,
  I: 53,
  J: 54,
  K: 55,
  L: 56,
  M: 57,
  N: 58,
  O: 59,
  P: 60,
  Q: 61,
  R: 62,
  S: 63,
  T: 64,
  U: 65,
  V: 66,
  W: 67,
  X: 68,
  Y: 69,
  Z: 70,
  Grave: 71,
  Minus: 72,
  Equal: 73,
  Backspace: 74,
  LeftBracket: 75,
  RightBracket: 76,
  Backslash: 77,
  Semicolon: 78,
  Quote: 79,
  Return: 80,
  Comma: 81,
  Period: 82,
  Slash: 83,
  Left: 84,
  Up: 85,
  Right: 86,
  Down: 87,
  Print: 88,
  Pause: 89,
  Insert: 90,
  Delete: 91,
  Home: 92,
  End: 93,
  PageUp: 94,
  PageDown: 95,
  Add: 96,
  Subtract: 97,
  Multiply: 98,
  Divide: 99,
  Decimal: 100,
  Enter: 101,
  NumPad0: 102,
  NumPad1: 103,
  NumPad2: 104,
  NumPad3: 105,
  NumPad4: 106,
  NumPad5: 107,
  NumPad6: 108,
  NumPad7: 109,
  NumPad8: 110,
  NumPad9: 111,
  CapsLock: 112,
  ScrollLock: 113,
  NumLock: 114,
};

const names = Object.keys(entries);

let i = 0;

const registered: GlobalKeyboardEvent[] = [];

$.listen.any.do((e) => {
  if (e.type === "KEY_PRESSED") {
    registered.push(e);
    console.log({ name: names[i], key: e.key, keyName: e.keyName });
  }
});

for (const name of names) {
  // @ts-ignore
  await keyboard.pressKey(Key[name]);
  // @ts-ignore
  await keyboard.releaseKey(Key[name]);
  i++;
}

// console.log(registered.map((x) => ({ key: x.key, keyName: x.keyName })));
