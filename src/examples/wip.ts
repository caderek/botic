import logUpdate from "log-update";
import $ from "../index.js";

const win = await $.screen.getActive();

console.log(win);

$.listen.key.press.NumpadMultiply.do(async () => {});

await $.within(win).mouse.goto({ x: 0, y: 0 });

const appWindow = $.within(win);

await appWindow.listen.key.press.Backquote.do(async (e) => {
  console.log(e);
});
