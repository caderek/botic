import logUpdate from "log-update";
import $ from "../index.js";

$.listen.key.press.NumpadMultiply.do(async () => {
  await $.mouse.drag.Left.fast.from(400, 350).circular(100, { segments: 4 });
  await $.mouse.drag.Left.fast.from(630, 350).circular(100, { segments: 6 });
  await $.mouse.drag.Left.fast.from(860, 350).circular(100, { segments: 8 });
  await $.mouse.drag.Left.fast.from(1090, 350).circular(100, { segments: 5 });
  await $.mouse.drag.Left.fast.from(1320, 350).circular(100, { segments: 3 });
  await $.mouse.drag.Left.fast.from(600, 700).circular(100);
  await $.mouse.drag.Left.fast.from(830, 700).circular(100);
  await $.mouse.drag.Left.fast.from(1060, 700).circular(100);
  await $.mouse.drag.Left.fast
    .from(715, 800)
    .circular(100, { angle: 270, startAngle: 45 });
  await $.mouse.drag.Left.fast
    .from(945, 800)
    .circular(100, { clockwise: false, angle: 270, startAngle: 45 });
});
