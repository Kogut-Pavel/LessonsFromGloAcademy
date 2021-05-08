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

export default toggleMenu;