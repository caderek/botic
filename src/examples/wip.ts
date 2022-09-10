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

$.loop.times(100).do(async () => {
  await $.mouse.move.fast.random(win);
});

// var twoPI = Math.PI * 2.0;
// var screenSize = robot.getScreenSize();
// var height = (screenSize.height / 2) - 10;
// var width = screenSize.width;

// for (var x = 0; x < width; x++)
// {
// 	y = height * Math.sin((twoPI * x) / width) + height;
// 	robot.moveMouse(x, y);
// }
