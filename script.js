'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let income = 'Фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 100000;
let period = 6;

let start = function () {
  do {
    money = prompt('Ваш месячный доход?');
  }
  while (!isNumber(money));
    
};

start();

const showTypeOf = function(data) {
  console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('Период равен ' + period + ' месяцев');
console.log ('Цель заработать ' + mission + ' рублей');


// let expenses1 = prompt('Введите обязательную статью расходов?');

// let amount1 = +prompt('Во сколько это обойдётся?');

// let expenses2 = prompt('Введите обязательную статью расходов?');

// let amount2 = +prompt('Во сколько это обойдётся?');

// Возвращает сумму всех обязательных расходов за месяц
let expenses = [];

console.log(addExpenses.toLowerCase().split(','));

function getExpensesMonth() { 
  let sum = 0;

  for (let i = 0; i < 2; i++) {
      expenses[i] = prompt('Введите обязательную статью расходов?');
      sum = +prompt('Во сколько это обойдется?');
        if (isNumber(sum)) {
          sum += sum;
        } else { do {
          sum = prompt('Во сколько это обойдется?');
        }
        while (!isNumber(sum));
      }
  }
  console.log(expenses);
  return sum;
}

let expensesAmount = getExpensesMonth();

// Возвращает накопления за месяц (доходы минус расходы)
function getAccumulatedMonth(userMoney, expensesMonth) {
  return userMoney - expensesMonth;
}

const accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

// Подсчитывает за какой период будет достигнута цель и возвращает результат
function getTargetMonth(userMission, budgetMonth) {
  return Math.ceil(userMission / budgetMonth);
}

let targetMonth = getTargetMonth(mission, accumulatedMonth);

if (targetMonth > 0) {
  console.log(`Цель будет достигнута за: ${targetMonth} месяцев`);
} else {
  console.log('Цель не будет достигнута');
}

console.log('Обязательные расходы за месяц: ', expensesAmount);

// Подсчитывает бюджет на день и выводит уровень дохода

let budgetDay = accumulatedMonth / 30;
console.log('Бюджет на день: ', Math.floor(budgetDay));

function getStatusIncome(budget) {
  if (budget >= 1200) {
    return ('У вас высокий уровень дохода');
  } else if (budget >= 600 && budget < 1200) {
    return ('У вас средний уровень дохода');
  } else if (budget < 600 && budget >= 0) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else {
    return ('Что-то пошло не так');
  }
}

console.log(getStatusIncome(budgetDay));