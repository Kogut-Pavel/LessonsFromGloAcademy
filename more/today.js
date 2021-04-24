'use strict';

let date = new Date(),
      days = [
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
      'Воскресенье'
      ],
      hours = date.getHours(),
      day = days[date.getDay() - 1],
      time = date.toLocaleTimeString('en'),
      newYear = new Date('1 January 2022'),
      msPerDay = 24 * 60 * 60 * 1000,
      daysLeft = Math.round((newYear.getTime() - date.getTime()) / msPerDay),
      dayName = '',
      ending = '' + daysLeft,
      lastNum = parseInt(ending.substr(ending.length-1));

const welcome = document.createElement('div'),
      dayNow = document.createElement('div'),
      timeNow = document.createElement('div'),
      daysBeforeNewYear = document.createElement('div');

function changeEnding() {
  if (daysLeft > 4 && daysLeft < 21) {
    dayName = ' дней';
  } else if (lastNum === 1) {
    dayName = ' день';
  } else if (lastNum === 2 || lastNum === 3 || lastNum === 4) {
    dayName = ' дня';
  } else {
    dayName = ' дней';
  }
}

changeEnding();

welcome.textContent = hours < 5 || hours > 22 ? 'Доброй ночи' :
  hours < 10 ? 'Доброе утро' :
  hours < 17 ? 'Добрый день' :
  'Добрый вечер';
dayNow.textContent = 'Сегодня: ' + day;
timeNow.textContent = 'Текущее время: ' + time; 
daysBeforeNewYear.textContent = 'До нового года осталось: ' + daysLeft + dayName;

document.body.append(welcome);
document.body.append(dayNow);
document.body.append(timeNow);
document.body.append(daysBeforeNewYear);

