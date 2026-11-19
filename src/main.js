'use strict';

import './sass/style.scss';

import { initCatalog } from './js/init-catalog.js'; // Init Catalog

import { theme } from './js/theme/theme.js'; // Slider Theme
import { burgerMenu } from './js/burger-menu.js'; // Burger Menu
import { slider } from './js/slider/slider.js'; // Slider
import { toggleProducts } from './js/toggle-products.js'; // Toggle Products
import { selectDetailsProduct } from './js/select-details-product/select-details-product.js'; // Select Details Product
import { payment } from './js/payment/payment.js'; // Payment

// Init Catalog
initCatalog();

// Slider Theme
theme();

// Burger Menu
burgerMenu();

// Slider
slider();

// Toggle Products
toggleProducts();

// Select Details Product
selectDetailsProduct();

// Payment
payment();
