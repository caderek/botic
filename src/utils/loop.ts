import delay from "./delay";

const STOP = Symbol("loop stop");

const _loop = async (setup: {
  do(index: number, value: any): any;
  initial?: any;
  interval?: number;
  times?: number;
  step?: number;
  from?: number;
  to?: number;
}) => {
  let iteration = 0;
  let counter = setup.from ?? 0;
  let current = setup.initial ?? null;

  const times = setup.times ?? Infinity;
  const to = setup.to;
  const step = setup.step ?? (to === undefined || to > counter ? 1 : -1);

  while (true) {
    const result = (await setup.do(counter, current)) ?? current;

    if (
      result === STOP ||
      iteration + 1 === times ||
      (to !== undefined &&
        (step < 0 ? counter + step < to : counter + step > to))
    ) {
      break;
    }

    current = result;
    iteration++;
    counter += step;

    if (setup.interval) {
      await delay(setup.interval);
    }
  }

  return current;
};

// productive

/**
 * Executes the `do` function in a loop.
 *
 * Stops when either one of the the conditions are met:
 *
 *   a) runs the amount of times specified by `times` property,
 *
 *   b) counter reaches the value set by `to` property,
 *
 *   c) the `do` function returns `loop.stop` signal.
 *
 * @param {Object} setup
 */
const loop = Object.assign(_loop, { stop: STOP });
