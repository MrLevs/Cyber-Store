'use strict';
import './sass/style.scss';
//Slider Theme
import { runTheme, toggleTheme } from './js/theme.js';

//Slider Theme
const sliderTheme = document.querySelector('#slider-theme');
sliderTheme.addEventListener('change', toggleTheme);

runTheme();
//-------------------------
