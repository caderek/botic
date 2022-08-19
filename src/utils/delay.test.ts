import { suite, assert } from "../test-utils/test.js";
import delay from "./delay.js";

const test = suite("Delay");

test("Delays execution for x ms", async () => {
  const margin = 5; // ms
  const input = 10; // ms

  const start = process.hrtime.bigint();
  await delay(input);
  const stop = process.hrtime.bigint();

  const actual = Number((stop - start) / 1_000_000n);

  assert.equal(actual >= input, true, "Min delay");
  assert.equal(actual < input + margin, true, "Delay within margin");
});

test.run();
