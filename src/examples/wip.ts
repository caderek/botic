import $ from "../index.js";

$.listen.key.press.Backquote.do(async () => {
  await $.mouse.move.verySlow.circle(300, { segments: 6 });
});
