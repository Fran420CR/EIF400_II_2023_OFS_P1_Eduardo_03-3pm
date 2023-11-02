import { Stream } from './stream.mjs';

const nats = Stream.iterate(0, (n) => n + 1);
const even = nats.filter((n) => n % 2 === 0);
const evenGreaterThanTen = even.filter((n) => n > 10);
const onlyFiveAfterTen = evenGreaterThanTen.toList().slice(0, 5);

onlyFiveAfterTen.forEach((n) => console.log(n));


