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

export default changePhoto;