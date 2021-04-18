'use strict';

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = function(str, comma = false) {
  const pattern = comma ? /^[, а-яА-ЯёЁa-zA-Z]+$/ : /^[ а-яА-ЯёЁa-zA-Z]+$/;
  return pattern.test(str);
};

let start = document.getElementById('start'),
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeItems = document.querySelectorAll('.income-items'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'); // range
    

let appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 0,
  period: 0,
  budget: +0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function() {
    appData.budget = salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();   
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();
    appData.showResult();

    periodSelect.addEventListener('input', () => {
      incomePeriodValue.value = appData.calcPeriod();
  });

  if (start.textContent === 'Рассчитать') {
    appData.blockInputs();
    start.textContent = 'Сбросить';
  } else {
    start.textContent = 'Рассчитать';
    appData.reset();
  }
   
  },
  blockInputs: function(disabled = true) {
    document.querySelectorAll('input[type=text]').forEach(item => {
      item.disabled = disabled;
    });
  },
  reset: function () {
    for (let i = incomeItems.length - 1; i > 0; i--) {
      incomeItems[0].parentNode.removeChild(incomeItems[i]);
    }
    for (let i = expensesItems.length - 1; i > 0; i--) {
      expensesItems[0].parentNode.removeChild(expensesItems[i]);
    }
    incomePlus.style.display = '';
    expensesPlus.style.display = '';
    this.blockInputs(false);
    document.querySelectorAll('input[type=text]').forEach(item => {
      item.value = '';
    });    
    periodSelect.value = document.querySelector('.period-amount').textContent = 1;
    this.blockStart();
  },
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
  },
  addExpensesBlock: function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },
  getExpenses: function() {  
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  addIncomeBlock: function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },
  getIncome: function() {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = +cashIncome;
      }
    });
  },
  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {  
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function() {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  },
  changePeriodSelect: (event) => {
    document.querySelector('.period-amount').textContent = event.target.value;
  },
  getExpensesMonth: function() { // Возвращает сумму обязательных расходов за месяц
    this.expensesMonth = 0;
    for (let elem in this.expenses) {
     this.expensesMonth += +this.expenses[elem];
    }
  },
  getBudget: function() { // Возвращает накопления за месяц (доходы минус расходы)
    this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function() { // Возвращает за какой период будет достигнута цель
    return targetAmount.value / this.budgetMonth;
  },
  getStatusIncome: function() { // Возвращает статус дохода
    if (this.budget >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (this.budget >= 600 && this.budget < 1200) {
      return ('У вас средний уровень дохода');
    } else if (this.budget < 600 && this.budget >= 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что-то пошло не так');
    }
  },
  getInfoDeposit: function () {
    if(this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент?');
      } 
      while (!isNumber(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null);
      do {
        this.moneyDeposit = prompt('Какая сумма заложена?');
      }
      while(!isNumber(this.moneyDeposit) || this.moneyDeposit === '' || this.moneyDeposit === null);
    }
  },
  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
  },
  blockStart: function () {
    start.disabled = !isNumber(salaryAmount.value);
  }
};
appData.blockStart();
start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriodSelect);
salaryAmount.addEventListener('input', appData.blockStart);

// console.log('Обязательные расходы за месяц: ', appData.expensesMonth);
// console.log(targetMonth);
// console.log('Уровень дохода: ', appData.getStatusIncome());
// console.log('Наша программа включает в себя данные: ');
// for (let elem in appData) {
//     console.log(elem, appData[elem]);
// } 