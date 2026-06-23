'use strict';

import './sass/style.scss';

import { dataBase } from './js/data-base.js'; // Data Base

import { theme } from './js/theme/theme.js'; // Slider Theme
import { burgerMenu } from './js/burger-menu.js'; // Burger Menu
import { slider } from './js/slider/slider.js'; // Slider
import { toggleProducts } from './js/toggle-products.js'; // Toggle Products
import { selectDetailsProduct } from './js/select-details-product/select-details-product.js'; // Select Details Product
import { rating } from './js/rating.js'; // Rating
import { selectDateDelivery } from './js/select-date-delivery.js'; // Select Date Delivery
import { sliderPayment } from './js/slider-payment.js'; // Slider Payment
import { toggleCards } from './js/toggle-cards/toggle-cards.js'; // Toggle Cards

// Data Base
dataBase();

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

// Rating
rating();

// Select Date Delivery
selectDateDelivery();

// Slider Payment
sliderPayment();

// Toggle Cards
toggleCards();
