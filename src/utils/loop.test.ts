import { suite, assert } from "../test-utils/test.js";
import loop, { Loop } from "./loop.js";

const test = suite("Loop");

test("Loops until break signal is returned", async () => {
  const expected = 4;
  let actual;

  await loop.do((i) => {
    if (i === 5) {
      return loop.stop;
    }

    actual = i;
  });

  assert.deepEqual(actual, expected);
});

test("Loops provided amount of times", async () => {
  const expected = 5;
  let actual = 0;

  await loop.times(5).do(() => {
    actual++;
  });

  assert.deepEqual(actual, expected);
});

test("Starts with provided counter value", async () => {
  const expected = 7;
  let actual = 0;

  await loop.from(7).do((i) => {
    actual = i;
    return loop.stop;
  });

  assert.deepEqual(actual, expected);
});

test("Ends with provided counter value (exact), positive", async () => {
  const expected = 9;
  let actual;

  await loop.to(9).do((i) => {
    actual = i;
  });

  assert.deepEqual(actual, expected);
});

test("Ends with provided counter value (not higher), positive", async () => {
  const expected = 6;
  let actual;

  await loop.to(6.5).do((i) => {
    actual = i;
  });

  assert.deepEqual(actual, expected);
});

test("Ends with provided counter value (exact), negative", async () => {
  const expected = -9;
  let actual;

  await loop.to(-9).do((i) => {
    actual = i;
  });

  assert.deepEqual(actual, expected);
});

test("Ends with provided counter value (not higher), negative", async () => {
  const expected = -6;
  let actual;

  await loop.to(-6.5).do((i) => {
    actual = i;
  });

  assert.deepEqual(actual, expected);
});

test("Goes in descending order when target is negative and no step is provided", async () => {
  const expected = [2, 1, 0, -1, -2, -3];
  const actual = [];

  await loop
    .from(2)
    .to(-3)
    .do((i) => {
      actual.push(i);
    });

  assert.deepEqual(actual, expected);
});

test("Goes by provided step, positive step", async () => {
  const expected = [0, 3, 6, 9, 12];
  const actual = [];

  await loop
    .times(5)
    .step(3)
    .do((i) => {
      actual.push(i);
    });

  assert.deepEqual(actual, expected);
});

test("Goes by provided step, negative step", async () => {
  const expected = [0, -2.5, -5, -7.5, -10];
  const actual = [];

  await loop
    .times(5)
    .step(-2.5)
    .do((i) => {
      actual.push(i);
    });

  assert.deepEqual(actual, expected);
});

test("Runs with provided interval", async () => {
  const margin = 5; // ms
  const interval = 10; // ms
  const times = 5;

  const start = process.hrtime.bigint();

  await loop
    .times(times)
    .interval(interval)
    .do((i) => {
      return i; // empty `do` function would be result in compiler removing the loop
    });

  const stop = process.hrtime.bigint();
  const time = Number((stop - start) / 1_000_000n);

  const isTotalTimeGreaterOrEqualExpected = time >= (times - 1) * interval;
  const isTotalTimeWithinMargin = time < (times - 1) * interval + margin;

  assert.equal(isTotalTimeGreaterOrEqualExpected, true, "Min delay");
  assert.equal(isTotalTimeWithinMargin, true, "Delay within margin");
});

test("Sets initial value as provided", async () => {
  const expected = "hello";
  let actual;

  await loop
    .times(1)
    .init("hello")
    .do((_, v) => {
      actual = v;
    });

  assert.deepEqual(actual, expected);
});

test("Order of options doesn't matter - ascending counter", async () => {
  const resultA = await loop
    .from(2)
    .to(10)
    .init([])
    .do((i, v) => {
      v.push(i);
    });

  const resultB = await loop
    .init([])
    .to(10)
    .from(2)
    .do((i, v) => {
      v.push(i);
    });

  assert.deepEqual(resultA, resultB);
});

test("Order of options doesn't matter - descending counter", async () => {
  const resultA = await loop
    .from(2)
    .to(-10)
    .init([])
    .do((i, v) => {
      v.push(i);
    });

  const resultB = await loop
    .init([])
    .to(-10)
    .from(2)
    .do((i, v) => {
      v.push(i);
    });

  assert.deepEqual(resultA, resultB);
});

test("All options return Loop instance", async () => {
  const instances = [
    loop.times(1),
    loop.from(1),
    loop.to(1),
    loop.step(1),
    loop.interval(1),
    loop.init(1),
  ];

  const actual = instances.every((item) => item instanceof Loop);

  assert.deepEqual(actual, true);
});

test("Value is correctly updated by `do` handler - explicit return", async () => {
  const expected = 1024;

  const actual = await loop
    .times(10)
    .init(2)
    .do((_, v) => {
      return v * 2;
    });

  assert.deepEqual(actual, expected);
});

test("If there is no explicit return, previous value is used (primitives)", async () => {
  const expected = 3;
  let counter;

  const actual = await loop
    .times(10)
    .init(3)
    .do((i, v) => {
      counter = i;
    });

  assert.equal(counter, 9); // Use the counter, so the engine doesn't optimize things out
  assert.deepEqual(actual, expected);
});

test("If there is no explicit return, previous value is used (references)", async () => {
  const expected = [1, 2, 3, 4];

  const actual = await loop
    .times(3)
    .init([1])
    .do((i, v) => {
      v.push(i + 2);
    });

  assert.deepEqual(actual, expected);
});

test.run();
