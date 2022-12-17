import { mouse } from "@nut-tree/nut-js";
import $ from "../index.js";

let play = true;

$.listen.key.press.Space.do(() => {
  play = !play;
});

$.loop.do(async () => {
  if (play) {
    await $.mouse.move.left(10);
    await $.mouse.move.right(10);
  }
});
