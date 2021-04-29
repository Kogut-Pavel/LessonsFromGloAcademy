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
    const handlerMenu = (event) => {
      const target = event.target;
      const menu = document.querySelector('menu');
      const displayMenu = () => {
        menu.classList.toggle('active-menu');
      };
      
      if (target.closest('.menu')) {
        displayMenu();
      } else if (!target.closest('.active-menu') && target.matches('[href^="#"]')) {
        displayMenu();
      } else if (!target.classList.contains('active-menu') && menu.classList.contains('active-menu')) {
        displayMenu();
      }
      
    };
      
    document.addEventListener('click', handlerMenu);
      
  };
  
  toggleMenu();

  // popup

  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          popupContent = document.querySelector('.popup-content');
    popup.addEventListener('click', (event) => {
    let target = event.target;
      if (target.classList.contains('popup-close')) {
        popup.style.display = 'none';
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          popup.style.display = 'none';
        }
      }
    });
          
    let count = 100;
      const modalAnimate = () => {
        let modalAnimateID = requestAnimationFrame(modalAnimate);   
        if (count > 0) {
          count -= 5;            
          popupContent.style.transform = `translateY(${-count}px)`;       
        } 
        if (count === 0) {       
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

  