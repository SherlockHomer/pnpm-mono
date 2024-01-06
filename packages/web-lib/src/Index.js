import { reduce } from './Array';
import tap from './Log';

console.log(reduce([1, 2, 3], (prev, next) => prev + next, 10));

export default tap;

export const a = new Promise(() => {});
