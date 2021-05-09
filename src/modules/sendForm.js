const sendForm = () => {
    
  const postData = body => fetch('./server.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const clearInput = idForm => {
    const form = document.getElementById(idForm);

    [...form.elements]
      .filter(item =>
        item.tagName.toLowerCase() !== 'button' &&
        item.type !== 'button')
      .forEach(item =>
        item.value = '');
  };
    
    const checkInputs = (event) => {
      const target = event.target;
      if (target.matches('.form-phone')) {
        target.value = target.value.replace(/[^\+\d]/g, '');
      }

      if (target.name === 'user_name') {
        target.value = target.value.replace(/[^а-яё ]/gi, '');
      }

      if (target.matches('.mess')) {
        target.value = target.value.replace(/[^а-яё0-9 ,.]/gi, '');
      }
      if (target.matches('.form-email')) {
        target.value = target.value.replace(/[^[A-Za-z0-9@.\-_/ ]/gi, '');
      }
    };

  const processingForm = idForm => {
    const form = document.getElementById(idForm);
    const statusMessage = document.createElement('div');
    
    const showStatus = status => {
      const img = document.createElement('img');
      const statusList = {
        load: {
          message: ' Загрузка...',
          img: './images/message/waiting.gif'
        },
        error: {
          message: ' Что-то пошло не так...',
          img: './images/message/Err.png'
        },
        success: {
          message: ' Спасибо! Мы скоро с вами свяжемся!',
          img: './images/message/OK.png'
        }
      };
    
    statusMessage.textContent = statusList[status].message;
    img.src = statusList[status].img;
    img.height = 50;
    statusMessage.insertBefore(img, statusMessage.firstChild);
    };

    statusMessage.style.cssText = 'font-size: 2rem; color: #fff';

    function deleteMessage() {
      statusMessage.parentNode.removeChild(statusMessage);
    }
    
    form.addEventListener('submit', event => {
      const popup = document.querySelector('.popup');
      event.preventDefault();
      showStatus('load');
      form.appendChild(statusMessage);
      postData(Object.fromEntries(new FormData(form)))
        .then(response => {
          if (response.status !== 200) {
            throw new Error('Status network ${request.status}');
          }
          showStatus('success');
          clearInput(idForm);
          popup.style.display = 'none';
          setTimeout(deleteMessage, 3000);
        })
        .catch(error => {
          showStatus('error');
          setTimeout(deleteMessage, 3000);
          console.error(error);
        });
    });

    

    form.addEventListener('input', checkInputs);
    
  };

  processingForm('form1');
  processingForm('form2');
  processingForm('form3');
};

export default sendForm;