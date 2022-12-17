import $ from "../index.js";

$.listen.key.press.B.do(async () => {
  await $.mouse.drag.Left.left(100);
  await $.mouse.drag.Left.up(100);
  await $.mouse.drag.Left.up(100);
  await $.mouse.drag.Left.left(100);
});
