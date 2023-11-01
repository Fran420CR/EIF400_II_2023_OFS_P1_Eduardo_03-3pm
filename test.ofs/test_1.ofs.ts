import {Stream} from './stream'

const nats = Stream.iterate(0, (n) => n + 1);
const even = nats.filter((n) => n % 2 === 0);
const evenLessThanEleven = even.filter((n) => n < 11);
evenLessThanEleven.toList().forEach((n) => console.log(n));