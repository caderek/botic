import delay from "./delay.js";

const STOP = Symbol("loop stop");

type Handler = (index: number, value: any) => any;

class Loop {
  #iteration: number = 0;
  #counter: number = 0;
  #current: any = null;
  #times: number = Infinity;
  #to?: number;
  #step: number = 1;
  #interval?: number;
  #hasCustomStep: boolean = false;

  constructor() {}

  times(num: number) {
    this.#times = num;
    return this;
  }

  from(start: number) {
    this.#counter = start;

    if (this.#to !== undefined && !this.#hasCustomStep) {
      this.#step = this.#to < start ? -1 : 1;
    }

    return this;
  }

  to(finish: number) {
    this.#to = finish;

    if (!this.#hasCustomStep) {
      this.#step = finish < this.#counter ? -1 : 1;
    }

    return this;
  }

  step(num: number) {
    this.#step = num;
    this.#hasCustomStep = true;
    return this;
  }

  interval(ms: number) {
    this.#interval = ms;
    return this;
  }

  init(val: any) {
    this.#current = val;
    return this;
  }

  async do(fn: Handler) {
    while (true) {
      const result = (await fn(this.#counter, this.#current)) ?? this.#current;

      if (result === STOP) {
        break;
      }

      if (
        this.#iteration + 1 === this.#times ||
        (this.#to !== undefined &&
          (this.#step < 0
            ? this.#counter + this.#step < this.#to
            : this.#counter + this.#step > this.#to))
      ) {
        this.#current = result;
        break;
      }

      this.#current = result;
      this.#iteration++;
      this.#counter += this.#step;

      if (this.#interval !== undefined) {
        await delay(this.#interval);
      }
    }

    return this.#current;
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
    return new Loop().interval(ms);
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
