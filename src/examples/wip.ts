import $ from "../index.js";

$.listen.key.press.Ctrl.Alt.do((e) => {
  console.log(e.key);
});
// @todo - no listen signal on lone modifiers

// $.listen.key.press.Backquote.do(async () => {
//   $.loop.do(async () => {
//     const { x, y } = await $.mouse.position;
//     const area = {
//       top: 400,
//       left: 2080,
//       width: 2335 - 2080,
//       height: 640 - 400,
//     };

//     if (
//       x >= area.left &&
//       x <= area.left + area.width &&
//       y >= area.top &&
//       y <= area.top + area.height
//     ) {
//       await $.mouse.click.Left.here();
//     }
//   });
// });
