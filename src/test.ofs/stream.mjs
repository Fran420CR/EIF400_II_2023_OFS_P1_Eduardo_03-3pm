export class Stream {
  #iterable;
  constructor(iterable) {
    this.#iterable = iterable;
  }

  static iterate(start, step) {
    const generatorFunction = function* () {
      let current = start;
      while (current <=  100 ) {
        yield current;
        current = step(current);
      }
    };

    return new Stream(generatorFunction());
  }

  filter(predicate) {
    function* gen(iterable) {
      for (const e of iterable) {
        if (predicate(e)) {
          yield e;
        }
      }
    }
    return new Stream(gen(this.#iterable));
  }

  map(fn) {
    function* gen(iterable) {
      for (const e of iterable) {
        yield fn(e);
      }
    }
    return new Stream(gen(this.#iterable));
  }

  toList() {
    return [...this.#iterable];
  }
}