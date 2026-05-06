'use strict';

import { toggleBorderColor, toggleBorderColorMemory } from './module/toggle-border-color'; // Toggle Border Color
import { toggleRatingColor } from './module/toggle-rating-color'; // Toggle Rating Color

export function theme() {
  const sliderTheme = document.querySelectorAll('.switch-theme');
  const checkboxs = document.querySelectorAll('.switch-theme__input');

  sliderTheme.forEach(item => {
    item.addEventListener('change', toggleTheme);
    item.addEventListener('keydown', toggleThemeEnter);
  });

  function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
  }

  // function to toggle between light and dark theme
  function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('root');
      checkboxs.forEach(item => {
        item.checked = true;
      });
    } else {
      setTheme('theme-dark');
      checkboxs.forEach(item => {
        item.checked = false;
      });
    }

    toggleBorderColor();
    toggleBorderColorMemory();
    toggleRatingColor();
  }

  function toggleThemeEnter(e) {
    if (e.code === 'Enter') {
      toggleTheme();
    }
  }

  // Immediately invoked function to set the theme on initial load
  function runTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-dark');
      checkboxs.forEach(item => {
        item.checked = false;
      });
    } else {
      setTheme('root');
      checkboxs.forEach(item => {
        item.checked = true;
      });
    }
  }

  runTheme();
}
