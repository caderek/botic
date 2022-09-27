import $ from "../index.js";

// console.log(await $.screen.open.file("package.json"));
// console.log(await $.screen.open.url("lichess.org"));

// $.listen.key.press.Backquote.do(async () => {
//   await $.loop.times(36).do(async (index) => {
//     await $.mouse.click.Left.triple.here();
//     await $.mouse.move.veryFast.circular(200, {
//       angle: 10,
//       startAngle: 10 * index,
//     });
//   });
// });

$.listen.key.press.Backquote.do(async () => {
  await $.mouse.move.circular(100, {
    onStep: async (point) => {
      $.mouse.click.Left.at(point);
    },
  });
});
