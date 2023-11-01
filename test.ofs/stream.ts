export class Stream<T> {
    #iterable: Iterable<T>;
  
    constructor(iterable: Iterable<T>) {
      this.#iterable = iterable;
    }
  
    static iterate(start: number, step: (n: number) => number) {
      const generatorFunction = function* () {
        let current = start;
        while (true) {
          yield current;
          current = step(current);
        };
      };
  
      return new Stream<number>(generatorFunction());
    }
  
    filter(predicate: (item: T) => boolean) {
      function* gen(iterable: Iterable<T>) {
        for (const e of iterable) {
          if (predicate(e)) {
            yield e;
          }
        }
      }
      return new Stream<T>(gen(this.#iterable));
    }
  
    map<U>(fn: (item: T) => U) {
      function* gen(iterable: Iterable<T>) {
        for (const e of iterable) {
          yield fn(e);
        }
      }
      return new Stream<U>(gen(this.#iterable));
    }
  
    toList() {
      return [...this.#iterable];
    }
  }
  
  

  