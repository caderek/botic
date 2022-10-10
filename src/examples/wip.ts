import logUpdate from "log-update";
import $ from "../index.js";

let radius = 100;

$.listen.mouse.scroll.vertical.do((e) => {
  radius += e.rotation === "Up" ? 10 : -10;
  logUpdate(`Radius: ${radius}`);
});

$.listen.key.press.Backquote.do(async () => {
  await $.mouse.move.circular(radius, { startAngle: 45 + 90 * 2 });
});
