'use strict';
import './sass/style.scss';

const slider = document.querySelector('#slider-theme');
slider.addEventListener('change', toggleTheme);

function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.body.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
  if (localStorage.getItem('theme') === 'theme-dark') {
    setTheme('theme-light');
  } else {
    setTheme('theme-dark');
  }
}

// Immediately invoked function to set the theme on initial load
(function () {
  if (localStorage.getItem('theme') === 'theme-dark') {
    setTheme('theme-dark');
    document.getElementById('slider-theme').checked = false;
  } else {
    setTheme('theme-light');
    document.getElementById('slider-theme').checked = true;
  }
})();
