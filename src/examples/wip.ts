import logUpdate from "log-update";
import $ from "../index.js";

$.listen.key.press.NumpadMultiply.do(async () => {
  await $.mouse.drag.Left.veryFast
    .from(400, 350)
    .circular(100, { segments: 4 });
  await $.mouse.drag.Left.veryFast
    .from(630, 350)
    .circular(100, { segments: 6 });
  await $.mouse.drag.Left.veryFast
    .from(860, 350)
    .circular(100, { segments: 8 });
  await $.mouse.drag.Left.veryFast
    .from(1090, 350)
    .circular(100, { segments: 5 });
  await $.mouse.drag.Left.veryFast
    .from(1320, 350)
    .circular(100, { segments: 3 });
  await $.mouse.drag.Left.veryFast.from(600, 700).circular(100);
  await $.mouse.drag.Left.veryFast.from(830, 700).circular(100);
  await $.mouse.drag.Left.veryFast.from(1060, 700).circular(100);
  await $.mouse.drag.Left.veryFast.from(715, 800).circular(100);
  await $.mouse.drag.Left.veryFast.from(945, 800).circular(100);
});
