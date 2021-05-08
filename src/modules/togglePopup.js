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

  export default togglePopUp;