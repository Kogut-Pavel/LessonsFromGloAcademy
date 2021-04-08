'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const getRandomInt = function(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

function start() {
  let randomNumber = getRandomInt(100);
  let numberAttempts = 10;
  function game() {
    numberAttempts--;
    if (numberAttempts < 1) {
      if (confirm('Попытки закончились, хотите сыграть ещё?')) {
        start();
      } else {
          alert('До свидания!');
          return;
      }
    } else {
        const num = prompt('Угадай число от 1 до 100');
        if (num === null) {
          alert('До свидания');
          return;
      } 
      if (isNumber(num)) {
        if (num > randomNumber) {
          alert(`Загаданное число меньше, осталось попыток: ${numberAttempts}`);
          game();
        } else if (num < randomNumber) {
            alert (`Загаданное число больше, осталось попыток: ${numberAttempts}`);
            game();
        } else {
            if (confirm('Поздравляю, Вы угадали!!! Хотели бы сыграть ещё?')) {
            start();
          } else {
              alert('До свидания');
              return;
          }
        } 
      } else {
          alert('Введите число');
          game();
      }
    }
  }
  console.dir(game);
  game();
}

start();