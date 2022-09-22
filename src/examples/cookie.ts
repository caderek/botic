import $ from "../index.js";

$.listen.key.press.Backquote.do(async () => {
  $.loop.do(async () => {
    const region = { left: 1920, top: 240, width: 576, height: 576 };
    await $.mouse.move.random(region);
  });
});
