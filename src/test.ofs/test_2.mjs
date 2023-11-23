import { Stream } from './stream.mjs';

const nats = Stream.iterate(0, (n) => n + 1);
const even = nats.filter((n) => n % 2 === 0);
const evenGreaterThanTen = even.filter((n) => n > 10).cut(10);
const onlyFiveAfterTen = evenGreaterThanTen.toList();

onlyFiveAfterTen.forEach((n) => console.log(n));


