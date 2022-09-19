import $ from "../index.js";
import WindowsManagerLinux from "../screen/windows/WindowsManagerLinux.js";

const win = new WindowsManagerLinux();
const wins = await win.list();

console.log(wins);

console.log(await win.active());

const adw = wins.find((win) => win.name.includes("Adw"));

if (adw) {
  await win.activate(adw);
}

// @todo - Maybe add delay after activate to ensure that the new window is active when called for win.active()? Or ignore.
await $.delay(1000);

console.log(await win.active());

// $.listen.mouse.click.Left.double.do(async () => {
//   const win = await $.window();
//   console.log(win);
// });
// @todo - no listen signal on lone modifiers

// $.listen.key.press.Backquote.do(async () => {
//   const p = { x: 3675, y: 920 };

//   $.loop.do(async () => {
//     await $.mouse.click.Left.at(p);
//     await $.delay(60 * 1000);
//   });
// });
