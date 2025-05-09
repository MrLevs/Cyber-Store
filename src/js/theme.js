'use strict';

export default function () {
  const sliderTheme = document.querySelectorAll('.switch-theme');
  const checkboxs = document.querySelectorAll('.switch-theme__input');

  sliderTheme.forEach(item => {
    item.addEventListener('change', toggleTheme);
  });

  function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
  }

  // function to toggle between light and dark theme
  function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('root');
    } else {
      setTheme('theme-dark');
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
