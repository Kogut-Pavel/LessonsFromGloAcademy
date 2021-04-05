'use strict';

let money = +prompt('Ваш месячный доход?');
let income = 'Фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = prompt('Есть ли у вас депозит в банке?');
let mission = 100000;
let period = 6;

// console.log(typeof money);
// console.log(typeof income);
// console.log(typeof deposit);

// console.log(addExpenses.length);

// console.log('Период равен ' + period + ' месяцев');
// console.log ('Цель заработать ' + mission + ' рублей');

// console.log(addExpenses.toLowerCase);
// console.log(addExpenses.split(' '));


let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдётся?');

let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдётся?');

let budgetMonth = money - (amount1 + amount2);
console.log(budgetMonth);

let monthes = Math.ceil(mission / budgetMonth);
console.log(monthes);

let budgetDay = Math.floor(budgetMonth / 30);
console.log(budgetDay);

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 && budgetDay >= 0) {
  console.log ('К сожалению у вас уровень дохода ниже среднего');
} else {
  console.log('Что-то пошло не так');
}