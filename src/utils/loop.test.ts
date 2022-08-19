import { suite, assert } from "../test-utils/test.js";

const test = suite("Loop");

test("", () => {
  const expected = true;
  const actual = false;

  assert.deepEqual(actual, expected);
});

test.run();
