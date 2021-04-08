'use strict';

let money;
let income = 'Фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 100000;
let period = 6;
let expenses = [];


let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const showTypeOf = function(data) {
  console.log(data, typeof(data));
};

// Принимается месячный доход

let start = function () {
  do {
    money = prompt('Ваш месячный доход?');
  }
  while (!isNumber(money));
    
};

start();

// Возвращает сумму обязательных расходов за месяц

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
 
  let res = Math.ceil(userMission / budgetMonth);
  if (res > 0) {
    return (`Цель будет достигнута за: ${res} месяцев`);
  } else {
    return ('Цель не будет достигнута');
  }
}

// Подсчитывает бюджет на день

// let budgetDay = accumulatedMonth / 30;
function getBudgetDay(userAccumulatedMonth) {
  return Math.floor(userAccumulatedMonth / 30);
}

const budgetDay = getBudgetDay(accumulatedMonth);

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

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('Период равен ' + period + ' месяцев');
console.log ('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(','));
console.log('Обязательные расходы за месяц: ', expensesAmount);
console.log(getTargetMonth(mission, accumulatedMonth));
console.log('Бюджет на день: ', budgetDay);
console.log(getStatusIncome(budgetDay));