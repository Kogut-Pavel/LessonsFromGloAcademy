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
    periodSelect = document.querySelector('.period-select'), // range
    cancel = document.getElementById('cancel');
    
const AppData = function() {

  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.mission = 0;
  this.period = 0;
  this.budget = +0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;

};

AppData.prototype.start = function() {

  this.budget = salaryAmount.value;
  
  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();   
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();
  this.blockInputs();
  this.showResult();
        
  start.style.display = 'none';
  cancel.style.display = 'block';
};

AppData.prototype.blockInputs = function(disabled = true) {
  document.querySelectorAll('input[type=text]').forEach(item => {
    item.disabled = disabled;
  });
};

AppData.prototype.reset = function () {
  cancel.style.display = 'none';
  start.style.display = 'block';
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
};

AppData.prototype.showResult = function () {
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  incomePeriodValue.value = this.calcPeriod();
  targetMonthValue.value = this.getTargetMonth();
  periodSelect.addEventListener('input', () => {
    incomePeriodValue.value = this.calcPeriod();
  });
};

AppData.prototype.addExpensesBlock = function() {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  cloneExpensesItem.querySelector('.expenses-title').value = '';
  cloneExpensesItem.querySelector('.expenses-amount').value = '';
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length === 3) {
    expensesPlus.style.display = 'none';
  }
};

AppData.prototype.getExpenses = function() {  
  expensesItems.forEach(item => {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      this.expenses[itemExpenses] = cashExpenses;
    }
  });
};

AppData.prototype.addIncomeBlock = function() {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  cloneIncomeItem.querySelector('.income-title').value = '';
  cloneIncomeItem.querySelector('.income-amount').value = '';
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length === 3) {
    incomePlus.style.display = 'none';
  }
};

AppData.prototype.getIncome = function() {
  incomeItems.forEach(item => {
    let itemIncome = item.querySelector('.income-title').value;
    let cashIncome = item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== '') {
      this.income[itemIncome] = +cashIncome;
      this.incomeMonth += +cashIncome;
    }
  });
};

AppData.prototype.getAddExpenses = function() {
  let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(item => {  
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
  });
};

AppData.prototype.getAddIncome = function() {
  additionalIncomeItem.forEach(item => {
    let itemValue = item.value.trim();
    if (itemValue !== '') {
      this.addIncome.push(itemValue);
    }
  });
};

AppData.prototype.changePeriodSelect = (event) => {
  document.querySelector('.period-amount').textContent = event.target.value;
};

AppData.prototype.getExpensesMonth = function() { // Возвращает сумму обязательных расходов за месяц
  
  for (let elem in this.expenses) {
   this.expensesMonth += +this.expenses[elem];
  }
};

AppData.prototype.getBudget = function() { // Возвращает накопления за месяц (доходы минус расходы)
  this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function() { // Возвращает за какой период будет достигнута цель
  return Math.ceil(targetAmount.value / this.budgetMonth);
};

AppData.prototype.getStatusIncome = function() { // Возвращает статус дохода
  if (this.budget >= 1200) {
    return ('У вас высокий уровень дохода');
  } else if (this.budget >= 600 && this.budget < 1200) {
    return ('У вас средний уровень дохода');
  } else if (this.budget < 600 && this.budget >= 0) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else {
    return ('Что-то пошло не так');
  }
};

AppData.prototype.getInfoDeposit = function () {
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
};

AppData.prototype.calcPeriod = function () {
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.blockStart = function () {
  start.disabled = !isNumber(salaryAmount.value);
};

AppData.prototype.eventsListeners = function () {

  this.blockStart();
  start.addEventListener('click', this.start.bind(this));
  cancel.addEventListener('click', this.reset.bind(this));
  expensesPlus.addEventListener('click', this.addExpensesBlock);
  incomePlus.addEventListener('click', this.addIncomeBlock);
  periodSelect.addEventListener('input', this.changePeriodSelect);
  salaryAmount.addEventListener('input', this.blockStart);
};

const appData = new AppData();
appData.eventsListeners();





