'use strict';

import './sass/style.scss';

import { dataBase } from './js/data-base.js'; //Data Base

import { theme } from './js/theme.js'; //Slider Theme
import { burgerMenu } from './js/burger-menu.js'; //Burger Menu
import { slider } from './js/slider/slider.js'; //Slider
import { toggleProducts } from './js/toggle-products.js'; //Toggle Products
import { selectDetailsProduct } from './js/select-details-product.js'; //Select Details Product

//Data Base
dataBase();

//Slider Theme
theme();

//Burger Menu
burgerMenu();

//Slider
slider();

//Toggle Products
toggleProducts();

//Select Details Product
selectDetailsProduct();
