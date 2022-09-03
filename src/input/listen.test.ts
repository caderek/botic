// import { GlobalMouseEvent } from "./internal/types";
// import { suite, assert } from "../test-utils/test.js";
// import listen from "./listen.js";
// import { mouse, Button, Point } from "@nut-tree/nut-js";

// const test = suite("Listening for keyboard and mouse IO", {
//   prev: Promise.resolve(),
// });

// test("Listens for universal input - multiple", async (ctx) => {
//   console.log("START: 1");
//   let actual;

//   const hook = listen.all.do((e) => {
//     const v = e as GlobalMouseEvent;
//     actual = [v.x, v.y];
//   });

//   await mouse.setPosition(new Point(5, 9));
//   await mouse.click(Button.LEFT);
//   await mouse.setPosition(new Point(20, 21));
//   await mouse.click(Button.LEFT);

//   hook.stop();

//   const expected = [20, 21];

//   assert.deepEqual(actual, expected);
//   console.log("END: 1");
// });

// test("Listens for universal input - once", async () => {
//   console.log("START: 2");
//   let actual;

//   const hook = listen.all.once.do((e) => {
//     console.log("ONCE!!!!!!!!!!!");
//     const v = e as GlobalMouseEvent;
//     actual = [v.x, v.y];
//     console.log({ actual });
//   });

//   await mouse.setPosition(new Point(5, 9));
//   await mouse.click(Button.LEFT);
//   await mouse.setPosition(new Point(20, 21));
//   await mouse.click(Button.LEFT);

//   hook.stop();

//   const expected = [5, 9];

//   assert.deepEqual(actual, expected);
//   console.log("END: 2");
// });

// test.run();
