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
  this.getExpInc();
  this.getExpensesMonth();   
  this.getAdd();
  this.getBudget();
  this.blockInputs();
  this.showResult();
  
        
  start.style.display = 'none';
  cancel.style.display = 'block';
}

blockInputs() {
  document.querySelectorAll('input[type=text').forEach(item => {
    item.disabled = true;
  });
  document.querySelectorAll('.btn_plus').forEach(item => {
    item.disabled = true;
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
  document.querySelectorAll('.btn_plus').forEach(item => {
    item.style.display = '';
    item.disabled = false;
  });
  document.querySelectorAll('input[type=text]').forEach(item => {
    item.value = '';
    item.disabled = false;
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

addBlock() {
  const target = event.target;
  const startStr = target.parentNode.className;
  const cloneItem = document.querySelector(`.${startStr}-items`).cloneNode(true);
  cloneItem.querySelector(`.${startStr}-title`).value = '';
  cloneItem.querySelector(`.${startStr}-amount`).value = '';
  target.parentNode.insertBefore(cloneItem, target);
  if (document.querySelectorAll(`.${startStr}-items`).length === 3) {
    target.style.display = 'none';
  }
}

getExpInc() {
  const count = item => {
    const startStr = item.className.split('-')[0];
    const itemTitle = item.querySelector(`.${startStr}-title`).value;
    const itemAmount = item.querySelector(`.${startStr}-amount`).value;
    if (itemTitle !== '' && itemAmount !== '') {
      this[startStr][itemTitle] = +itemAmount;
      this.incomeMonth += startStr === 'income' ? +itemAmount : null;
    }
  };
    document.querySelectorAll('.income-items').forEach(count);
    document.querySelectorAll('.expenses-items').forEach(count);

   
  
}
getAdd() {
  const addElem = item => {
    return item.map(el => el.trim()).filter(el => el !== '');
  };
  this.addIncome = addElem([additionalIncomeItem[0].value, additionalIncomeItem[1].value]);
  this.addExpenses = addElem(additionalExpensesItem.value.split(','));
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
  expensesPlus.addEventListener('click', this.addBlock);
  incomePlus.addEventListener('click', this.addBlock);
  periodSelect.addEventListener('input', this.changePeriodSelect);
  salaryAmount.addEventListener('input', this.blockStart);
  }
}
const appData = new AppData();
appData.eventsListeners();





