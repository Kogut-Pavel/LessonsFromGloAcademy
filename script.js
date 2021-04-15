'use strict';

// Восстановить порядок книг

const books = document.querySelector('.books'),
      arrBooks = document.querySelectorAll('.book');

arrBooks[0].before(arrBooks[1]);
arrBooks[4].after(arrBooks[3]);
arrBooks[5].after(arrBooks[2]);

// Заменить картинку заднего фона на другую из папки image

const elem = document.querySelector('body');

elem.style.backgroundImage = 'URL("image/you-dont-know-js.jpg")';

// Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")

const links = document.querySelectorAll('a');

links[2].textContent = "Книга 3. this и Прототипы Объектов";

// Удалить рекламу со страницы

const adv = document.querySelector('.adv');

adv.classList.remove('adv');

// Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)

const lists = document.querySelectorAll('ul');
let elems = lists[1].querySelectorAll('li');

elems[7].after(elems[9]);
elems[9].after(elems[2]);
elems[3].after(elems[6]);
elems[6].after(elems[8]);


elems = lists[4].querySelectorAll('li');

elems[6].before(elems[2]);
elems[3].before(elems[9]);
elems[8].before(elems[5]);


// в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место


const newElem = document.createElement('li');

newElem.innerText = 'Глава 8: За пределами ES6';
lists[5].append(newElem);
elems = lists[5].querySelectorAll('li');
elems[8].after(elems[10]);