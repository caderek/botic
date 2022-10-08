import $ from "../index.js";

$.listen.key.press.Backquote.do(async () => {
  await $.mouse.move.path([
    { x: 0, y: 1080 / 2 },
    { x: 1920 / 2, y: 1080 / 2 },
    { x: 1920, y: 1080 },
  ]);
});
