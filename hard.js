'use strict';

let lang = prompt('Введите желаемый язык(ru, en):');
let ruDays = 'Понедельник, вторник, среда, четверг, пятница, суббота, воскресенье';
let enDays = 'Monday, tuesday, wendensday, thursday, friday, saturday, sunday';


if (lang === 'ru') {
  console.log(ruDays);
} else if (lang === 'en') {
  console.log(enDays);
} else {
  console.log('Что-то пошло не так');
}

switch (lang) {
  case 'ru':
    console.log(ruDays);
    break;
  case 'en':
    console.log(enDays);
    break;
  default:
    console.log('Что-то пошло не так');
}


const langArray = {
'ru': ['Пн','Вт','СР','Чт','Пт','Сб','Вс'],
'en':['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
};
console.log(langArray[lang]);

let namePerson = prompt('Введите имя участника курса:');


console.log((namePerson === 'Артём') ? 'Директор' : (namePerson === 'Максим') ? 'Преподаватель' : 'Студент');


