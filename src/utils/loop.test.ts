import { suite, assert } from "../test-utils/test.js";
import loop from "./loop.js";

const test = suite("Loop");

test("", async () => {
  const expected = true;
  const actual = false;

  await loop.debug
    .from(2)
    .to(40)
    .step(2)
    .interval(50)
    .init(1)
    .times(1000)
    .do((i, v) => {
      if (v > 1000) {
        return loop.stop;
      }
      return v * 2;
    });

  assert.deepEqual(actual, expected);
});

test.run();
