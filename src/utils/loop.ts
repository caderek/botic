import delay from "./delay.js";

const STOP = Symbol("loop stop");

type Handler = (index: number, value: any) => any;

class Loop {
  #hasCustomStep: boolean = false;
  #isAsync: boolean = false;
  #times: number = Infinity;
  #from: number = 0;
  #to: number = Infinity;
  #step: number = 1;
  #interval: number = 0;
  #init: any = null;

  constructor(isAsync: boolean = false) {
    this.#isAsync = isAsync;
  }

  times(num: number) {
    this.#times = num;
    return this;
  }

  from(start: number) {
    this.#from = start;
    return this;
  }

  to(finish: number) {
    this.#to = finish;
    return this;
  }

  step(num: number) {
    this.#step = num;
    this.#hasCustomStep = true;
    return this;
  }

  interval(ms: number) {
    this.#interval = ms;
    this.#isAsync = true;
    return this;
  }

  init(val: any) {
    this.#init = val;
    return this;
  }

  #prepareStep() {
    if (!this.#hasCustomStep) {
      return this.#to > this.#from ? 1 : -1;
    }

    return this.#step;
  }

  #prepareTo() {
    if (this.#to === Infinity && this.#step < 0) {
      return -Infinity;
    }

    return this.#to;
  }

  async doAsync(fn: Handler, firstResult: any) {
    const times = this.#times;
    const interval = this.#interval;
    const to = this.#prepareTo();
    const step = this.#prepareStep();

    let i = 0;
    let counter = this.#from;
    let current = this.#init;

    while (true) {
      const result = await (i === 0 ? firstResult : fn(counter, current));

      if (result === STOP) {
        break;
      }

      current = result === undefined ? current : result;

      if (
        i + 1 === times ||
        (step < 0 ? counter + step < to : counter + step > to)
      ) {
        break;
      }

      i++;
      counter += step;

      if (interval) {
        await delay(interval);
      }
    }

    return current;
  }

  doSync(fn: Handler, firstResult: any) {
    const times = this.#times;
    const to = this.#prepareTo();
    const step = this.#prepareStep();

    let i = 0;
    let counter = this.#from;
    let current = this.#init;

    while (true) {
      const result = i === 0 ? firstResult : fn(counter, current);

      if (result === STOP) {
        break;
      }

      current = result === undefined ? current : result;

      if (
        i + 1 === times ||
        (step < 0 ? counter + step < to : counter + step > to)
      ) {
        break;
      }

      i++;
      counter += step;
    }

    return current;
  }

  do(fn: Handler) {
    const first = fn(this.#from, this.#init);

    if (first instanceof Promise) {
      this.#isAsync = true;
    }

    return this.#isAsync ? this.doAsync(fn, first) : this.doSync(fn, first);
  }
}

const loop = {
  times(num: number) {
    return new Loop().times(num);
  },
  from(start: number) {
    return new Loop().from(start);
  },
  to(finish: number) {
    return new Loop().to(finish);
  },
  step(num: number) {
    return new Loop().step(num);
  },
  interval(ms: number) {
    return new Loop(true).interval(ms);
  },
  init(val: any) {
    return new Loop().init(val);
  },
  do(fn: Handler) {
    return new Loop().do(fn);
  },
  get stop() {
    return STOP;
  },
};

export { Loop };
export default loop;
