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

export default addDot;