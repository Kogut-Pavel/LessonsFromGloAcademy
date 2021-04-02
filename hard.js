'use strict';

let num = 266219;

const getMultiple = (num) => num.toString().split('').reduce((res, item) => item * res, 1);
console.log(getMultiple(num));

num = getMultiple(num) ** 3;
console.log(num);

let result = String(num).slice(0,2);
console.log(result);