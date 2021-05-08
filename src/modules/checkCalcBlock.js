const checkCalcBlock = () => {
  const calcItems = document.querySelectorAll('.calc-block>input');

  calcItems.forEach((elem) => {
    elem.addEventListener('input', (event) => {   
        event.target.value = event.target.value.replace(/\D/g, '');
    });
  });
};

export default checkCalcBlock;