import { suite, assert } from "../test-utils/test.js";
import delay from "./delay.js";

const test = suite("Delay");

test("Delays execution for x ms", async () => {
  const margin = 5; // ms
  const input = 10; // ms

  const start = process.hrtime.bigint();
  await delay(input);
  const stop = process.hrtime.bigint();

  const time = Number((stop - start) / 1_000_000n);

  const isTotalTimeGreaterOrEqualExpected = time >= input;
  const isTotalTimeWithinMargin = time < input + margin;

  assert.equal(isTotalTimeGreaterOrEqualExpected, true, "Min delay");
  assert.equal(isTotalTimeWithinMargin, true, "Delay within margin");
});

test.run();
