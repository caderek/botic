import logUpdate from "log-update";
import $ from "../index.js";

$.listen.key.press.NumpadMultiply.do(async () => {
  const radius = 20;

  await $.loop.times(2).do(async () => {
    await $.mouse.jump.right(radius);

    await $.mouse.drag.Left.verySlow.angular(radius, {
      startAngle: -90,
      angle: 180,
    });

    await $.mouse.jump.right(radius);

    await $.mouse.drag.Left.verySlow.angular(radius, {
      startAngle: 90,
      angle: 180,
      clockwise: false,
    });
  });
});
