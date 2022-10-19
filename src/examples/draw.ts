import logUpdate from "log-update";
import $ from "../index.js";

$.listen.key.press.NumpadMultiply.do(async () => {
  await $.mouse.drag.Left.slow.from(300, 350).angular(100, { segments: 3 });
  await $.mouse.drag.Left.slow
    .from(530, 350)
    .angular(100, { segments: 4, startAngle: 45 });
  await $.mouse.drag.Left.slow.from(760, 350).angular(100, { segments: 5 });
  await $.mouse.drag.Left.slow.from(990, 350).angular(100, { segments: 6 });
  await $.mouse.drag.Left.slow.from(1220, 350).angular(100, { segments: 7 });
  await $.mouse.drag.Left.slow.from(1450, 350).angular(100, { segments: 8 });

  await $.mouse.drag.Left.slow.from(400, 700).angular(100);
  await $.mouse.drag.Left.slow.from(630, 700).angular(100);
  await $.mouse.drag.Left.slow.from(860, 700).angular(100);
  await $.mouse.drag.Left.slow.from(515, 800).angular(100);
  await $.mouse.drag.Left.slow.from(745, 800).angular(100);

  await $.mouse.drag.Left.slow.from(1300, 750).angular(100);
  await $.mouse.drag.Left.slow
    .from(1400, 650)
    .angular(100, { startAngle: -90, angle: 270 });
  await $.mouse.drag.Left.slow
    .from(1400, 650)
    .angular(70, { startAngle: -90, angle: 270 });
  await $.mouse.drag.Left.slow
    .from(1400, 850)
    .angular(100, { startAngle: 0, angle: 270 });
  await $.mouse.drag.Left.slow
    .from(1400, 850)
    .angular(70, { startAngle: 0, angle: 270 });
  await $.mouse.drag.Left.slow
    .from(1200, 850)
    .angular(100, { startAngle: 90, angle: 270 });
  await $.mouse.drag.Left.slow
    .from(1200, 850)
    .angular(70, { startAngle: 90, angle: 270 });
  await $.mouse.drag.Left.slow
    .from(1200, 650)
    .angular(100, { startAngle: 180, angle: 270 });
  await $.mouse.drag.Left.slow
    .from(1200, 650)
    .angular(70, { startAngle: 180, angle: 270 });
});
