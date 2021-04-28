window.addEventListener('DOMContentLoaded', function() {
  'use strict';
  // Timer
  function countTimer(deadline) {
    let timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds'),
        idInterval = 0;


    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining = (dateStop - dateNow) / 1000,
          seconds = 0,
          minutes = 0,
          hours = 0;
      if (timeRemaining > 0) {
          seconds = Math.floor(timeRemaining % 60);
          minutes = Math.floor((timeRemaining / 60) % 60);
          hours = Math.floor(timeRemaining / 60 / 60);
      } return {timeRemaining, hours, minutes, seconds};
      } 

    function addZero(elem) {
      if (String(elem).length === 1) {
        return '0' + elem;
      } else {
        return elem;
      }
    }

    function updateClock() {
      let timer = getTimeRemaining();
      timerHours.textContent = addZero(timer.hours);
      timerMinutes.textContent = addZero(timer.minutes);
      timerSeconds.textContent = addZero(timer.seconds);

      if(timer.timeRemaining < 0) {
        clearInterval(idInterval);
      }
    }
    idInterval = setInterval(updateClock, 1000);
    
  }

  countTimer('25 april 2021');
  
  // Menu

  const toggleMenu = () => {

    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          closeBtn = document.querySelector('.close-btn'),
          menuItems = menu.querySelectorAll('ul>li');
    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));

  };

  toggleMenu();

  // popup

  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          popupClose = document.querySelector('.popup-close'),
          popupContent = document.querySelector('.popup-content');
  
      popupClose.addEventListener('click', () => {
        popup.style.display = 'none';
      });


    let count;
    const modalAnimate = () => {
      let modalAnimateID = requestAnimationFrame(modalAnimate); 
        
      if (count > 0) {
        count -= 5; 
        console.log(count); 
        popupContent.style.transform = `translateY(${-count}px)`;
      } else if (count < 0) {
        cancelAnimationFrame(modalAnimateID);
      }
    };
    
    popupBtn.forEach((elem) => {
      elem.addEventListener("click", () => {
        popup.style.display = "block";
        
        const screenWidth = window.screen.width;
        if (screenWidth > 768) {
          count = 100;
          modalAnimate();
        }
      
      });
    });
  };

  togglePopUp();
  
});