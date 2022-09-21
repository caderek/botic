import $ from "../index.js";
import WindowsManagerLinux from "../screen/windows/WindowsManagerLinux.js";

const win = new WindowsManagerLinux();
const wins = await win.list();

console.log(wins);

console.log("Active:");
console.log(await win.getActive());

// win.open("https://lichess.org/");

const app = win.run("vlc");

// $.listen.key.press.Backquote.once.do(async () => {
//   console.log("Hejo!");
//   app.kill();
// });

// const adw = wins.find((win) => win.name.includes("Adw"));

// if (adw) {
//   await win.activate(adw);
// }

// // @todo - Maybe add delay after activate to ensure that the new window is active when called for win.active()? Or ignore.
// await $.delay(1000);

// console.log(await win.active());

// $.listen.mouse.click.Left.double.do(async () => {
//   const win = await $.window();
//   console.log(win);
// });
// @todo - no listen signal on lone modifiers

// $.listen.key.press.Backquote.do(async () => {
//   $.loop.do(async () => {
//     await $.mouse.click.Left.here();
//   });
// });

// $.listen.key.press.Backquote.do(async () => {
//   const game = wins.find((win) => win.name.includes("Cookie Clicker"));

//   if (game) {
//     await win.activate(game);
//   }
//   $.loop.do(async () => {
//     await $.mouse.move.fast.right(300);
//     await $.mouse.move.fast.down(300);
//     await $.mouse.move.fast.left(300);
//     await $.mouse.move.fast.up(300);
//   });
// });
