'use strict';

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const getRandomInt = function(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

function start() {
  let randomNumber = getRandomInt(100);
  function game() {
      const num = prompt('Угадай число от 1 до 100');
      if (num === null) {
          alert('До свидания');
          return;
      }
      if (isNumber(num)) {
          if (num > randomNumber) {
              alert('Загаданное число меньше');
              game();
          } else if (num < randomNumber) {
              alert('Загаданное число больше');
              game();
          } else {
              if (confirm('Вы угадали! Сыграем ещё?')) {
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
  game();
}

start();