import logUpdate from "log-update";
import $ from "../index.js";

let state = {
  pause: false,
  go: false,
  wrinklers: false,
};

const cookieRegion = { left: 1920, top: 235, width: 550, height: 600 };

$.listen.key.press.Escape.Ctrl.do(() => process.exit());

$.listen.key.press.Backquote.do(() => {
  state.pause = !state.pause;
  logUpdate(`Pause: ${state.pause}`);
});

$.listen.key.press.Digit1.do(() => {
  state.wrinklers = !state.wrinklers;
  logUpdate(`Clear wrinklers: ${state.wrinklers}`);
});

$.listen.mouse.move.do(async (e) => {
  if (
    e.x >= cookieRegion.left &&
    e.x <= cookieRegion.left + cookieRegion.width &&
    e.y >= cookieRegion.top &&
    e.y <= cookieRegion.top + cookieRegion.height
  ) {
    state.go = true;
  } else {
    state.go = false;
  }
});

const base = 30e3;
let i = 0;
let j = 0;

$.loop.do(async () => {
  if (state.go && !state.pause) {
    await $.mouse.click.Left.here();
    i++;
    if (i === base) {
      i = 0;
      j++;
      await $.delay(1000);
    }

    if (i % 1000 === 0) {
      logUpdate(`Clicked ${BigInt(j) * BigInt(base) + BigInt(i)} times!`);
    }

    if (state.wrinklers && i % 10000 === 0) {
      await $.mouse.move.veryFast.circle(200, {
        async onStep(point) {
          await $.mouse.click.Left.at(point);
        },
      });
    }
  }
});

console.clear();
