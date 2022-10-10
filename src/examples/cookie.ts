import logUpdate from "log-update";
import { screen, Region } from "@nut-tree/nut-js";
import $ from "../index.js";

let state = {
  pause: false,
  go: false,
  delay: 0,
  wrinklers: false,
};

const cookieRegion = { left: 1920, top: 235, width: 550, height: 600 };

$.listen.key.press.any.do(async (e) => {
  switch (e.key) {
    case "Escape":
      if (e.ctrl) {
        process.exit(0);
      }
      break;
    case "Digit0":
      state.delay = 0;
      logUpdate(`Delay: 0`);
      break;
    case "Digit1":
      state.delay = 1;
      logUpdate(`Delay: 1`);
      break;
    case "Digit2":
      state.delay = 2;
      logUpdate(`Delay: 2`);
      break;
    case "Digit3":
      state.delay = 3;
      logUpdate(`Delay: 3`);
      break;
    case "Digit4":
      state.delay = 4;
      logUpdate(`Delay: 4`);
      break;
    case "Digit5":
      state.delay = 5;
      logUpdate(`Delay: 5`);
      break;
    case "Digit6":
      state.delay = 6;
      logUpdate(`Delay: 6`);
      break;
    case "Digit7":
      state.delay = 7;
      logUpdate(`Delay: 7`);
      break;
    case "Digit8":
      state.delay = 8;
      logUpdate(`Delay: 8`);
      break;
    case "Digit9":
      state.delay = 9;
      logUpdate(`Delay: 9`);
      break;
    case "Equal":
      state.wrinklers = !state.wrinklers;
      logUpdate(`Wrinklers: ${state.pause}`);
      break;
    case "Backquote":
      state.pause = !state.pause;
      logUpdate(`Pause: ${state.pause}`);
      break;
  }
});

// $.listen.mouse.move.do(async (e) => {
//   if (
//     e.x >= cookieRegion.left &&
//     e.x <= cookieRegion.left + cookieRegion.width &&
//     e.y >= cookieRegion.top &&
//     e.y <= cookieRegion.top + cookieRegion.height
//   ) {
//     state.go = true;
//   } else {
//     state.go = false;
//   }
// });

$.loop.interval(10000).do(async () => {
  if (state.wrinklers) {
    await $.mouse.move.veryFast.circular(200, {
      async onStep(point) {
        await $.mouse.click.Left.at(point);
      },
    });
  }
});

const base = 30e3;
let i = 0;
let j = 0;

// $.loop.do(async () => {
//   if (state.go && !state.pause) {
//     await $.mouse.click.Left.here();
//     if (state.delay > 0) {
//       await $.delay(state.delay);
//     }

//     i++;
//     if (i === base) {
//       i = 0;
//       j++;
//       await $.delay(1000);
//     }

//     if (i % 1000 === 0) {
//       logUpdate(`Clicked ${BigInt(j) * BigInt(base) + BigInt(i)} times!`);
//     }

//     // if (state.wrinklers && i % 10000 === 0) {
//     //   await $.mouse.move.veryFast.circle(200, {
//     //     async onStep(point) {
//     //       await $.mouse.click.Left.at(point);
//     //     },
//     //   });
//     // }
//   }
// });

console.clear();
