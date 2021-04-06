'use strict';

let money = +prompt('Ваш месячный доход?');
let income = 'Фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = alert('Есть ли у вас депозит в банке?');
let mission = 100000;
let period = 6;

let showTypeOf = function(data) {
  console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('Период равен ' + period + ' месяцев');
console.log ('Цель заработать ' + mission + ' рублей');

console.log(addExpenses.toLowerCase);
console.log(addExpenses.split(' '));

let expenses1 = prompt('Введите обязательную статью расходов?');

let amount1 = +prompt('Во сколько это обойдётся?');

let expenses2 = prompt('Введите обязательную статью расходов?');

let amount2 = +prompt('Во сколько это обойдётся?');

// Возвращает сумму всех обязательных расходов за месяц
const getExpensesMonth = function () { 
  if (!amount1) {
    amount1 = 0;
  }
  if (!amount2) {
    amount2 = 0;
  }
  return amount1 + amount2;
};

console.log(getExpensesMonth());

// Возвращает накопления за месяц (доходы минус расходы)
const getAccumulatedMonth = function () {
  return money - (amount1 + amount2);
};

getAccumulatedMonth();

const accumulatedMonth = getAccumulatedMonth();

// Подсчитывает за какой период будет достигнута цель и возвращает результат
const getTargetMonth = function () {
  let monthes = Math.ceil(mission / accumulatedMonth);
  return 'Цель будет достигнута за ' + monthes + ' месяцев(-а)';
};

console.log(getTargetMonth());

let budgetDay = Math.floor(accumulatedMonth / 30);
console.log(budgetDay);

const getStatusIncome = function () {
  if (budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  } else if (budgetDay >= 600 && budgetDay < 1200) {
    return ('У вас средний уровень дохода');
  } else if (budgetDay < 600 && budgetDay >= 0) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else {
    return ('Что-то пошло не так');
  }
};

console.log(getStatusIncome());