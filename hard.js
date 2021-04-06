'use strict';

const foo = function () {
  let res = prompt('Ожидается строка...');
  if (typeof res === 'string') {
    const maxLength = 30;
    const str = res.trim();
    if (str.length > maxLength) {
      res = str.substr(0, maxLength) + '...';
    } else {
      res = str;
    }
  }
  return res;
};

console.log(foo());
