import $ from "../index.js";
import line from "../output/path-generators/line.js";

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

// $.listen.key.press.Backquote.do(async () => {
//   await $.mouse.move.veryFast.circle(100, {
//     // segments: 100,
//     angle: 360,
//     startAngle: 0,
//   });
// });

for (let i = 0; i <= 10; i++) {
  const y = 935 - 50 * i;
  const path = line({ start: { x: 170, y }, end: { x: 1390, y } });
  await $.mouse.press.Left.at({ x: 170, y });
  await $.mouse.move.delay(i).path2(path);
  await $.mouse.release.Left.here();
}
