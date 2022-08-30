import { uIOhook, UiohookKey, UiohookMouseEvent } from "uiohook-napi";
import {
  screen,
  imageResource,
  mouse,
  getActiveWindow,
  getWindows,
  centerOf,
  Region,
  Window,
  Button,
  Point,
  keyboard,
  Key,
} from "@nut-tree/nut-js";
import "@nut-tree/template-matcher";
import logUpdate from "log-update";
import delay from "../utils/delay.js";
import loop from "../utils/loop.js";
import tap from "../io/tap.js";
import listen from "../io/listen.js";

// const myHook = listen.mouse.click.left.double.ctrl.shift.do(async (e) => {
//   console.log(e);
//   console.log("OK!");
//   // await loop.do(async () => {
//   // const win = await window();
//   // if (!win.title.includes("Google Chrome")) {
//   //   return loop.stop;
//   // }
//   // await mouse.setPosition(win.center);
//   // await mouse.click(Button.RIGHT);
//   // await delay(500);
//   // await mouse.setPosition(new Point(1018, 586));
//   // await mouse.click(Button.LEFT);
//   // await delay(3000);
//   // await mouse.setPosition(new Point(1324, 257));
//   // await mouse.click(Button.LEFT);
//   // await delay(500);
//   // await keyboard.pressKey(Key.LeftControl, Key.W);
//   // await keyboard.releaseKey(Key.LeftControl, Key.W);
//   // console.log("OK");
//   // await delay(1000);
//   // await delay(200);
//   // await tap(Key.Right);
//   // });
// });

listen.all.do((e) => {
  logUpdate(JSON.stringify(e, null, 2));
});

// myHook.start();

// uIOhook.on("click", (e) => {
//   console.log(e);
// });
