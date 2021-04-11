'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let start = function () {
  do {
    money = prompt('Ваш месячный доход?');
  }
  while (!isNumber(money));
};

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
  budget: +money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function() { 
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
      appData.addExpenses = addExpenses.toLowerCase().split(',');
      appData.deposit = confirm('Есть ли у вас депозит в банке?');
      for (let i = 0; i < 2; i++) {
        appData.expenses[prompt('Введите обязательную статью расходов?')] = (function() {
          let sum = 0;
            do {
                sum = prompt('Во сколько это обойдется?');
            } while (!isNumber(sum));
            return +sum;
          })();
        }
    // for (let i = 0; i < 2; i++) {
    //   appData.expenses = [prompt('Введите обязательную статью расходов?')];
    //     let sum = 0;      
    //     do {
    //         sum = +prompt('Во сколько это обойдется?');
    //       } 
    //       while(!isNumber(sum));
    //       return sum; 
    //   }
  },
  getExpensesMonth: function() { // Возвращает сумму обязательных расходов за месяц
    appData.expensesMonth = 0;
    for (let elem in appData.expenses) {
     appData.expensesMonth += appData.expenses[elem];
    }
  },
  getBudget: function() { // Возвращает накопления за месяц (доходы минус расходы)
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    return Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function() { // Возвращает за какой период будет достигнута цель
    let res = Math.ceil(appData.mission / appData.budgetMonth);
    if (res > 0) {
      return (`Цель будет достигнута за: ${res} месяцев`);
    } else {
      return ('Цель не будет достигнута');
    }
  },
  getStatusIncome: function() { // Возвращает бюджет на день
    if (appData.budget >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (appData.budget >= 600 && appData.budget < 1200) {
      return ('У вас средний уровень дохода');
    } else if (appData.budget < 600 && appData.budget >= 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что-то пошло не так');
    }
  },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

const targetMonth = appData.getTargetMonth();

console.log('Обязательные расходы за месяц: ', appData.expensesMonth);
console.log(targetMonth);
console.log('Уровень дохода: ', appData.getStatusIncome());
// console.log('Наша программа включает в себя данные: ');
// for (let elem in appData) {
//     console.log(elem, appData[elem]);
// }