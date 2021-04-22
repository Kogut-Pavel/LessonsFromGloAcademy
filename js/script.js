'use strict';

const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = function(str, comma = false) {
  const pattern = comma ? /^[, а-яА-ЯёЁa-zA-Z]+$/ : /^[ а-яА-ЯёЁa-zA-Z]+$/;
  return pattern.test(str);
};

const start = document.getElementById('start'),
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
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'), // range
    cancel = document.getElementById('cancel');
let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');

class AppData {
  constructor() {
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
  }


start() {
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
}

blockInputs(disabled = true) {
  document.querySelectorAll('input[type=text]').forEach(item => {
    item.disabled = disabled;
  });
}

reset() {
  cancel.style.display = 'none';
  start.style.display = 'block';
  const remove = item => {
    for (let i = item.length - 1; i > 0; i--) {
        item[0].parentNode.removeChild(item[i]);
    }
  };
  remove(document.querySelectorAll('.income-items'));
  remove(document.querySelectorAll('.expenses-items'));
  incomePlus.style.display = '';
  expensesPlus.style.display = '';
  this.blockInputs(false);
  document.querySelectorAll('input[type=text]').forEach(item => {
    item.value = '';
  });
  periodSelect.value = document.querySelector('.period-amount').textContent = 1;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.income = {};
  this.incomeMonth = 0;
  this.expenses = {};
  this.expensesMonth = 0;
  this.addIncome = [];
  this.addExpenses = [];
  this.deposit = false;
  this.precentDeposit = 0;
  this.moneyDeposit = 0;
  this.blockStart();
}

showResult() {
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
}

addExpensesBlock() {
  const cloneExpensesItem = expensesItems[0].cloneNode(true);
  cloneExpensesItem.querySelector('.expenses-title').value = '';
  cloneExpensesItem.querySelector('.expenses-amount').value = '';
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length === 3) {
    expensesPlus.style.display = 'none';
  }
}

getExpenses() {  
  expensesItems.forEach(item => {
    const itemExpenses = item.querySelector('.expenses-title').value;
    const cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      this.expenses[itemExpenses] = cashExpenses;
    }
  });
}

addIncomeBlock() {
  const cloneIncomeItem = incomeItems[0].cloneNode(true);
  cloneIncomeItem.querySelector('.income-title').value = '';
  cloneIncomeItem.querySelector('.income-amount').value = '';
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length === 3) {
    incomePlus.style.display = 'none';
  }
}

getIncome() {
  incomeItems.forEach(item => {
    const itemIncome = item.querySelector('.income-title').value;
    const cashIncome = item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== '') {
      this.income[itemIncome] = +cashIncome;
      this.incomeMonth += +cashIncome;
    }
  });
}

getAddExpenses() {
  const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(item => {  
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
  });
}

getAddIncome() {
  additionalIncomeItem.forEach(item => {
    const itemValue = item.value.trim();
    if (itemValue !== '') {
      this.addIncome.push(itemValue);
    }
  });
}

changePeriodSelect(event) {
  document.querySelector('.period-amount').textContent = event.target.value;
}

getExpensesMonth() { // Возвращает сумму обязательных расходов за месяц
  for (let elem in this.expenses) {
   this.expensesMonth += +this.expenses[elem];
  }
}

getBudget() { // Возвращает накопления за месяц (доходы минус расходы)
  this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
}

getTargetMonth() { // Возвращает за какой период будет достигнута цель
  return Math.ceil(targetAmount.value / this.budgetMonth);
}

getStatusIncome() { // Возвращает статус дохода
  if (this.budget >= 1200) {
    return ('У вас высокий уровень дохода');
  } else if (this.budget >= 600 && this.budget < 1200) {
    return ('У вас средний уровень дохода');
  } else if (this.budget < 600 && this.budget >= 0) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else {
    return ('Что-то пошло не так');
  }
}

getInfoDeposit() {
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
}

calcPeriod() {
  return this.budgetMonth * periodSelect.value;
}

blockStart() {
  start.disabled = !isNumber(salaryAmount.value);
}


eventsListeners() {
  this.blockStart();
  start.addEventListener('click', this.start.bind(this));
  cancel.addEventListener('click', this.reset.bind(this));
  expensesPlus.addEventListener('click', this.addExpensesBlock);
  incomePlus.addEventListener('click', this.addIncomeBlock);
  periodSelect.addEventListener('input', this.changePeriodSelect);
  salaryAmount.addEventListener('input', this.blockStart);
}
}
const appData = new AppData();
appData.eventsListeners();
