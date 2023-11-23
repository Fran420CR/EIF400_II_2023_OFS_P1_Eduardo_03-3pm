export class Stream {
  #iterable;
  constructor(iterable) {
    this.#iterable = iterable;
  }

  static iterate(start, fn) {
    function* gen(start, fn) {
      let current = start;
      while (true) {
        yield current;
        current = fn(current);
      }
    }
    return new Stream(gen(start, fn));
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

  cut(n){
    function* gen(n, iterable){
      for(const e of iterable){
        if(n-- > 0){
          yield e;
        } else {
          break;
        }
      }
    }
    return new Stream(gen(n, this.#iterable));
  }

  toList() {
    return [...this.#iterable];
  }
}