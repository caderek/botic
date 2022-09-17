import { keyboard, Key } from "@nut-tree/nut-js";
import { GlobalKeyboardEvent } from "../common/types";
import { KeysNames } from "../common/constants.js";
import logUpdate from "log-update";
import { uIOhook, UiohookKey } from "uiohook-napi";
import $ from "../index.js";
import activeWin from "active-win";

// $.listen.any.do((event) => {
//   if (event.type === "KEY_PRESSED") {
//     console.log(event);
//   }
//   // if (event.type === "KEY_PRESSED" && event.keyName === "Z") {
//   //   process.exit();
//   // }

//   // if (event.type === "MOUSE_CLICKED" || event.type === "MOUSE_SCROLL") {
//   //   console.log(event);
//   // }
//   // logUpdate(JSON.stringify(event, null, 2));
// });

// const win = await $.window();

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

// const names = Object.keys(entries);

// let i = 0;

// const registered: GlobalKeyboardEvent[] = [];

// $.listen.any.do((e) => {
//   if (e.type === "KEY_PRESSED") {

//     registered.push(e);
//     console.log({ name: names[i], key: e.key, keyName: e.keyName });
//   }
// });

// for (const name of names) {
//   // @ts-ignore
//   await keyboard.pressKey(Key[name]);
//   // @ts-ignore
//   await keyboard.releaseKey(Key[name]);
//   i++;
// }

// // console.log(registered.map((x) => ({ key: x.key, keyName: x.keyName })));

// $.mouse.click.Left.double.here();

$.listen.key.press.Backquote.do(async () => {
  await $.keyboard.type.natural.send(`
The first cold shower,
Even the monkey seems to want
A little coat of straw!
Żółć maź kąsa za 2€.`);
  // await keyboard.type("Hello");
});

/*


the first cold shower
even the monkey seems to want
a little coat of straw

*/
