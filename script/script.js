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

  countTimer('30 april 2021');
  
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
      } else if (!target.classList.contains('active-menu') && menu.classList.contains('active-menu')) {
        displayMenu();
      }
    };
      
    document.addEventListener('click', handlerMenu);
      
  };
  
  toggleMenu();

   // Scroll smooth
  
   const scrollLinks = document.querySelectorAll('a');

   for (const scrollLink of scrollLinks) {
     scrollLink.addEventListener('click', event => {
       event.preventDefault();
       const id = scrollLink.getAttribute('href');
       document.querySelector(id).scrollIntoView({
         behavior: 'smooth',
         block: 'start',
         });
     });
   }
   
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

  // Tabs

  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
          tab = tabHeader.querySelectorAll('.service-header-tab'),
          tabContent = document.querySelectorAll('.service-tab');
          const toggleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++) {
              if (index === i) {
                tab[i].classList.add('active');
                tabContent[i].classList.remove('d-none');
              } else {
                tab[i].classList.remove('active');
                tabContent[i].classList.add('d-none');
              }
            }
          };

          tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target) {
              tab.forEach((item, i) => {
                if (item === target) {
                  toggleTabContent(i);
                }
              });
          }
      });
  };

  tabs();  
  
  // Slider 

  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      dot = document.querySelectorAll('.dot'),
      slider = document.querySelector('.portfolio-content');

    let currentSlide = 0,
      interval;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    }; 

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();

      let target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if(currentSlide < 0) {
        currentSlide = slide.length -1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        startSlide();
      }
    });

    startSlide(2000);

  };

  const addDot = () => {
    const portfolioItems = document.querySelectorAll('.portfolio-item'),
      portfolioDots = document.querySelector('.portfolio-dots');

      portfolioItems.forEach(() => {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        portfolioDots.appendChild(dot);
      });

      portfolioDots.children[0].classList.add('dot-active');
  };

  addDot();
  slider();
  
  // Change photo

  const changePhoto = () => {
    const commandPhotos = document.querySelectorAll('.command__photo');
    
    const changingPhotos = (event) => {
			let target = event.target;

			if (target.classList.contains('command__photo')) {
				const lastSrc = target.src;

				target.src = target.dataset.img;
				target.dataset.img = lastSrc;
			}
		};

    commandPhotos.forEach(() => addEventListener('mouseover', changingPhotos));
    commandPhotos.forEach(() => addEventListener('mouseout', changingPhotos));

	};  

  changePhoto();

  // Check calculator

  const checkCalcBlock = () => {
    const calcItems = document.querySelectorAll('.calc-block>input');

    calcItems.forEach((elem) => {
      elem.addEventListener('input', (event) => {   
          event.target.value = event.target.value.replace(/\D/g, '');
      });
    });
  };

  checkCalcBlock();

  // Check inputs 

  const checkInputs = () => {
    const topForms = document.querySelectorAll('.top-form');
    
    const checkingInputs = (event) => {
      let target = event.target;
      if (target.name === 'user_name' || target.matches('.mess')) {
        target.value = target.value.replace(/[^а-яё ,.-]/gi, '');
      } 
      if (target.matches('.form-email')) {
        target.value = target.value.replace(/[а-яё ,?^]/gi, '');
      }
      if (target.matches('.form-phone')) {
        target.value = target.value.replace(/[^0-9() \.-]/g, '');
      }
    };  
       
    topForms.forEach((elem) => {
      elem.addEventListener('blur', () => {
        // Заменяет 2 и более тире на один
        elem.value = elem.value.replace(/-{1,}/g, "-");
        // Заменяет 2 и более пробела на один
        elem.value = elem.value.replace(/\s{1,}/gi, " ");
        // Удаляет пробелы и тире в начале и конце строки
        elem.value = elem.value.replace(/^\s|\s$|^-|-$/g, "");
        // Приводит первую букву каждого слова в Верхний регистр в поле "Ваше имя"
        if (elem.name === 'user_name') { 
          let nameFirstLetter = [];
          let word = elem.value.split(" ");
          word.forEach((item) => {
            item = item[0].toUpperCase() + item.slice(1);
            nameFirstLetter.push(item);
            elem.value = nameFirstLetter.join(" ");
          });
        }
      }, true);
    });   
   
    topForms.forEach(() => addEventListener('input', checkingInputs));
    
  };
  
  checkInputs();
  
  // Calculator 

  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcDay = document.querySelector('.calc-day'),
      calcCount = document.querySelector('.calc-count'),
      totalValue = document.getElementById('total');

    const countSum = () => {
      let total = 0,
      countValue = 1,
      dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      } 

      totalValue.textContent = total;

      function animate({timing, draw, duration}) {
        let start = performance.now();
        requestAnimationFrame(function animate(time) {
          let timeFraction = (time - start) / duration;
          if (timeFraction > 1) {
            timeFraction = 1;
          }
          let progress = timing(timeFraction);
          draw(progress);
          if (timeFraction < 1) {
            requestAnimationFrame(animate);
          }
        });
      }
      
        const animation = () => {
          animate({
            duration: 1000,
            timing(timeFraction) {
              return timeFraction;
            },
            draw(progress) {
              totalValue.textContent = Math.floor(progress * total);
            }
          });
        };
        animation();
    };

      calcBlock.addEventListener('change', (event) => {
        const target = event.target;
        if (target === calcType || target === calcSquare ||
          target === calcDay || target === calcCount) {
          countSum();
        }
      });
      
  };

  calc(100);

});
