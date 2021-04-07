'use strict';

let money = +prompt('Ваш месячный доход?');
let income = 'Фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 100000;
let period = 6;

const showTypeOf = function(data) {
  console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('Период равен ' + period + ' месяцев');
console.log ('Цель заработать ' + mission + ' рублей');

console.log(addExpenses.toLowerCase);
console.log(addExpenses.split(','));

let expenses1 = prompt('Введите обязательную статью расходов?');

let amount1 = +prompt('Во сколько это обойдётся?');

let expenses2 = prompt('Введите обязательную статью расходов?');

let amount2 = +prompt('Во сколько это обойдётся?');

// Возвращает сумму всех обязательных расходов за месяц
function getExpensesMonth() { 
  return amount1 + amount2;
}

// Возвращает накопления за месяц (доходы минус расходы)
function getAccumulatedMonth(userMoney, expensesMonth) {
  return userMoney - expensesMonth;
}

const accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth());

// Подсчитывает за какой период будет достигнута цель и возвращает результат
function getTargetMonth(userMission, budgetMonth) {
  return Math.ceil(userMission / budgetMonth);
}

console.log('Обязательные расходы за месяц: ', getExpensesMonth());

console.log(`Цель будет достигнута за: ${getTargetMonth(mission, accumulatedMonth)} месяцев`);

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