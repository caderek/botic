import { suite, assert } from "../test-utils/test.js";
import listen from "./listen.js";
import { mouse, Button, Point } from "@nut-tree/nut-js";
import { uIOhook } from "uiohook-napi";

const test = suite("Listening for keyboard and mouse IO");

test("Listens for universal input", async () => {
  let actual;

  const hook = listen.all.do((e) => {
    actual = e;
  });

  await mouse.setPosition(new Point(0, 0));
  await mouse.click(Button.LEFT);

  hook.stop();
  uIOhook.stop();

  const expected = {
    altKey: false,
    button: 0,
    clicks: 0,
    ctrlKey: false,
    metaKey: false,
    shiftKey: false,
    type: 9,
    x: 0,
    y: 0,
  };

  assert.deepEqual(actual, expected);
});

test.run();
