'use strict';

function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.newElement = function () {
  let elem;
  if (this.selector[0] === '.') {
    elem = document.createElement('div');
    elem.className = this.selector.slice(1);
  }
  if (this.selector[0] === '#') {
    elem = document.createElement('p');
    elem.id = this.selector.slice(1);
  }
  elem.style.cssText = `height: ${this.height}px;
  width: ${this.width}px;
  background: ${this.bg};
  font-size: ${this.fontSize}px;
  `;
  console.log(elem);
  return elem;
};

let newDiv = new DomElement('.block', 200, 200, 'purple', 14);
let newP = new DomElement('#best', 15, 200, 'blue', 16);

document.body.appendChild(newDiv.newElement());
document.body.appendChild(newP.newElement());