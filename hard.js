'use strict';

let arr = ['3458', '456623', '9462953', '284673', '695863', '28758', '486453'];

arr.forEach(em => {
  if (String(em).search(/(2|4)/) === 0) {
    console.log(em);
  }
});



let n = 100;

nextPrime:
for (let i = 2; i <= n; i++) { 
  let j = 2;
  for (; j < i; j++) { 
    if (i % j === 0) {
    continue nextPrime; 
    }
  }
  console.log(`${i}: Простое число. Делители этого числа: 1 и `, j);
}

// for (let i = 0; i <= arr.length; i++) {
//   if (arr[i].startsWith('2') || arr[i].startsWith('4')) {
//     console.log(arr[i]);
//   }
// }



