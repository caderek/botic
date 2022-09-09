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

// const w = await screen.width();
// const h = await screen.height();

// console.log({ w, h });

// await keyboard.pressKey(Key.Minus);
// await keyboard.releaseKey(Key.Minus);

// const names = Object.entries(Key);
// const pairs: Map<string, string> = new Map();

// await loop.times(names.length).do(async (i) => {
//   console.log(names[i]);

// listen.key.press.any.once.do((e) => {
//   pairs.set(String(e.keyName), names[i][0] as string);
// });

// await keyboard.pressKey(names[i][1] as number);
// });

// console.log(pairs);

// await $.send.mouse.click.right();
// await $.send.mouse.click.right();
// await $.send.mouse.click.right();

// const w = await activeWin();

// $.send.mouse.click.left();
// $.send.mouse.scroll.down(2);

// $.listen.mouse.click.middle.do(async () => {
//   const w = await $.window();
//   console.log(w);
//   const ww = await $.windows();

//   console.log(ww.map((w) => w.title));
// });

// $.send.mouse.click.left.at(0, 0);

// await $.mouse.goto(2400, 900);
// await $.mouse.click.left.double.ctrl.alt.here();

// await $.mouse.scroll.down.ctrl.many(5);

// console.log(await $.mouse.position);

// await $.mouse.goto({ x: 1, y: 3 });

await $.mouse.move.to(1920, 0);
await $.mouse.move.to({ x: 1920 * 2, y: 1080 });
