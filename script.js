'use strict';

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = function(str, comma = false) {
  const pattern = comma ? /^[, а-яА-ЯёЁa-zA-Z]+$/ : /^[ а-яА-ЯёЁa-zA-Z]+$/;
  return pattern.test(str);
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
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 3,
  budget: +money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function() { 
    let itemIncome;
    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      do {
        itemIncome = prompt('Какой у вас есть дополнительный заработок?');
      }
      while (!isString(itemIncome) || itemIncome === '');
      let cashIncome = 0;
      do {
        cashIncome = prompt('Сколько в месяц вы зарабатываете на этом?');
      }
      while (!isNumber(cashIncome) || cashIncome === '' || cashIncome === null);
      appData.income[itemIncome] = cashIncome;
    }
    let addExpenses;
    do {
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    } while (isNumber(addExpenses) || addExpenses === '');
    appData.addExpenses = addExpenses.split(',');   
    let str = '';
    for (let letter of appData.addExpenses) {
      letter = letter.trim();
      letter = letter[0].toUpperCase() + letter.slice(1) + ' ';
      str += letter;
    }
    console.log(str);
    
      appData.deposit = confirm('Есть ли у вас депозит в банке?');
      for (let i = 0; i < 2; i++) {
        let itemExpenses;
        do {
          itemExpenses = prompt('Введите обязательную статью расходов?');
        }
        while (!isString(itemExpenses) || itemExpenses === '');
        let cashExpenses = 0;
        do {
          cashExpenses = +prompt('Во сколько это обойдется?');
        }
        while (!isNumber(cashExpenses) || cashExpenses === '' || cashExpenses === null);
        appData.expenses[itemExpenses] = cashExpenses;
        }
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
  getInfoDeposit: function () {
    if(appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?');
      } 
      while (!isNumber(appData.percentDeposit) || appData.percentDeposit === '' || appData.percentDeposit === null);
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?');
      }
      while(!isNumber(appData.moneyDeposit) || appData.moneyDeposit === '' || appData.moneyDeposit === null);
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getInfoDeposit();
appData.getBudget();

const targetMonth = appData.getTargetMonth();

console.log('Обязательные расходы за месяц: ', appData.expensesMonth);
console.log(targetMonth);
console.log('Уровень дохода: ', appData.getStatusIncome());
console.log('Наша программа включает в себя данные: ');
for (let elem in appData) {
    console.log(elem, appData[elem]);
}