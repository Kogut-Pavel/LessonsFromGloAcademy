

'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import addDot from './modules/addDot';
import changePhoto from './modules/changePhoto';
import calc from './modules/calc';
import checkCalcBlock from './modules/checkCalcBlock';
import sendForm from './modules/sendForm';

// Timer

countTimer('13 may 2021');

// Menu

toggleMenu();
 
// popup

togglePopUp();

// Tabs

tabs();  

// Slider 

addDot();
slider();

// Change photo

changePhoto();

// Check calculator

checkCalcBlock(); 

// Calculator 

calc(100);

// send-ajax-form

sendForm();