import { suite, assert } from "../test-utils/test.js";
import loop, { Loop } from "./loop.js";

const test = suite("Loop");

test("Loops until break signal is returned", () => {
  const expected = 4;
  let actual;

  loop.do((i) => {
    if (i === 5) {
      return loop.stop;
    }

    actual = i;
  });

  assert.deepEqual(actual, expected);
});

test("Loops provided amount of times", () => {
  const expected = 5;
  let actual = 0;

  loop.times(5).do(() => {
    actual++;
  });

  assert.deepEqual(actual, expected);
});

test("Starts with provided counter value", () => {
  const expected = 7;
  let actual = 0;

  loop.from(7).do((i) => {
    actual = i;
    return loop.stop;
  });

  assert.deepEqual(actual, expected);
});

test("Ends with provided counter value (exact), positive", () => {
  const expected = 9;
  let actual;

  loop.to(9).do((i) => {
    actual = i;
  });

  assert.deepEqual(actual, expected);
});

test("Ends with provided counter value (not higher), positive", () => {
  const expected = 6;
  let actual;

  loop.to(6.5).do((i) => {
    actual = i;
  });

  assert.deepEqual(actual, expected);
});

test("Ends with provided counter value (exact), negative", () => {
  const expected = -9;
  let actual;

  loop.to(-9).do((i) => {
    actual = i;
  });

  assert.deepEqual(actual, expected);
});

test("Ends with provided counter value (not higher), negative", () => {
  const expected = -6;
  let actual;

  loop.to(-6.5).do((i) => {
    actual = i;
  });

  assert.deepEqual(actual, expected);
});

test("Goes in descending order when target is negative and no step is provided", () => {
  const expected = [2, 1, 0, -1, -2, -3];
  const actual = [];

  loop
    .from(2)
    .to(-3)
    .do((i) => {
      actual.push(i);
    });

  assert.deepEqual(actual, expected);
});

test("Goes by provided step, positive step", () => {
  const expected = [0, 3, 6, 9, 12];
  const actual = [];

  loop
    .times(5)
    .step(3)
    .do((i) => {
      actual.push(i);
    });

  assert.deepEqual(actual, expected);
});

test("Goes by provided step, negative step", () => {
  const expected = [0, -2.5, -5, -7.5, -10];
  const actual = [];

  loop
    .times(5)
    .step(-2.5)
    .do((i) => {
      actual.push(i);
    });

  assert.deepEqual(actual, expected);
});

test("Sets initial value as provided", () => {
  const expected = "hello";
  let actual;

  loop
    .times(1)
    .init("hello")
    .do((_, v) => {
      actual = v;
    });

  assert.deepEqual(actual, expected);
});

test("Order of options doesn't matter - ascending counter", () => {
  const resultA = loop
    .from(2)
    .to(10)
    .init([])
    .do((i, v) => {
      v.push(i);
    });

  const resultB = loop
    .init([])
    .to(10)
    .from(2)
    .do((i, v) => {
      v.push(i);
    });

  assert.deepEqual(resultA, resultB);
});

test("Order of options doesn't matter - descending counter", () => {
  const resultA = loop
    .from(2)
    .to(-10)
    .init([])
    .do((i, v) => {
      v.push(i);
    });

  const resultB = loop
    .init([])
    .to(-10)
    .from(2)
    .do((i, v) => {
      v.push(i);
    });

  assert.deepEqual(resultA, resultB);
});

test("All options return Loop instance", () => {
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

test("Value is correctly updated by `do` handler - explicit return", () => {
  const expected = 1024;

  const actual = loop
    .times(9)
    .init(2)
    .do((_, v) => {
      return v * 2;
    });

  assert.deepEqual(actual, expected);
});

test("If there is no explicit return, previous value is used (primitives)", () => {
  const expected = 3;
  let counter;

  const actual = loop
    .times(10)
    .init(3)
    .do((i, v) => {
      counter = i;
    });

  assert.equal(counter, 9); // Use the counter, so the engine doesn't optimize things out
  assert.deepEqual(actual, expected);
});

test("If there is no explicit return, previous value is used (references)", () => {
  const expected = [1, 2, 3, 4];

  const actual = loop
    .times(3)
    .init([1])
    .do((i, v) => {
      v.push(i + 2);
    });

  assert.deepEqual(actual, expected);
});

test("Nested loops are independent", () => {
  const grid = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
  ];
  const height = grid.length;
  const width = grid[0].length;

  const expected = 36;

  const actual = loop
    .times(height)
    .init(0)
    .do(
      (y, full) =>
        full +
        loop
          .times(width)
          .init(0)
          .do((x, partial) => partial + grid[y][x])
    );

  assert.deepEqual(actual, expected);
});

test("Runs with provided interval (implicit async)", async () => {
  const margin = 10; // ms
  const interval = 10; // ms
  const times = 5;

  const start = process.hrtime.bigint();

  await loop
    .times(times)
    .interval(interval)
    .do((i) => {
      return i;
    });

  const stop = process.hrtime.bigint();
  const time = Number((stop - start) / 1_000_000n);

  const isTotalTimeGreaterOrEqualExpected = time >= (times - 1) * interval;
  const isTotalTimeWithinMargin = time < (times - 1) * interval + margin;

  assert.equal(isTotalTimeGreaterOrEqualExpected, true, "Min delay");
  assert.equal(isTotalTimeWithinMargin, true, "Delay within margin");
});

test("Runs with provided interval - with custom break (implicit async)", async () => {
  const margin = 50; // ms
  const interval = 50; // ms
  const times = 5;

  const start = process.hrtime.bigint();

  await loop
    .from(1)
    .interval(interval)
    .do((i) => {
      return i === times ? loop.stop : i;
    });

  const stop = process.hrtime.bigint();
  const time = Number((stop - start) / 1_000_000n);

  const isTotalTimeGreaterOrEqualExpected = time >= (times - 1) * interval;
  const isTotalTimeWithinMargin = time < (times - 1) * interval + margin;

  assert.equal(isTotalTimeGreaterOrEqualExpected, true, "Min delay");
  assert.equal(isTotalTimeWithinMargin, true, "Delay within margin");
});

test("Resolves returned Promises between iterations (implicit async)", async () => {
  const expected = 16;

  const actual = await loop
    .times(3)
    .init(2)
    .do(async (_, v) => {
      return v * 2;
    });

  assert.equal(actual, expected);
});

test("Resolves returned Promises - no explicit return (implicit async)", async () => {
  const expected = [1, 2, 3];

  const actual = await loop
    .times(3)
    .init([])
    .do(async (i, v) => {
      v.push(i + 1);
    });

  assert.deepEqual(actual, expected);
});

test("Resolves returned Promises - negative step (implicit async)", async () => {
  const expected = 16;

  const actual = await loop
    .to(-2)
    .init(2)
    .do(async (_, v) => {
      return v * 2;
    });

  assert.deepEqual(actual, expected);
});

test.run();
