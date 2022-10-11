import logUpdate from "log-update";
import $ from "../index.js";

$.listen.key.press.NumpadMultiply.do(async () => {
  await $.mouse.drag.Left.fast.from(400, 350).circular(100, { segments: 4 });
  await $.mouse.drag.Left.fast.from(630, 350).circular(100, { segments: 6 });
  await $.mouse.drag.Left.fast.from(860, 350).circular(100, { segments: 8 });
  await $.mouse.drag.Left.fast.from(1090, 350).circular(100, { segments: 5 });
  await $.mouse.drag.Left.fast.from(1320, 350).circular(100, { segments: 3 });

  await $.mouse.drag.Left.fast.from(400, 700).circular(100);
  await $.mouse.drag.Left.fast.from(630, 700).circular(100);
  await $.mouse.drag.Left.fast.from(860, 700).circular(100);
  await $.mouse.drag.Left.fast.from(515, 800).circular(100);
  await $.mouse.drag.Left.fast.from(745, 800).circular(100);

  await $.mouse.drag.Left.fast.from(1300, 750).circular(100);
  await $.mouse.drag.Left.fast
    .from(1400, 650)
    .circular(100, { startAngle: -90, angle: 270 });
  await $.mouse.drag.Left.fast
    .from(1400, 650)
    .circular(70, { startAngle: -90, angle: 270 });
  await $.mouse.drag.Left.fast
    .from(1400, 850)
    .circular(100, { startAngle: 0, angle: 270 });
  await $.mouse.drag.Left.fast
    .from(1400, 850)
    .circular(70, { startAngle: 0, angle: 270 });
  await $.mouse.drag.Left.fast
    .from(1200, 850)
    .circular(100, { startAngle: 90, angle: 270 });
  await $.mouse.drag.Left.fast
    .from(1200, 850)
    .circular(70, { startAngle: 90, angle: 270 });
  await $.mouse.drag.Left.fast
    .from(1200, 650)
    .circular(100, { startAngle: 180, angle: 270 });
  await $.mouse.drag.Left.fast
    .from(1200, 650)
    .circular(70, { startAngle: 180, angle: 270 });
});
